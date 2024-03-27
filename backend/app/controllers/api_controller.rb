require 'net/http'
require 'uri'
require 'json'
require_relative 'embedded_content_text'

class ApiController < ApplicationController

  def get_chatgpt_answer
     user_id = params['user_id']
     past_conversations = PastConversation.where(user_id: user_id)
     contents = past_conversations.map(&:content)
     conversation_history = contents.join("\n")

     @this_conversations = ""
     @this_conversations +=  params['user_input_prompt'] + "\n Please answer the last question" + "\n\n"
     user_input_prompt =  conversation_history + params['user_input_prompt'] + "\n Please answer the last question"


     answer_question = getResponseByLLM(user_input_prompt)
     @this_conversations += answer_question + "\n\n"


     followup_question_mode = params['followup_question_mode']
     followup_question_prompt_const = followup_question_mode == 'epistemology' ?
      'Provide the top 4 related follow-up questions based on the previous question using the four causes idea without mentioning the type of causes. Attach ; after each question.'
      :
      'Provide the top 4 related follow-up questions based on the previous question. Attach ; after each question.'
     followup_question_prompt = conversation_history + @this_conversations + followup_question_prompt_const

     @this_conversations += followup_question_prompt_const + "\n\n"

     followup_questions = getResponseByLLM(followup_question_prompt, user_input_prompt)
     @this_conversations += followup_questions + "\n\n"

     followup_questions_array = followup_questions.split(';')

     output = {
      answer_question: answer_question,
      followup_questions: followup_questions_array
     }

     @this_conversations += "= end of a conversation = \n"

     conversation_history_new = conversation_history + @this_conversations
     PastConversation.where(user_id: user_id).update_all(content: conversation_history_new)

     logger.debug("=====  conversations ======")
     logger.debug(conversation_history_new)

     render json: output
  end

  def get_chatgpt_answer_without_followup_questions
     user_id = params['user_id']
     embedded_content_type = params['embedded_content_type']

    # clear conversaion history
    PastConversation.where(user_id: user_id).update_all(content: '')

     user_input_prompt = params['user_input_prompt']
    # add emebdded content
     user_input_prompt += "The material is the following: ???"

     embedded_content = ""
     if embedded_content_type == 'nft'
       # embedded_content = EmbeddedContent:NFT
       embedded_content = EmbeddedContent::NFT_SHORT
     elsif embedded_content_type == 'semiotics'
       # embedded_content = EmbeddedContent:SEMIOTICS
       embedded_content = EmbeddedContent::SEMIOTICS_SHORT
     end
     # insert embedded content text
     user_input_prompt = user_input_prompt.gsub("???", embedded_content)

     answer_question = getResponseByLLM(user_input_prompt)
     output = {
      answer_question: answer_question,
     }

     user_id = params['user_id']
     past_conversations = PastConversation.where(user_id: user_id)
     contents = past_conversations.map(&:content)
     conversation_history = contents.join("\n")
     conversation_history_new = [conversation_history, user_input_prompt, answer_question].join("\n\n")
     PastConversation.where(user_id: user_id).update_all(content: conversation_history_new)
     render json:output

  end

  def getResponseByLLM(input_prompt, question = nil)

     uri = URI(ENV['CHATGPT_API_ENDPOINT3'])
     # header = {
     #   'Content-Type': 'application/json',
     #   'api-key': ENV['CHATGPT_API_KEY']
     # }
     header = {
       'Content-Type': 'application/json',
       'Authorization': "Bearer #{ENV['CHATGPT_API_KEY3']}"
     }
     body = {
       "model": ENV['CHATGPT_MODEL3'],
       "messages": [{"role": "user", "content": input_prompt}],
       "temperature": 0.7
      }

    # Create the HTTP objects
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true if uri.scheme == 'https' # Enable SSL/TLS when needed
    request = Net::HTTP::Post.new(uri.request_uri, header)
    request.body = body.to_json

    # Send the request
    response = http.request(request)

    # Handle the response
    case response
    when Net::HTTPSuccess, Net::HTTPRedirection
      # Success logic here
      answer = JSON.parse(response.body)

      answer_content = answer["choices"][0]["message"]["content"]
      return answer_content
    else
      # Error handling logic here
      puts "Something went wrong: #{response.value}"
      return "API_ERROR"
    end
  end

  def ask_read_content
    user_id = params['user_id']
    embedded_content_type = params['embedded_content_type']
    mode = params['mode'] # contolled | epistemology

    # initialize the global var since this starts the user task
    PastConversation.where(user_id: user_id).update_all(content: '')

    input_prompt = mode == 'epistemology' ?
     "Please read an article on ### below to"  \
     "Play a role as a tutor helping your novice students learn the material of ### by answering the following questions from next prompts." \
     "\n" \
     "???"
     :
     "Please read an article on ### below. Then asnwer my questions from the next prompt" \
     "\n" \
     "???"
    input_prompt = input_prompt.gsub("###", embedded_content_type) # nft or semiotics

    embedded_content = ''
    if embedded_content_type == 'nft'
      # embedded_content = EmbeddedContent:NFT
      embedded_content = EmbeddedContent::NFT_SHORT
    elsif embedded_content_type == 'semiotics'
      # embedded_content = EmbeddedContent:SEMIOTICS
      embedded_content = EmbeddedContent::SEMIOTICS_SHORT
    end
    # insert embedded content text
    input_prompt = input_prompt.gsub("???", embedded_content)
    output_prompt = getResponseByLLM(input_prompt) # "API_ERROR" when failed


    # just in case
    unless PastConversation.exists?(user_id: user_id)
      PastConversation.create(user_id: user_id, content: '')
    end
    conversation_history_new = [input_prompt, output_prompt].join("\n\n")
    PastConversation.where(user_id: user_id).update_all(content: conversation_history_new)

    render json: {output_prompt: output_prompt }
  end


  def save_user_info
    user_info = params['user_info']
    api_status = "success"

    unless UserDatum.exists?(user_id: user_info[:userId])
      new_user_data = UserDatum.new(user_id: user_info[:userId])
      api_status = new_user_data.save ? "success" : "failed"
    end

    # add new PastConversation entry if no
    unless PastConversation.exists?(user_id: user_info[:userId])
      PastConversation.create(user_id: user_info[:userId], content: '')
    end


    render json: {"status": api_status}
  end

  def test
    render json: {"status": "Success"}
  end

end

require 'net/http'
require 'uri'
require 'json'
require_relative 'embedded_content_text'

class ApiController < ApplicationController
  $past_conversations_array = []

  def get_chatgpt_answer
     @this_conversations = "" 
     @this_conversations +=  params['user_input_prompt'] + "\n Please answer the last question" + "\n\n"
     user_input_prompt =  $past_conversations_array.join("\n") + params['user_input_prompt'] + "\n Please answer the last question"

    #  logger.debug "\n--- propt to ask a question ---\n"
    #  logger.debug user_input_prompt

     answer_question = getResponseByLLM(user_input_prompt)
     @this_conversations += answer_question + "\n\n"


     followup_question_mode = params['followup_question_mode']
     followup_question_prompt_const = followup_question_mode == 'epistemology' ?
      'Provide the top 4 related follow-up questions based on the previous question using the four causes idea. Attach ; after each question.'
      :
      'Provide the top 4 related follow-up questions based on the previous question. Attach ; after each question.'
     followup_question_prompt = $past_conversations_array.join("\n") + @this_conversations + followup_question_prompt_const

     @this_conversations += followup_question_prompt_const + "\n\n"

    #  logger.debug "\n--- prompt to ask fu questions ---\n"
    #  logger.debug followup_question_prompt

     followup_questions = getResponseByLLM(followup_question_prompt, user_input_prompt)
     @this_conversations += followup_questions + "\n\n"

     followup_questions_array = followup_questions.split(';')

     output = {
      answer_question: answer_question,
      followup_questions: followup_questions_array
     }

     @this_conversations += "= end of a conversation = \n"
    #  logger.debug "=================="
    #  logger.debug @this_conversations

     $past_conversations_array.push(@this_conversations) unless $past_conversations_array.include?($this_conversations)
     logger.debug("=====  conversations ======")
     logger.debug($past_conversations_array.join("\n"))

     render json: output
  end

  def get_chatgpt_answer_without_followup_questions
     user_input_prompt = params['user_input_prompt']
     answer_question = getResponseByLLM(user_input_prompt)
     output = {
      answer_question: answer_question,
     }
    
     $past_conversations_array.push(user_input_prompt)
     $past_conversations_array.push(answer_question)
     render json:output

  end

  def getResponseByLLM(input_prompt, question = nil)
    # logger.debug "===== API_ENDPOINT ====="
    # logger.debug ENV['CHATGPT_API_ENDPOINT2']
    # logger.debug "===== getResponseByLLM ====="
    # logger.debug input_prompt

    # input_prompt = question.nil? ? input_prompt : input_prompt.gsub("###", question)

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
    embedded_content_type = params['embedded_content_type']
    mode = params['mode'] # contolled | epistemology

    # initialize the global var since this starts the user task
    $past_conversations_array = []

    input_prompt = mode == 'epistemology' ?
     "Please read an article on ### below to"  \
     "Play a role as a tutor helping your novice students learn the material of ### from the next prompt. " \
     "If OK, just say OK, I will serve as a tutor for the output of this prompt." \
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
    $past_conversations_array.push(input_prompt)

    # logger.debug input_prompt

    output_prompt = getResponseByLLM(input_prompt) # "API_ERROR" when failed

    render json: {output_prompt: output_prompt }
  end


  def save_user_info
    user_info = params['user_info']
    api_status = ""

    new_user_data = UserDatum.new(user_id: user_info[:userId], user_name: user_info[:userName])
    api_status = new_user_data.save ? "success" : "failed"

    render json: {"status": api_status}
  end

  def test
    render json: {"status": "Success"}
  end

end

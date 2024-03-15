require 'net/http'
require 'uri'
require 'json'

class ApiController < ApplicationController
  def get_chatgpt_answer
     user_input_prompt = params['user_input_prompt']
     followup_question_mode = params['followup_question_mode']
     followup_question_prompt = followup_question_mode == 'epistemology' ? 
      'Regarding the previous question, could you provide some follow-up questions,' \
      'using the four causes idea originating from Aristotle\'s philosophy?' \
      'Output just follow-up questions, concatenating by ";" instead of "\n" in one line' :
      'Could you provide some follow-up questions? Output just follow-up questions'

     answer_question = getResponseByLLM(user_input_prompt)
     followup_questions = getResponseByLLM(followup_question_prompt)
     followup_questions_array = followup_questions.split(';')

     output = {
      answer_question: answer_question,
      followup_questions: followup_questions_array
     }
     render json: output
  end

  def getResponseByLLM(input_prompt)
     uri = URI(ENV['CHATGPT_API_ENDPOINT'])
     header = {
       'Content-Type': 'application/json',
       'api-key': ENV['CHATGPT_API_KEY']
     }
     body = {
        "messages": [{"role": "user", "content": input_prompt}],
        "temperature": 0.7
      }
     #
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

  def save_user_info
    user_info = params['user_info']
    api_status = ""

    new_user_data = UserDatum.new(user_id: user_info[:userId], user_name: user_info[:userName])
    api_status = new_user_data.save ? "success" : "failed"

    render json: {"status": api_status}
  end
end

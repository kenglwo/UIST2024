Rails.application.routes.draw do
  post 'get_chatgpt_answer', to: 'api#get_chatgpt_answer'
  post 'save_user_info', to:'api#save_user_info'
  post 'get_chatgpt_answer_without_followup_questions', to: 'api#get_chatgpt_answer_without_followup_questions'
  post 'ask_read_content', to:'api#ask_read_content'

  get 'test', to:'api#test'
end

Rails.application.routes.draw do
  post 'get_chatgpt_answer', to: 'api#get_chatgpt_answer'
  post 'save_user_info', to:'api#save_user_info'

  get 'test', to:'api#test'
end

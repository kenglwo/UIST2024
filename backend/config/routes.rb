Rails.application.routes.draw do
  post 'get_chatgpt_answer', to: 'api#get_chatgpt_answer'
end

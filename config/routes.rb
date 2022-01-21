Rails.application.routes.draw do
  get 'main/index'
  root 'main#index'
  get '/login', to: "login#login"

  resources :users
end

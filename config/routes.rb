Rails.application.routes.draw do
  get 'dashboard/index'
  root 'main#index'
  get '/login', to: "login#login"
  post '/login', to: "login#check_login"

  resources :users
end

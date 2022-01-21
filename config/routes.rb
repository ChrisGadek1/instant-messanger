Rails.application.routes.draw do
  get 'dashboard/index'
  root 'main#index'
  get '/login', to: "login#login"

  resources :users
end

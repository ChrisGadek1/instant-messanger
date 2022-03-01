Rails.application.routes.draw do
  get 'dashboard/index'
  root 'main#index'
  get '/login', to: "login#login"
  post '/login', to: "login#check_login"
  get '/is_logged', to: "login#is_logged"
  post '/logout', to: "login#logout"

  resource :users do
    post :get_by_email, on: :collection, to: "users#get_by_email"
    post :get_by_username, on: :collection, to: "users#get_by_username"
    post :attach_avatar, to: "users#attach_new_avatar"
    get '/find_people/:search_phrase', to: "users#find_people"
    delete :remove_avatar, to: "users#remove_avatar"
    resources :conversations do
      get '/get_conversation', to: 'conversations#get_conversation', param: :id
    end
  end
end

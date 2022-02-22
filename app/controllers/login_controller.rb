class LoginController < ApplicationController
  include ActionView::Helpers::AssetUrlHelper

  def login
  end

  def check_login
    user = User.get_by_email(params[:email])
    if user.length > 0 && user[0].authenticate(params[:password])
      session[:user_id] = user[0].id
      avatar = user[0].avatar.attached? ? url_for(user[0].avatar) : image_url("default-avatar.jpg")
      render json: { status: "OK", user: user[0], avatar: avatar }, status: :ok
    else
      render json: { status: "Error" }, status: :unauthorized
    end
  end

  def logout
    session[:user_id] = nil
    render json: { status: "OK" }, status: 200
  end

  def is_logged
    if current_user.nil?
      render json: { is_logged: false }
    else
      avatar = current_user.avatar.attached? ? url_for(current_user.avatar) : image_url("default-avatar.jpg")
      render json: { is_logged: true, username: current_user.username, name: current_user.name, surname: current_user.surname, email: current_user.email, avatar: avatar }
    end
  end


end

class LoginController < ApplicationController
  def login
  end

  def check_login
    user = User.get_by_email(params[:email])
    if user.length > 0 && user[0].authenticate(params[:password])
      session[:user_id] = user[0].id
      render json: { status: "OK" }, status: :ok
    else
      render json: { status: "Error" }, status: :unauthorized
    end
  end

  def logout
    session[:user_id] = nil
  end
end

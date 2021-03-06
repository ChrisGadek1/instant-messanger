class UsersController < ApplicationController

  def get_by_email
    user = User.get_by_email(params[:value])
    if user.length.zero?
      render json: { isTaken: false }
    else
      render json: { isTaken: true }
    end
  end

  def get_by_username
    user = User.get_by_username(params[:value])
    if user.length.zero?
      render json: { isTaken: false }
    else
      render json: { isTaken: true }
    end
  end

  def new; end

  def show; end

  def update
    user = current_user
    if user.nil?
      render json: { status: 'error', message: 'You are not authorized to do this operation. Probably you have been logged out, try again after login.' },
             status: :unauthorized
    else
      User.update!(id = user.id, name: params[:name], surname: params[:surname], username: params[:username], email: params[:email])
      render json: { status: 'OK', message: 'OK' }, status: :ok
    end
  end

  def attach_new_avatar
    user = current_user
    if user.nil?
      render json: { status: 'error', message: 'You are not authorized to do this operation. Probably you have been logged out, try again after login.' },
             status: :unauthorized
    else
      user.avatar.attach(params[:image])
      render json: { status: 'OK', message: '', url: url_for(user.avatar) }
    end
  end

  def create
    user = User.new(user_params)
    user.password = params[:password]
    if user.valid?
      begin
        user.save!
      rescue StandardError => e
        render json: { status: 'error', message: "Something went wrong. Couldn't register your account." }, 
status: :internal_server_error
      end
      render json: { status: 'OK', message: '' }, status: :created
    else
      render json: { status: 'Error', message: "Registration data isn't valid" }, status: :unprocessable_entity
    end

  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :name, :surname, :avatar)
  end

end
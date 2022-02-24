class UsersController < ApplicationController
  include ActionView::Helpers::AssetUrlHelper

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

  def find_people
    words = params[:search_phrase].split(' ')
    found_users = []
    words.each do |word|
      found_users += User.where('name LIKE ?', "%#{word}%").limit(20)
      found_users += User.where('surname LIKE ?', "%#{word}%").limit(20)
      found_users += User.where('username LIKE ?', "%#{word}%").limit(20)
    end
    result = []
    found_users.each do |found_user|
      avatar = found_user.avatar.attached? ? url_for(found_user.avatar) : image_url("default-avatar.jpg")
      result.append({name: found_user.name, surname: found_user.surname, username: found_user.username, avatar: avatar })
    end
    render json: { status: 'OK', foundUsers: result.uniq }
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

  def remove_avatar
    user = current_user
    if user.nil?
      render json: { status: 'error', message: 'You are not authorized to do this operation. Probably you have been logged out, try again after login.' },
             status: :unauthorized
    else
      user.avatar.purge
      render json: { status: 'OK', url: image_url('default-avatar.jpg') }
    end
  end

  def create
    user = User.new(name: params[:name], surname: params[:surname], email: params[:email], username: params[:username])
    user.password = params[:password]
    user.avatar.attach(params[:avatar]) if params[:avatar] != 'null'
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
    params.require(:user).permit(:username, :email, :password, :name, :surname)
  end

end
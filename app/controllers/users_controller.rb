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

  def create
    user = User.new(user_params)
    user.password = params[:password]
    user.save!
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :name, :surname)
  end

end
class MessagesController < ApplicationController
  def create
    @user = current_user
    if @user.nil?
      render json: { status: 'error', message: 'You are not authorized to do this operation. Probably you have been logged out, try again after login.' },
             status: :unauthorized
    else

    end
  end
end
class ConversationsController < ApplicationController
  def index
    
  end

  def new

  end

  def create
    @user = current_user
    if @user.nil?
      render json: { status: 'error', message: 'You are not authorized to do this operation. Probably you have been logged out, try again after login.' },
             status: :unauthorized
    else
      if params[:isPrivate] == "true"
        second_user = User.where(username: params[:username])[0]
        private_conversations = PrivateConversation.where(user_id: @user.id, addressee: second_user.id)
        if private_conversations.length.zero?
          @new_private_conversation = PrivateConversation.create(user: @user, addressee: second_user.id)
          @new_other_private_conversation = PrivateConversation.create(user: second_user, addressee: @user.id)
          @new_private_conversation.save!
          @new_other_private_conversation.save!
          render json: { status: 'OK', message: '' }, status: :ok
        else
          render json: { status: 'OK', conversation: { id: private_conversations[0].id, messages: private_conversations[0].messages } }
        end


      end

    end

  end
end
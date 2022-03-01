class ConversationsController < ApplicationController
  def index
    
  end

  def new

  end

  def show

  end

  def get_conversation
    @user = current_user
    if @user.nil?
      render json: { status: 'error', message: 'You are not authorized to do this operation. Probably you have been logged out, try again after login.' },
             status: :unauthorized
    else
      conversation = PrivateConversation.find(params[:conversation_id])
      addressee = User.find(conversation.addressee)
      render json: { status: 'OK',
                     conversation: {
                       id: conversation.id,
                       addressee: {
                         name: addressee.name,
                         surname: addressee.surname,
                         username: addressee.username,
                         avatar: url_for(addressee.avatar)
                       },
                       messages: conversation.messages }
      }
    end
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
          addressee = User.find(private_conversations[0].addressee)
          render json: { status: 'OK', message: 'created new', conversation: { id: @new_private_conversation.id, messages: @new_private_conversation.messages } }, status: :ok
        else
          render json: { status: 'OK',
                         message: 'conversation already created',
                         conversation: { id: private_conversations[0].id,
                                         addressee: {
                                           name: addressee.name,
                                           surname: addressee.surname,
                                           username: addressee.username,
                                           avatar: url_for(addressee.avatar)
                                         },
                                         messages: private_conversations[0].messages }
          }
        end


      end

    end

  end
end

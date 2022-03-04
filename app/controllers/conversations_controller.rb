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
      conversation = Conversation.find(params[:conversation_id])
      render json: { status: 'OK', conversation: { data: conversation, messages: conversation.messages,
                                                   users: transform_users(User.joins(:conversation).where(conversations: conversation).uniq) } }
    end
  end

  def create
    @user = current_user
    if @user.nil?
      render json: { status: 'error', message: 'You are not authorized to do this operation. Probably you have been logged out, try again after login.' },
             status: :unauthorized
    else
      second_user = User.where(username: params[:username])[0]
      conversation = get_private_conversation_with_two_users @user, second_user
      if conversation.nil?
        conversation = Conversation.create(is_private: params[:is_private] == 'true')
        conversation.users.append(@user)
        conversation.users.append(second_user) if second_user.id != @user.id
        conversation.save!
        render json: { status: 'OK', conversation: { data: conversation, users: transform_users(User.joins(:conversation).where(conversations: conversation).uniq)} }
      else
        render json: { status: 'OK', conversation: { data: conversation,
                                                     users: transform_users(User.joins(:conversation).where(conversations: conversation).uniq),
                                                     messages: conversation.messages }}
      end
    end

  end

  private

  def transform_users(users)
    users.map { |user|
      {
        id: user.id,
        name: user.name, surname: user.surname,
        username: user.username,
        avatar: url_for(user.avatar) }
    }
  end

  def get_private_conversations_by_user(user)
    Conversation.select(:id).select('COUNT("users"."id")').joins(:users).where(users: user).group(:id).having('COUNT("users"."id") = 2 OR COUNT("users"."id") = 1')
  end

  def get_private_conversation_with_two_users(user1, user2)
    conversations = []
    all_private_conversations = get_private_conversations_by_user user1
    all_private_conversations.each do |private_conversation|
      if user1.id != user2.id
        conv = Conversation.find(private_conversation.id).users.find { |user| user.id == user2.id }
        conversations.append(Conversation.find(private_conversation.id)) unless conv.nil?
      else
        conv = Conversation.find(private_conversation.id)
        conversations.append(conv) if conv.users.length == 1
      end
    end
    conversations.length.zero? ? nil : conversations[0]
  end
end

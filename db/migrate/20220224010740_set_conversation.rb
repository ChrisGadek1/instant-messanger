class SetConversation < ActiveRecord::Migration[7.0]
  def change
    add_column :conversations, :title, :string
    add_column :conversations, :can_add_users, :boolean
    add_column :conversations, :can_change_title, :boolean
    add_column :conversations, :can_change_avatar, :boolean
  end
end

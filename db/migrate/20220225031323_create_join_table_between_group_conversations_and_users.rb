class CreateJoinTableBetweenGroupConversationsAndUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :group_conversations_users do |t|
      t.timestamps
      t.integer :user_id
      t.integer :group_conversation_id
    end
  end
end

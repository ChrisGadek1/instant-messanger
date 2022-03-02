class AddJoinTableBetweenConversationsAndUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :conversations_users do |t|
      t.bigint :user_id
      t.bigint :conversation_id
      t.foreign_key :users, column: :user_id
      t.foreign_key :conversations, column: :conversation_id
    end
  end
end

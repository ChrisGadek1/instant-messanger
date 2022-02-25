class CreatePrivateConversations < ActiveRecord::Migration[7.0]
  def change
    create_table :private_conversations do |t|
      t.belongs_to :user
      t.bigint :addressee
      t.foreign_key :users, column: :addressee
      t.timestamps
    end
  end
end

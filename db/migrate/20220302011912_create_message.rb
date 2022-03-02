class CreateMessage < ActiveRecord::Migration[7.0]
  def change
    create_table :messages do |t|
      t.bigint :conversation_id
      t.bigint :user_id
      t.foreign_key :users, column: :user_id
      t.foreign_key :conversations, column: :conversation_id
      t.string :text
      t.timestamps
    end
  end
end

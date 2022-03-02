class CreateConversation < ActiveRecord::Migration[7.0]
  def change
    create_table :conversations do |t|
      t.boolean :is_private
      t.timestamps
    end
  end
end

class CreateMessages < ActiveRecord::Migration[7.0]
  def change
    create_table :messages do |t|
      t.timestamps
      t.belongs_to :conversations
    end
  end
end

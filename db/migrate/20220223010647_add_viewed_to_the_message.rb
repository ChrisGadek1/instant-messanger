class AddViewedToTheMessage < ActiveRecord::Migration[7.0]
  def change
    add_column :messages, :viewed, :boolean
  end
end

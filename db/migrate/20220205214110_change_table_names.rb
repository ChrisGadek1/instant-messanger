class ChangeTableNames < ActiveRecord::Migration[7.0]
  def change
    rename_column :users, :first_name, :name
    rename_column :users, :last_name, :surname
  end
end

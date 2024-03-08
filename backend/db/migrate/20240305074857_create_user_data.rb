class CreateUserData < ActiveRecord::Migration[6.1]
  def change
    create_table :user_data do |t|
      t.string :user_id
      t.string :user_name

      t.timestamps
    end
  end
end

class CreateConversationData < ActiveRecord::Migration[6.1]
  def change
    create_table :conversation_data do |t|
      t.string :user_id
      t.string :role
      t.text :content

      t.timestamps
    end
  end
end

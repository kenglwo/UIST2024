class CreatePastConversations < ActiveRecord::Migration[6.1]
  def change
    create_table :past_conversations do |t|
      t.string :user_id
      t.text :content

      t.timestamps
    end
  end
end

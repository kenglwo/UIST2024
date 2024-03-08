class CreateExperimentData < ActiveRecord::Migration[6.1]
  def change
    create_table :experiment_data do |t|
      t.string :user_id
      t.timestamp :experiment_starttime
      t.timestamp :experiment_endtime

      t.timestamps
    end
  end
end

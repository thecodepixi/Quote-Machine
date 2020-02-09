class CreateQuotes < ActiveRecord::Migration[6.0]
  def change
    create_table :quotes do |t|
      t.text :content
      t.integer :author_id
      t.integer :theme_id
      t.timestamps
    end
  end
end

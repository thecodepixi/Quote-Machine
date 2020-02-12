class ChangeQuoteContentTypeToString < ActiveRecord::Migration[6.0]
  def change
    change_column :quotes, :content, :string 
  end
end

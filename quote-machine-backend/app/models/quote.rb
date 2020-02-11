class Quote < ApplicationRecord
  belongs_to :author
  belongs_to :theme

  def self.get_random_by_theme(theme)
    themeID = Theme.get_theme_by_name(theme).id 
    return Quote.where('theme_id = ?', themeID).sample  
  end 

end

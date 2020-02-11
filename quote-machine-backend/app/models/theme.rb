class Theme < ApplicationRecord
  has_many :quotes 
  has_many :authors, through: :quotes 

  def self.get_theme_by_name(name)
    return Theme.find_by(name: name)
  end 

end

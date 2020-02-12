class Author < ApplicationRecord
  has_many :quotes 
  has_many :themes, through: :quotes

  validates :name, presence: true 
end

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Author.all.destroy_all
Theme.all.destroy_all 
Quote.all.destroy_all 


until Author.all.count === 10 
  Author.find_or_create_by(name: Faker::Book.author.downcase)
end 

themes = ["inspirational", "wisdom", "humor", "love", "success", "motivational", "joy", "science"] 

themes.each do |theme |
  Theme.create(name: theme)
end 

until Quote.all.count === 50 
  q = Quote.new(content: Faker::Movie.quote)
  q.author = Author.all.sample 
  q.theme = Theme.all.sample 
  q.save 
end 
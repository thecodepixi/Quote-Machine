# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# until Author.all.count === 10 
#   Author.create(name: Faker::Book.author)
# end 

# until Theme.all.count === 10 
#   Theme.create(name: Faker::Book.genre)
# end  

until Quote.all.count === 50 
  q = Quote.new(content: Faker::Movie.quote)
  q.author = Author.all.sample 
  q.theme = Theme.all.sample 
  q.save 
end 
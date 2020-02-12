# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# Theme.all.destroy_all 
# Quote.all.destroy_all 

# themes = ['inspirational', 'wisdom', 'humor', 'love', 'success', 'motivational', 'joy', 'science']

# themes.each do |theme| 
#   Theme.create(name: theme)
# end 

until Quote.all.count == 50 
    quote = Quote.new(content: Faker::TvShows::Buffy.quote)
    quote.author = Author.find_or_create_by(name: Faker::TvShows::Buffy.character.downcase)
    quote.theme = Theme.all.sample 
    quote.save 
end
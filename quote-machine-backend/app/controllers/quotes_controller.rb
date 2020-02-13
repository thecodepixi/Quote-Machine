class QuotesController < ApplicationController

  def index 
    quotes = Quote.all 
    render json: QuoteSerializer.new(quotes).to_serialized_json
  end   

  def show  
    if params[:id].to_i < Quote.all.length 
      quote = Quote.all[params[:id].to_i]
    else 
      quote = Quote.find_by(id: params[:id])
    end 
    render json: QuoteSerializer.new(quote).to_serialized_json
  end 

  def create
    quote = Quote.new(content: params[:content].strip)
    quote.author = Author.find_or_create_by(name: params[:author].strip.downcase)
    quote.theme = Theme.find_or_create_by(name: params[:theme].strip.downcase)
    if quote.save 
      render json: QuoteSerializer.new(quote).to_serialized_json
    else 
      render json: {message: quote.errors.full_messages}
    end 
  end 

  # def destroy 
  #   quote = Quote.find_by(id: params[:id])
  #   quote.destroy 

  #   render json: QuoteSerializer.new(quote).to_serialized_json 
  # end 

end

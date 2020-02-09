class QuotesController < ApplicationController

  def index 
    quotes = Quote.all 
    render json: QuoteSerializer.new(quotes).to_serialized_json
  end   

  def show 
    quote = Quote.find_by(id: params[:id])
    render json: QuoteSerializer.new(quote).to_serialized_json
  end 

end

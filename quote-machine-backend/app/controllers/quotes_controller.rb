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

end

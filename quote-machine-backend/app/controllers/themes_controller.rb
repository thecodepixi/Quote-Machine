class ThemesController < ApplicationController

  def name 
    quote = Quote.get_random_by_theme(params[:name])

    render json: QuoteSerializer.new(quote).to_serialized_json 
  end 

end

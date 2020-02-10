class QuoteSerializer 

  def initialize(quote_object)
    @quote = quote_object 
  end 

  def to_serialized_json 
    @quote.to_json( :include => {
      :author => { :only => [:name] },
      :theme => { :only => [:name] }
    }, only: [:id, :content])
  end 

end 
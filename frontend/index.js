class Quote {
  constructor(content, author, theme){
    this.content = content 
    this.theme = theme 
    this.author = author 
  }

  createQuoteElement(){
    let thisDiv = document.createElement('div')
      let quoteText = document.createElement('p')
      quoteText.textContent = this.content 
      let author = document.createElement('small')
      author.textContent = `${this.author} --  `
      author.classList.add('is-uppercase')
      let theme = document.createElement('small')
      theme.textContent = this.theme
      let hr = document.createElement('hr')
      thisDiv.appendChild(quoteText) 
      thisDiv.appendChild(author)
      thisDiv.appendChild(theme)
      thisDiv.appendChild(hr)
      return thisDiv 
  }

  renderAsRandom(){
    let thisDiv = document.createElement('div')
    
  }
}

function getRandomQuote(quotesObject) {
  let quotesArray = Object.values(quotesObject)
  let randomInt = Math.floor(Math.random() * quotesArray.length ) 
  
  return quotesArray[randomInt]
}

function renderRandomQuote(quote){
  let randomQuote = new Quote(quote.content, quote.author.name, quote.theme.name)
  let randomQuoteDiv = randomQuote.createQuoteElement()

}


document.addEventListener("DOMContentLoaded", () => {
  
  // Render All Quotes 
  fetch('http://localhost:3000/quotes/')
  .then(resp => resp.json())
  .then(json => renderQuotes(json))

  function renderQuotes(quotes){
    for(quote of quotes) {
      let container = document.getElementById('quote-container')
      let thisQuote = new Quote(quote.content, quote.author.name, quote.theme.name)
      let thisQuoteDiv = thisQuote.createQuoteElement(); 
      container.appendChild(thisQuoteDiv)
    }

    getRandomQuote(quotes)
  }
})

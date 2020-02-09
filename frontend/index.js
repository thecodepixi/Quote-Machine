document.addEventListener("DOMContentLoaded", () => {
  
  // Render All Quotes 
  fetch('http://localhost:3000/quotes/')
  .then(resp => resp.json())
  .then(json => renderQuotes(json))

  function renderQuotes(quotes){
    for(quote of quotes) {
      let container = document.getElementById('quote-container')
      let thisDiv = document.createElement('div')
      container.appendChild(thisDiv)
      let quoteText = document.createElement('p')
      quoteText.textContent = quote.content 
      let author = document.createElement('small')
      author.textContent = `${quote.author.name} --  `
      author.classList.add('is-uppercase')
      let theme = document.createElement('small')
      theme.textContent = quote.theme.name
      let hr = document.createElement('hr')
      thisDiv.appendChild(quoteText) 
      thisDiv.appendChild(author)
      thisDiv.appendChild(theme)
      thisDiv.appendChild(hr)
    }
  }

  // Render a random quote in the main section 
  function renderRandomQuote(quotes) {
    let mainQuoteHero = document.getElementById('main-quote')
  }
})

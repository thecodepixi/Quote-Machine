class Quote {
  constructor(content, author, theme){
    this.content = content 
    this.theme = theme 
    this.author = author 
  }

  createQuoteElement(){
    let thisDiv = document.createElement('div')
    thisDiv.classList.add("quote")
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
    thisDiv.classList.add()
  }
}

function fetchRandomQuote(quotesObject) {
  let randomInt = Math.floor(Math.random() * quotesArray.length ) 
  
  return quotesArray[randomInt]
}

function renderRandomQuote(quote){
  let quoteQuantity = document.querySelectorAll("div.quote").count
  let randomQuoteIndex = Math.floor(Math.random() * quoteQuantity)

  fetch(`http://localhost:3000/quotes/${randomQuoteIndex}`)
    .then(resp => resp.json())
    .then(json => console.log(json))
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
  }

// Hide & Show navbar info element 
  let navbarButton = document.getElementById("info-activate")
  let navbarInfo = document.getElementById("navbar-info")
  navbarInfo.style.display = "none"
  navbarButton.addEventListener("click", () => {
    if(navbarInfo.style.display === "none") {
      navbarInfo.style.display = "block"
      navbarInfo.style.position = "absolute"
      navbarInfo.style.zIndex = 1
    } else {
      navbarInfo.style.display = "none"
    }
  })

  //Hide & Show All Quotes 
  let showAllButton = document.getElementById('show-quotes')
  let allQuotes = document.getElementById('quote-container')
  let showAllIcon = document.getElementById('show-all-icon')
  showAllButton.addEventListener("click", () => {
   if(allQuotes.style.display === "none") {
     allQuotes.style.display = "block"
     showAllIcon.classList.add("fa-angle-double-down")
     showAllIcon.classList.remove("fa-bars")
   } else {
     allQuotes.style.display = "none"
     showAllIcon.classList.add("fa-bars")
     showAllIcon.classList.remove("fa-angle-double-down")
   }
  })

})

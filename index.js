class Quote {
  constructor(id, content, author, theme){
    this.id = id
    this.content = content 
    this.theme = theme 
    this.author = author 
  }

  createQuoteElement(){
    let thisDiv = document.createElement('div')
    thisDiv.classList.add("quote")
    thisDiv.classList.add('columns')
      let quoteText = document.createElement('p')
      quoteText.textContent = this.content 
      quoteText.classList.add('column')
      let quoteDetails = document.createElement('div')
      let author = document.createElement('small')
      author.textContent = `${this.author} --  `
      author.classList.add('is-uppercase')
      let theme = document.createElement('small')
      theme.textContent = this.theme
      theme.classList.add("is-capitalized")
      quoteDetails.appendChild(author)
      quoteDetails.appendChild(theme)
      quoteDetails.classList.add('is-pulled-right')
      quoteDetails.style.alignSelf = "center"
      thisDiv.appendChild(quoteText) 
      thisDiv.appendChild(quoteDetails)
      return thisDiv 
  }

  renderQuote() {
    let container = document.getElementById('quote-container')
    let thisQuoteDiv = this.createQuoteElement(); 
    let hr = document.createElement("hr")
    container.prepend(hr)
    container.prepend(thisQuoteDiv)
  }

  renderAsRandom(){
    let randomContent = document.getElementById('random-quote-content')
    let randomAuthor = document.getElementById('random-quote-author')
    randomContent.textContent = this.content 
    randomAuthor.textContent = this.author 
  }

  sendToDBandRender(){
    fetch('https://quote-machine-backend-api.herokuapp.com/quotes', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
     }, 
     body: JSON.stringify(this)  
    })
      .then(resp => resp.json())
      .then(json => {
        let newQuote = new Quote(json.id, json.content, json.author.name, json.theme.name)
        let container = document.getElementById('quote-container')
        let thisQuoteDiv = newQuote.createQuoteElement(); 
        container.prepend(thisQuoteDiv) 

        let randomContent = document.getElementById('random-quote-content')
        let randomAuthor = document.getElementById('random-quote-author')
        randomContent.textContent = newQuote.content 
        randomAuthor.textContent = newQuote.author 
        randomHeroBackgroundColor()
      })
      .catch(error => alert(error.message))
  }
// THIS FUNCTION IS CURRENTLY NOT USED FOR THE DEPLOYED APP (don't want people deleting all my data)
  deleteQuote(){
    fetch(`https://quote-machine-backend-api.herokuapp.com/quotes/${this.id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
      .then(resp => resp.json())
      .then(json => console.log(json))
      .catch(error => alert(error.message))
  }
}

function fetchRandomQuote() {
  let quoteQuantity = document.querySelectorAll("div.quote").length
  let randomQuoteIndex = Math.floor(Math.random() * quoteQuantity)

  fetch(`https://quote-machine-backend-api.herokuapp.com/quotes/${randomQuoteIndex}`)
    .then(resp => resp.json())
    .then(json => {
      if( json == null) {
        let heroContent = document.getElementById("random-quote-content")
        heroContent.textContent = "Start by adding a new quote using the form below!"
      } else {
        let randomQuote = new Quote(json.id, json.content, json.author.name, json.theme.name)
        randomQuote.renderAsRandom()
      }
      randomHeroBackgroundColor()
    })
    .catch(error => alert(error.message))
}

function fetchRandomByTheme(theme) {
  fetch(`https://quote-machine-backend-api.herokuapp.com/themes/${theme}`)
    .then(resp => resp.json())
    .then(json => {
      let randomQuote = new Quote(json.id, json.content, json.author.name, json.theme.name)
      randomQuote.renderAsRandom()
      randomHeroBackgroundColor()
    })
    .catch(error => alert(error.message))
}

function saveQuotes(quotesObj, quotes){
  for(quote of quotes) {
    let thisQuote = new Quote(quote.id, quote.content, quote.author.name, quote.theme.name)
    quotesObj.push(thisQuote)
  }
}

function renderQuotes(quotesObj, quotes){
  saveQuotes(quotesObj, quotes)
  quotesObj.forEach( quote => {
    quote.renderQuote()
  })
}

function generateRandomColor(){
  let possibleChars = [0,1,2,'b','c','d']
  let hex = '#'
  while (hex.length < 7) {
    hex += (possibleChars[Math.floor(Math.random() * possibleChars.length)])
  }
  return hex 
}

function randomHeroBackgroundColor(){
  let hero = document.getElementsByClassName("hero")[0]
  hero.style.backgroundColor = generateRandomColor()
}


// DOM CONTENT LOADED -- call functions here 
document.addEventListener("DOMContentLoaded", () => {

  const quotesArray = []

  // Render All Quotes 
  fetch('https://quote-machine-backend-api.herokuapp.com/quotes')
  .then(resp => resp.json())
  .then(json => renderQuotes(quotesArray, json))
  .catch(error => alert(error.message))

  // populate hero with initial random quote 
  fetchRandomQuote()

  // Random quote event listener
    let reloadButton = document.getElementById('random-quote-reload')
    reloadButton.addEventListener("click", () =>{
      fetchRandomQuote()
    })

  // Hide & Show navbar info element 
    let navbarButton = document.getElementById("info-activate")
    let navbarInfo = document.getElementById("navbar-info")
    navbarInfo.style.display = "none"
    navbarButton.addEventListener("click", () => {
      if(navbarInfo.style.display === "none") {
        navbarInfo.style.display = "flex"
      } else {
        navbarInfo.style.display = "none"
      }
    })

    //Hide & Show All Quotes 
    let showAllButton = document.getElementById('show-quotes')
    let allQuotes = document.getElementById('quote-container')
    let showAllIcon = document.getElementById('show-all-icon')
    allQuotes.style.display = "none"
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

    //Hide and Show New Quote Form 
    let showFormButton = document.getElementById('new-quote-heading')
    let newQuoteIcon = document.getElementById('new-quote-icon')
    let newQuoteForm = document.getElementById('new-quote-form')
    newQuoteForm.style.display = "none"
    newQuoteIcon.classList.add('fa-plus')
    showFormButton.addEventListener("click", () => {
      if(newQuoteForm.style.display === "none"){
        newQuoteForm.style.display = "block"
        newQuoteIcon.classList.remove("fa-plus")
        newQuoteIcon.classList.add('fa-times')
      } else {
        newQuoteForm.style.display = "none"
        newQuoteIcon.classList.remove("fa-times")
        newQuoteIcon.classList.add('fa-plus')
      }
    })


    // Form submission event listener and handling 
    let submitButton = document.getElementById('submit-quote')
    submitButton.addEventListener("click", (event) => {
      let quoteContent = document.getElementById('new-quote-content')
      let quoteAuthor = document.getElementById('new-quote-author')
      let quoteTheme = document.getElementById('new-quote-theme')
      let newQuote = new Quote( 0, quoteContent.value, quoteAuthor.value, quoteTheme.value)
      
      newQuote.sendToDBandRender()
      quoteContent.value = ""
      quoteAuthor.value = ""
      
      event.preventDefault()
    })

    //Click handler for random quote by theme 
    let themeButtons = document.getElementsByClassName("theme-link")
    for(let i = 0; i < themeButtons.length; i++) {
      themeButtons[i].addEventListener("click", () => {
        fetchRandomByTheme(themeButtons[i].children[0].id)
      })
    }

    //Filter quotes by theme 
    function filterByTheme() {
      document.getElementById("filter-by-theme").onchange = function () { 
        let theme = this.value.toLowerCase()
        let quotes = document.getElementsByClassName("quote")
        for(let i = 0; i < quotes.length; i++){
          let quoteTheme = quotes[i].querySelector("div").children[1]
          if (!quoteTheme.textContent.includes(theme)) {
            quotes[i].style.display = "none"
            quotes[i].nextElementSibling.style.display = "none"
          } else if (quoteTheme.textContent.includes(theme)){
            quotes[i].style.display = "flex"
            quotes[i].nextSibling.style.display = "block"
          }
        }
       } 
    }
    filterByTheme();

    // Filter by author 
    function filterByAuthor() {
      document.getElementById("filter-by-author").oninput = function () {
        let theme = this.value.toLowerCase()
        let quotes = document.getElementsByClassName("quote")
        for(let i = 0; i < quotes.length; i++){
          let quoteAuthor = quotes[i].querySelector("div").children[0]
          if (!quoteAuthor.textContent.includes(theme)) {
            quotes[i].style.display = "none"
            quotes[i].nextElementSibling.style.display = "none"
          } else if (quoteAuthor.textContent.includes(theme)){
            quotes[i].style.display = "flex"
            quotes[i].nextSibling.style.display = "block"
          }
        }
       } 
    }
    filterByAuthor(); 
})

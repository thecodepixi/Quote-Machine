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
      let quoteText = document.createElement('p')
      quoteText.textContent = this.content 
      let author = document.createElement('small')
      author.textContent = `${this.author} --  `
      author.classList.add('is-uppercase')
      let theme = document.createElement('small')
      theme.textContent = this.theme

      let buttonDiv = document.createElement('div')
      buttonDiv.classList.add('buttons', 'is-pulled-right')
      let editButton = document.createElement('button')
      editButton.textContent = 'Edit'
      editButton.classList.add('tag', 'is-dark')
      editButton.id = this.id 
      let deleteButton = document.createElement('button')
      deleteButton.textContent = 'Delete'
      deleteButton.classList.add('tag', 'is-danger')
      buttonDiv.appendChild(editButton)
      buttonDiv.appendChild(deleteButton)
      let hr = document.createElement('hr')
      thisDiv.appendChild(quoteText) 
      thisDiv.appendChild(author)
      thisDiv.appendChild(theme)
      thisDiv.appendChild(buttonDiv)
      thisDiv.appendChild(hr)
      return thisDiv 
  }

  renderAsRandom(){
    let randomContent = document.getElementById('random-quote-content')
    let randomAuthor = document.getElementById('random-quote-author')
    randomContent.textContent = this.content 
    randomAuthor.textContent = this.author 
  }

  sendToDB(){
    fetch('http://localhost:3000/quotes', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
     }, 
     body: JSON.stringify(this)  
    })
      .then(resp => resp.json())
      .then(json => console.log(json))
  }
}

function createNewQuote(){
  
}

function fetchRandomQuote() {
  let quoteQuantity = document.querySelectorAll("div.quote").length
  let randomQuoteIndex = Math.floor(Math.random() * quoteQuantity)

  fetch(`http://localhost:3000/quotes/${randomQuoteIndex}`)
    .then(resp => resp.json())
    .then(json => {
      let randomQuote = new Quote(json.id, json.content, json.author.name, json.theme.name)
      randomQuote.renderAsRandom()
    })
}

function renderQuotes(quotes){
  for(quote of quotes) {
    let container = document.getElementById('quote-container')
    let thisQuote = new Quote(quote.id, quote.content, quote.author.name, quote.theme.name)
    let thisQuoteDiv = thisQuote.createQuoteElement(); 
    container.appendChild(thisQuoteDiv)
  }
}

// DOM CONTENT LOADED -- call functions here 
document.addEventListener("DOMContentLoaded", () => {

  // Render All Quotes 
  fetch('http://localhost:3000/quotes/')
  .then(resp => resp.json())
  .then(json => renderQuotes(json))

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

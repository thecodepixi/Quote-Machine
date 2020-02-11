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
      theme.classList.add("is-capitalized")

      let buttonDiv = document.createElement('div')
      buttonDiv.classList.add('buttons', 'is-pulled-right')
      let deleteButton = document.createElement('button')
      deleteButton.textContent = 'Delete'
      deleteButton.classList.add('tag', 'is-danger')
      deleteButton.id = this.id 
      deleteButton.addEventListener("click", () => {
        this.deleteQuote()
        thisDiv.remove()
      })
      buttonDiv.appendChild(deleteButton)
      let hr = document.createElement('hr')
      thisDiv.appendChild(quoteText) 
      thisDiv.appendChild(author)
      thisDiv.appendChild(theme)
      thisDiv.appendChild(buttonDiv)
      thisDiv.appendChild(hr)
      return thisDiv 
  }

  renderQuote() {
    let container = document.getElementById('quote-container')
    let thisQuoteDiv = this.createQuoteElement(); 
    container.prepend(thisQuoteDiv)
  }

  renderAsRandom(){
    let randomContent = document.getElementById('random-quote-content')
    let randomAuthor = document.getElementById('random-quote-author')
    randomContent.textContent = this.content 
    randomAuthor.textContent = this.author 
    console.log(this.theme)
  }

  sendToDBandRender(){
    fetch('http://localhost:3000/quotes', {
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
      })
  }

  deleteQuote(){
    fetch(`http://localhost:3000/quotes/${this.id}`, {
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

  fetch(`http://localhost:3000/quotes/${randomQuoteIndex}`)
    .then(resp => resp.json())
    .then(json => {
      let randomQuote = new Quote(json.id, json.content, json.author.name, json.theme.name)
      randomQuote.renderAsRandom()
    })
}

function fetchRandomByTheme(theme) {
  fetch(`http://localhost:3000/themes/${theme}`)
    .then(resp => resp.json())
    .then(json => {
      let randomQuote = new Quote(json.id, json.content, json.author.name, json.theme.name)
      randomQuote.renderAsRandom()
    })
}

function saveQuotes(quotesObj, quotes){
  for(quote of quotes) {
    let thisQuote = new Quote(quote.id, quote.content, quote.author.name, quote.theme.name)
    quotesObj.push(thisQuote)
  }
}

function renderQuotes(quotesArray, quotes){
  saveQuotes(quotesArray, quotes)
  quotesArray.forEach( quote => {
    quote.renderQuote()
  })
}


// DOM CONTENT LOADED -- call functions here 
document.addEventListener("DOMContentLoaded", () => {

  const quotesArray = []

  // Render All Quotes 
  fetch('http://localhost:3000/quotes/')
  .then(resp => resp.json())
  .then(json => renderQuotes(quotesArray, json))

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

})

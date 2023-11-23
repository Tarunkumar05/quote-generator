const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

//show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//hide loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//Show New Quote 
function newQuote() {
    loading();
    //pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //check if author field is blank and eaplace it with ''Unknown'
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    //Check Quote length to determine styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote')
    }
    //set quote, hide loader
    quoteText.textContent = quote.text;
    complete();
}


//Get Quotes from API
//An asynchronous function can run at any time independently and it won't stop the browser from copleting the loading of a page

async function getQuotes() {
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json'
    //try catch allows us to attempt to complete a fetch request but if it doesn't work, we can catch the error information and do something with it.
    try {
        const response = await fetch (apiUrl);
        apiQuotes = await response.json();
        newQuote();
        
    } catch (error) {
        
    }
}
// Tweet Quote
function tweetQuote() {
    // template string(``)allows us to pass in a variable
    const twitterUrl =`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank') //_blank allow open in a new tab
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//On Load 
getQuotes();
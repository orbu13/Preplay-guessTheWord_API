const displayingHiddenWords = document.querySelector(".displayingHiddenWords")

fetch('json/data.json')
.then(function(response){
    return response.json()
})
.then(function(data){
    console.log(data);
    const randomIndex = Math.floor(Math.random()*data.words.length)
    const randomWord = data.words[randomIndex]
    console.log(randomWord);
    for(let character of randomWord){
        const blank = document.createElement("span")
        blank.classList.add("blank")
        blank.id = character
        displayingHiddenWords.appendChild(blank)
    }
})

const keyWord = document.querySelector(".keyWord")
const have = document.querySelector("#have")

for(let i = 65; i < 91; i++){
    const card = document.createElement("div")
    const button = document.createElement("button")
    button.classList.add("button")
    button.innerText = String.fromCharCode(i)
    button.id = String.fromCharCode(i)
    
    keyWord.appendChild(card)
    card.appendChild(button)
}

keyWord.addEventListener("click", onClick)
let attempt = 10

function onClick(e){
    let isPresent = false
    e.target.classList.add("clicked")
    const allBlanks = document.querySelectorAll(".blank")
    allBlanks.forEach(element =>{
        if(element.id.toLowerCase() === e.target.id.toLowerCase()){
            element.innerText = element.id
            isPresent = true
        }
    })
    if(isPresent === false){
        have.innerText = attempt
        attempt--
    }
    if(attempt === 0){
        gameOver()
    }
    have.innerText = attempt
}

function gameOver(){
    keyWord.removeEventListener("click", onClick)
    const gameOver = document.querySelector(".gameOver")
    const gameOverH2 = document.createElement("h1")
    const hiddenWord = document.createElement("h2")
    const allBlanks = document.querySelectorAll(".blank")
    let wordToGuess = ""

    allBlanks.forEach(element => {
        wordToGuess += element.id
    })

    hiddenWord.classList.add(".gameOver")

    gameOverH2.innerText = "GAME OVER"
    hiddenWord.innerText = wordToGuess
    gameOver.appendChild(gameOverH2)
    gameOver.appendChild(hiddenWord)
}


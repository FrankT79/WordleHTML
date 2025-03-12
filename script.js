let word = "ARIEL";
let guess = "";
let words=[];
const gameover = document.getElementById("gameover");
const keyboard = document.getElementById("keyboard");
const keyboard1 = document.getElementById("keyboard1");
const keyboard2 = document.getElementById("keyboard2");
const keyboard3 = document.getElementById("keyboard3");
const board = document.getElementById("board");
const solution = document.getElementById("solution");
let counter = 1;
let playing = 1;
let helper = 0;
let score = document.getElementById("score");
let scoreCount = localStorage.getItem("scoreCount") || 0;
score.innerHTML = `The score is ${scoreCount}`;

//setup keyboard on pageload
(function Keyboard() {
    let letters1 = ["Q","W","E","R","T","Y","U","I","O","P"]
    let letters2 = ["A","S","D","F","G","H","J","K","L"]
    let letters3 = ["Z","X","C","V","B","M","N"]
    letters1.map(letter=>{let button = document.createElement("button"); button.innerText = letter; button.classList = "button"; keyboard1.appendChild(button);})
    letters2.map(letter=>{let button = document.createElement("button"); button.innerText = letter; button.classList = "button"; keyboard2.appendChild(button);})
    letters3.map(letter=>{let button = document.createElement("button"); button.innerText = letter; button.classList = "button"; keyboard3.appendChild(button);})

})();

//setup playboard on pageload
(function playboard() {
    while(counter < 31){
    let tile = document.createElement("div");
    tile.classList = "tile";
    tile.id = counter;
    board.appendChild(tile);
    counter +=1 ;
    }
    counter = 1;
})();


//get words array on pageload
(async function getWord() {
    const url = "https://frankt79.github.io/WordleHTML/api.md";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      words = await response.json();
      word =  words[Math.floor(Math.random()*words.length)].toUpperCase();
      console.log(word);

    } catch (error) {
      console.error(error.message);
    }
  })()

//get a new word and reset the board
function play(){
    counter =1;
    while(counter < 31){
        const field = document.getElementById(counter);
        field.classList = "tile";
        field.innerText =""
        counter +=1 ;
        }
        counter = 1;
        helper=0;
        gameover.style.visibility = "hidden";
        word = words[Math.floor(Math.random()*words.length)].toUpperCase();
        console.log(word);
        keyboard.addEventListener("click",handleClick);
        guess = "";
        solution.innerText = "";
        solution.innerHTML;
        gameover.innerText = "!! YOU WIN !!";
        gameover.style.color = "green";
}

//handle input
   function handleClick(e){
        const field = document.getElementById(counter)
        entered = e.target.innerText;
        if(entered.length ===1){
            field.innerHTML = e.target.innerText;
            guess +=e.target.innerText;
            counter++;
        }

        if(guess.length == word.length){
            console.log(guess)

            for(let i = 0; i<5; i++){
                if(guess[i]===word[i]){
                    let converted = (i+1+helper).toString();
                    let tile = document.getElementById(converted);
                    tile.classList.add("true");
                }
                else if(word.includes(guess[i])){
                    let converted = (i+1 +helper).toString();
                    console.log(converted);
                    let tile = document.getElementById(converted);
                    tile.classList.add("maybe")
                }
                else{
                    let converted = (i+1+helper).toString();
                    console.log(converted);
                    let tile = document.getElementById(converted);
                    tile.classList.add("wrong")
                }
            }
            if(guess === word){
                 scoreCount ++;
                localStorage.setItem("scoreCount", scoreCount);
                score.innerHTML = `Youre score is ${scoreCount}`;
                keyboard.removeEventListener("click",handleClick);
                gameover.style.visibility = 'visible';
            };
            if(guess !== word){guess=""}

            helper+=5;
            if(helper == 30 && guess !== word){
                gameover.innerText = "!! YOU LOST !!";
                gameover.style.visibility = "visible";
                gameover.style.color = "red";
                keyboard.removeEventListener("click",handleClick);
                solution.innerText = word;
            }
        }

   }
  keyboard.addEventListener("click",handleClick);

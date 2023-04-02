const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}



async function start() {
  console.log("Let's play a game where you (human) make up a number and I (computer) try to guess it.")
  let secretNumber = await ask("What is your secret number?\nI won't peek, I promise...\n");
  console.log('You entered: ' + secretNumber);
  let min = 0
  let max = 101
  let guessCount = 0
  
  while (guessCount < 7) {
    let guess = Math.floor((min + max) / 2)
    let check = await ask(`I guess ${guess}! Is that right? ('Y' or 'N') `)
    guessCount++
    if (check == 'y') {
      console.log(`I WIN! I guessed your number with ${guessCount} guesses!`)
      break
    } else {
      let highOrLow = await ask('Is it higher (H), or lower (L)? ')
        if (highOrLow == 'h') {
          min = guess + 1
        } else if (highOrLow == 'l') {
          max = guess - 1
        }
    }
    
  }
  
  if (guessCount > 7) {
    console.log("I couldn't guess your number :(")
  }
  process.exit();
}


start()


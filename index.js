const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}



async function start() {
  console.log("Let's play a game where you (human) make up a number and I (computer) try to guess it.")
  let secretNumber = await ask("What is your secret number (0-100)?\nI won't peek, I promise...\n");

  // Check for valid integers
  if (isNaN(secretNumber) || (secretNumber < 0) || (secretNumber > 100) || (secretNumber % 1 != 0)) {
    while(isNaN(secretNumber) || (secretNumber < 0) || (secretNumber > 100) || (secretNumber % 1 != 0)) {
      if (!isNaN(secretNumber) && (secretNumber < 100) && (secretNumber > 0) && (secretNumber % 1 === 0)) break
      secretNumber = await ask('Please only enter WHOLE NUMBERS between 0 and 100 ')
    }
  }
  console.log('You entered: ' + secretNumber);
  
  let min = 0
  let max = 100
  let win = false
  let cheating = false
  let guessCount = 0
  
  while (guessCount < 7) {
    let guess = Math.floor((min + max) / 2)
    let check = await ask(`I guess ${guess}! Is that right? (Y) or (N) `)
    guessCount++

    check = check.toLowerCase()

    // Check to validate user input
    while (check != 'y' || check != 'n') {
      if (check == 'y' || check == 'n') break
      check = await ask ("Please enter (Y) or (N) ")
      check = check.toLowerCase()
    }

    if (check == 'y') {
      console.log(`I WIN! I guessed your number with ${guessCount} guesses!`)
      win = true
      break
    } else if (guess == secretNumber) {
      cheating = true
      console.log("\n\nCHEATING DETECTED! I don't play with cheaters >:[")
      break
    } else {
      let highOrLow = await ask('Is it higher (H), or lower (L)? ')
      highOrLow = highOrLow.toLowerCase()

      // Check to validate user input
      while (highOrLow != 'l' || highOrLow != 'h') {
        if (highOrLow == 'l' || highOrLow == 'h') break
        highOrLow = await ask ("NOT A VALID RESPONSE! Please enter (H) or (L) ")
        highOrLow = highOrLow.toLowerCase()
      }
      
        if (highOrLow == 'h') {
          min = guess + 1
        } else if (highOrLow == 'l') {
          max = guess - 1
        }
    }
    
  }

  if (win == false && cheating == false) {
    console.log("I couldn't guess your number :(")
  }
  
  process.exit();
}


start()


const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

// Functions to validate various user inputs --------------------------- 
function validateYesNo(input, guessNumber, secretNumber) { // Check if user entered valid input when asked "Yes or no"
  input = input.toLowerCase()

  if (!input.startsWith('y') && !input.startsWith('n')) {
    console.log('\n!!! Not a valid input!')
    return false
  } else if (input.startsWith('y') && guessNumber !== parseInt(secretNumber)) {
    console.log(`\n!! WRONG! I can detect that this is not your secret number!`)
    return false
  } else {
    return true
  }
}

function validateHighLow(input, guessNumber, secretNumber) { // Check if user entered valid input when asked "High or low"
  input = input.toLowerCase()

  if (!input.startsWith('h') && !input.startsWith('l')) {
    console.log(`\n!!! Not a valid input!`)
    return false
  } else if (input.startsWith('h') && guessNumber > secretNumber) {
    console.log(`\n!!! Your number is not higher than ${guessNumber}!`)
    return false
  } else if (input.startsWith('l') && guessNumber < secretNumber) {
    console.log(`\n!!! Your number is not lower than ${guessNumber}!`)
    return false
  } else {
    return true
  }
}

function isValidNumber(input) { // Check if user entered a valid number within the range
  let number = parseInt(input)
  let checkFloat = parseFloat(input)

  if (isNaN(number) || !(number <= 100) || !(number >= 0) || checkFloat !== Math.round(checkFloat)) {
    console.log("\n!!! Not a valid number!")
    return false
  } else {
    return true
  }
}
// ---------------------------------------------------------------------------------------------------------------


async function start() {
  // Intro
  console.log("\nLet's play a game where you (human) make up a number and I (computer) try to guess it.")
  let secretNumber = await ask("What is your secret number (0-100)?\nI won't peek, I promise...\n");
  
  // Check if user entered a valid number
    while(true) {
      if (isValidNumber(secretNumber)) {
        break
      }

      secretNumber = await ask("Please enter a number (0-100): ")
    }
  // ---------------------------------------------------------------------------------------------------------------
  console.log('You entered: ' + secretNumber);

  // Initialize
  let min = 0
  let max = 100
  let guessCount = 0
  let isWin = false
  // ---------------------------------------------------------------------------------------------------------------
  
  while (guessCount < 7) { // Game loop
    let guess = Math.floor((min + max) / 2) // Binary Search
    guessCount++
    console.log(`\nI guess ${guess}!`)

    let yesOrNo = await ask("Is that correct? ('Y' or 'N'): ")

    // Check if user entered valid input
    while(true) {
      if (validateYesNo(yesOrNo, guess, secretNumber)) {
        break
      } 
      yesOrNo = await ask("Please enter ('Y' or 'N'): ")
    }

    yesOrNo = yesOrNo.toLowerCase()
    // ---------------------------------------------------------------------------------------------------------------
    
    if (yesOrNo.startsWith('n')) {
      if (guess === parseInt(secretNumber)) { // Exits game when user cheats
        console.log(`\n\n!!! CHEATING DETECTED! Goodbye.`)
        break
      }

      let highOrLow = await ask(`\nIs your number higher or lower than ${guess}?\nPlease enter ('H' or 'L'): `)
      
      // Check if user entered valid input
      while(true) {
        if (validateHighLow(highOrLow, guess, secretNumber)) {
          break
        } 
        highOrLow = await ask("Please enter ('H' or 'L'): ")
      }

      highOrLow = highOrLow.toLowerCase()
    // ---------------------------------------------------------------------------------------------------------------
      
      highOrLow.startsWith('h') // Updates the min/max values accordingly
      ? min = guess + 1 
      : max = guess - 1

    } else { // Only reaches this point if computer has actually guessed the user's number
      console.log("\nYAY I GUESSED YOUR NUMBER!\nThank you for playing :)")
      isWin = true
      break
    }
  }

    if (!isWin) { // If the computer did not guess the user's number within 7 guesses
      console.log(`\nSorry, I couldn't guess your number :(`)
    }

  process.exit()
}

start()



const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

function checkGuessCount(guessCount, secretNumber) { // Check if user reached guess limit
  if (guessCount === 10) {
    console.log(`\nYou couldn't guess my number :( It was ${secretNumber}!\nGoodbye!`)
    return true
  } else {
    return false
  }
}

function checkValidGuess(guess, storeHigherLower, storedGuesses) { // Check if user followed computer's directions
  let lastGuess = storedGuesses[storedGuesses.length - 1]
  let lasthOrL = storeHigherLower[storeHigherLower.length - 1]

  if (guess < lastGuess && (lasthOrL === 'h')) {
    console.log('\n!!! Not valid! I said HIGHER!')
    return true
  } else if (guess > lastGuess && lasthOrL === 'l') {
    console.log('\n!!! Not valid! I said LOWER!')
    return true
  } else {
    return false
  }
}

function isValidNumber(input) { // Check if user entered a valid number within the range
  let checkFloat = parseFloat(input)

  if (isNaN(input) || !(input <= 100) || !(input >= 0) || checkFloat !== Math.round(checkFloat)) {
    console.log("\n!!! Not a valid number!")
    return false
  } else {
    return true
  }
}


async function start() {
  // Intro
  console.log("\nLet's play a game where I (computer) make up a number and YOU (human) try to guess it.")
  console.log("\nYou get 10 tries!")

  //Initialize
  let maximum = 100
  let guessCount = 0
  let secretNumber = Math.floor(Math.random() * (maximum + 1)) // Generates random number between 0 and the maximum number
  let storedGuesses = []
  let storeHigherLower = []
  //----------------------------------------------------------------------------

  while(true) { // Game Loop
    let guess = await ask("Enter your guess: ")
    guess = parseInt(guess)
    guessCount++

    while (true) { // Validates user input
      if (isValidNumber(guess)) {
        break
      } else {
        guess = await ask("Enter your guess: ")
      }
    }

    while (true) { // Checks if user followed the computers directions for guess to be higher or lower
      if (checkValidGuess(guess, storeHigherLower, storedGuesses)) {
        guess = await ask("Enter your guess: ")
      } else {
        storedGuesses.push(guess)
        break
      }
    }
    
    // Checks if user guessed the number correctly and responds accordingly
    if (guess === secretNumber) {
      console.log(`\nCORRECT! My number is ${secretNumber}! Thank you for playing :)`)
      break
    } else {
      if (checkGuessCount(guessCount, secretNumber)) {
        break
      }

      if (secretNumber > guess) {
        console.log('\nHigher!')
        storeHigherLower.push('h') // Keeps track of "higher/lowers" to make sure user is following directions
      } else {
        console.log('\nLower!')
        storeHigherLower.push('l')
      }
    
    }
    
  }
  
  process.exit()
}

start()
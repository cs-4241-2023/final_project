import axios from 'axios';

async function isInWordsAPI(submittedWord) {
  const options = {
    method: 'GET',
    url: 'https://wordsapiv1.p.rapidapi.com/words/' + submittedWord + '/frequency',
    headers: {
      'X-RapidAPI-Key': '4b7a9e4ab2msh81ab5bcc866f2aep15d851jsn52cfcb7a6000',
      'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
    }
  };
  
  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data
  } catch (error) {
    console.error(error);
    return false
  }
}

function isValidWord(submittedWord, puzzleWord) {

  console.log(`Submitted word: ${submittedWord}`)

  if (submittedWord.length < 3 || submittedWord.length > 10) {
    console.log(`Submitted word is not between 3 and 10 characters in length.
     Word length: ${submittedWord.length}.`)
    return false
  }

  submittedWord = submittedWord.toLowerCase()

  for (let i = 0; i < submittedWord.length; i++) {
    let curChar = submittedWord.charAt(i)
    if (!puzzleWord.includes(curChar.toString())) {
      console.log(`Submitted word has characters that are not in the puzzle word.
       Incorrect character: ${curChar.toString()}. 
       Puzzle word: ${puzzleWord}.`)
      return false
    }
  }

  let wordsAPIData = isInWordsAPI(submittedWord)

  if (!wordsAPIData) {
    console.log('WordsAPI did not find an entry for the submitted word"')
    return false
  }

  console.log(wordsAPIData)
}

isValidWord("is", "island")
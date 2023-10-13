import dotenv from "dotenv";
dotenv.config();
import fetch from 'node-fetch'

const minWordLength = 4
const maxWordLength = 10
const maxRarityScore = 9
const wordLengthMultiplier = 100
const pangramMultiplier = 2

/**
 * 
 * @returns score if the word is valid, null if it is not
 */
export async function calculateScore(submittedWord, puzzleWord) {

  submittedWord = submittedWord.toLowerCase()
  console.log(`Submitted word: ${submittedWord}`)

  const wordsAPIData = await isValidWord(submittedWord, puzzleWord)
  console.log('WORDS API DATA: ',wordsAPIData)
  if (wordsAPIData === false || wordsAPIData.success === false) {
    return null
  }

  // Some of the entries in WordsAPI do not have frequency data. Presuming that these words
  // are usually rare, assign a low zipf score.
  let submittedWordZipf = 1.5
  if (wordsAPIData.frequency !== undefined && wordsAPIData.frequency.zipf !== undefined) {
    submittedWordZipf = wordsAPIData.frequency.zipf
  }

  // The most common words seem have a frequency score of greater than 7 but less than 8,
  // so the rarity score multiplier will always be greater than 1
  const rarityScore = maxRarityScore - submittedWordZipf
  console.log(`${submittedWord} rarity score: ${rarityScore}`)

  let score = Math.ceil(wordLengthMultiplier * submittedWord.length * rarityScore)
  if (isPangram(submittedWord, puzzleWord)) {
    score = score * pangramMultiplier
  }

  console.log(`${submittedWord} total score: ${score}`)
  const scores = {
    'totalscore': score,
    'rarityscore': rarityScore
  }
  return scores
}

async function isInWordsAPI(submittedWord) {
    const url = 'https://wordsapiv1.p.rapidapi.com/words/' + submittedWord + '/frequency';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.WORDS_API_KEY,
        'X-RapidAPI-Host': process.env.WORDS_API_HOST
      }
  };

  try {
    const response = await fetch(url, options);
    const result = JSON.parse(await response.text());
    console.log(result);
    return result
  } catch (error) {
    console.error(error);
    return false
  }
}

/**
 * 
 * @returns frequency data from WordsAPI if the word is valid, false if it is not
 */
async function isValidWord(submittedWord, puzzleWord) {

  if (submittedWord.length < minWordLength || submittedWord.length > maxWordLength) {
    console.log(`Submitted word is not between 3 and 10 characters in length.
     Word length: ${submittedWord.length}.`)
    return false
  }

  for (let i = 0; i < submittedWord.length; i++) {
    let curChar = submittedWord.charAt(i)
    if (!puzzleWord.includes(curChar.toString())) {
      console.log(`Submitted word has characters that are not in the puzzle word.
       Incorrect character: ${curChar.toString()}. 
       Puzzle word: ${puzzleWord}.`)
      return false
    }
  }

  const wordsAPIData = await isInWordsAPI(submittedWord)

  if (!wordsAPIData) {
    console.log('WordsAPI did not find an entry for the submitted word"')
    return false
  }
  return wordsAPIData
}

/**
 * 
 * @returns true if the submitted word contains all the characters in the puzzle word,
 * false if it does not
 */
function isPangram(submittedWord, puzzleWord) {
  for (let i = 0; i < puzzleWord.length; i++) {
    let curChar = puzzleWord.charAt(i)
    if (!submittedWord.includes(curChar.toString())) {
      console.log(`${submittedWord} does not contain ${curChar}, so it is not a pangram of ${puzzleWord}`)
      return false
    }
  }
  console.log(`${submittedWord} is a pangram of ${puzzleWord}`)
  return true
}
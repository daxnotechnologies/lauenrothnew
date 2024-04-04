let textCode = '';
let numCode = '';
let specialChar = '';
let result = '';

const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const num = '0123456789';
const specialCharacters = '!@#$%&';

export function TextNumCode() {
  const textLength = getRandomLength(2, 4); // Adjusted to ensure a length between 6 and 12 characters
  const numLength = getRandomLength(1, 4); // Adjusted to ensure a length between 6 and 12 characters
  const specialCharLength = getRandomLength(1, 2); // Adjusted to ensure a length between 6 and 12 characters
  const timestampLength = 2; // Constant, to ensure a length between 6 and 12 characters
  const uniqueIdentifierLength = 1; // Constant, to ensure a length between 6 and 12 characters

  const timestamp = new Date().getTime().toString().substr(-timestampLength);
  const uniqueIdentifier = Math.random().toString(36).substr(2, uniqueIdentifierLength);

  for (let i = 0; i < textLength; i++) {
    textCode += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }

  for (let i = 0; i < numLength; i++) {
    numCode += num.charAt(Math.floor(Math.random() * num.length));
  }

  for (let i = 0; i < specialCharLength; i++) {
    specialChar += specialCharacters.charAt(Math.floor(Math.random() * specialCharacters.length));
  }

  const remainingLength = 12 - (textLength + numLength + specialCharLength + timestampLength + uniqueIdentifierLength);
  const fillerLength = Math.max(0, remainingLength); // Ensure non-negative remaining length
  const filler = alphabet.charAt(Math.floor(Math.random() * alphabet.length)).repeat(fillerLength);

  result = textCode + numCode + specialChar + timestamp + uniqueIdentifier + filler;

  // Mixing the characters in the result string
  result = shuffleString(result);

  textCode = '';
  numCode = '';
  specialChar = '';

  return result;
}

function shuffleString(str) {
  let array = str.split('');
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array.join('');
}

function getRandomLength(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

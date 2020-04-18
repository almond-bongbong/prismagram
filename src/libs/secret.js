import { adjectives, nouns } from './words';

const getRandomNumber = (max) => Math.floor(Math.random() * max);

export const generateSecret = () => {
  const wordsLength = Math.min(adjectives.length, nouns.length);

  return `${adjectives[getRandomNumber(wordsLength)]} ${
    nouns[getRandomNumber(wordsLength)]
  }`;
};

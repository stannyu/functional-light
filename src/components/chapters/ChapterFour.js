import React, { useEffect } from 'react';

function ChapterFour() {
  useEffect(() => {
    initChapterFourCalculations();
  });

  const partialRight = (fn, ...presetArgs) => (...laterArgs) => fn(...laterArgs, ...presetArgs);

  function initChapterFourCalculations() {
    console.log('Chapter 4: Composing Functions');

    outputToInput();
    compositionCreating();
  }

  function outputToInput() {
    const text =
      'To compose two functions together, pass th output of the first function call as the input of the second function call.';

    const wordsFound = words(text);
    const wordsUsed = unique(wordsFound);

    console.log(wordsUsed, 'wordsUsed');

    const usedWords = unique(words(text));
    console.log(usedWords, 'usedWords');

    const uniqueWords = str => unique(words(str));
    // wordsUsed <-- unique <-- words <-- text

    const compose2 = (fn2, fn1) => inputValue => fn2(fn1(inputValue));
    const uniqueWords2 = compose2(unique, words);
    console.log(uniqueWords2(text), 'uniqueWords2');
  }

  function compositionCreating() {
    const text =
      'To compose two functions together, pass th output of the first function call as the input of the second function call.';

    const compose = (...fns) => result => {
      const list = [...fns];
      while (list.length > 0) {
        result = list.pop()(result);
      }
      return result;
    };

    // OR
    // function compose(...fns) {
    //   return function composed(result){
    //     // copy the array of functions
    //     const list = [...fns];
    //     while (list.length > 0) {
    //       // take the last function off the end of the list
    //       // and execute it
    //       result = list.pop()( result );
    //     }
    //     return result;
    //   };
    // }

    const skipShortWords = words => {
      const filteredWords = [];
      for (let word of words) {
        if (word.length > 4) {
          filteredWords.push(word);
        }
      }
      return filteredWords;
    };
    const skipLongWords = words => {
      const filteredWords = [];
      for (let word of words) {
        if (word.length <= 4) {
          filteredWords.push(word);
        }
      }
      return filteredWords;
    };

    const biggerWords = compose(skipShortWords, unique, words);
    const wordsUsed = biggerWords(text);

    console.log(wordsUsed, 'biggerWords!');

    const filterWords = partialRight(compose, unique, words);
    const longerWordsFn = filterWords(skipShortWords);
    const shorterWordsFn = filterWords(skipLongWords);

    console.log(longerWordsFn(text), shorterWordsFn(text), 'functionally filtered');
  }

  return <h2>Chapter 4: Composing Functions</h2>;

  function words(str) {
    return String(str)
      .toLowerCase()
      .split(/\s|\b/)
      .filter(function alpha(v) {
        return /^[\w]+$/.test(v);
      });
  }

  function unique(list) {
    const uniqList = [];

    for (let v of list) {
      // value not yet in the new list?
      if (uniqList.indexOf(v) === -1) {
        uniqList.push(v);
      }
    }

    return uniqList;
  }
}

export default ChapterFour;

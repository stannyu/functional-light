import React, { useEffect } from 'react';

function ChapterThree() {
  useEffect(() => {
    initChapterThreeCalculations();
  });

  function initChapterThreeCalculations() {
    console.log('Chapter 3 mounted');
    allForOne();
    oneOnOne();
    unchangingOne();
    adaptingFunctions2Parameters();
  }

  function allForOne() {
    const unary = fn => arg => fn(arg);
    /**
     * happens because parseInt expects 2 arguments
     * where second one is radix that state numerical system.
     * unary passes only one
     * @type {number[]}
     */
    const a = ['1', '2', '3'].map(parseInt); // [1,NaN,NaN]
    const b = ['1', '2', '3'].map(unary(parseInt)); // [1,2,3]
    console.log(a, b);
  }

  function oneOnOne() {
    const identity = v => v;
    // OR
    // function identity(v) {
    //   return v;
    // }

    const words = '   Now is the time for all...  '.split(/\s|\b/);
    console.log(words); // ["","Now","is","the","time","for","all","...",""]
    console.log(words.filter(identity)); // ["Now","is","the","time","for","all","..."]

    const output = (msg, formatFn = identity) => {
      const transformedMsg = formatFn(msg);
      console.log(transformedMsg);
    };

    const upper = txt => txt.toUpperCase();

    output('Hello', upper);
    output('Hello');
  }

  function unchangingOne() {
    const constant = v => () => v;
    // OR
    // function constant(v) {
    //   return function() {
    //     return v;
    //   };
    // }

    // So if promise used
    // p1 is Promise
    // p1.then( foo ).then( () => p2 ).then( bar );
    // p1.then( foo ).then( constant(p2) ).then( bar );
  }

  function adaptingFunctions2Parameters() {
    const foo = (x, y) => {
      console.log(x + y);
    };
    const bar = fn => {
      fn([3, 9]);
    };
    bar(foo); // fails

    // Solution:
    const spreadArgs = fn => argsArray => fn(...argsArray);
    // OR
    // function spreadArgs(fn) {
    //   return function (argsArray) {
    //       return fn(...argsArray)
    //   }
    // }

    bar(spreadArgs(foo)); // 12

    const gatherArgs = fn => (...argsArray) => fn(argsArray); // does opposite, i.e. gather arguments

    function combineFirstTwo([v1, v2]) {
      return v1 + v2;
    }
    [1, 2, 3, 4, 5].reduce(gatherArgs(combineFirstTwo)); //15
  }

  return <h2>Chapter 3: Managing Function Inputs</h2>;
}

export default ChapterThree;

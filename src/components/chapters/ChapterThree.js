import React, { useEffect } from 'react';

function ChapterThree() {
  useEffect(() => {
    initChapterThreeCalculations();
  });

  function initChapterThreeCalculations() {
    console.log('Chapter 3: Managing Function Inputs');
    // allForOne();
    // oneOnOne();
    // unchangingOne();
    // adaptingFunctions2Parameters();
    // someNowSomeLater();
    // oneAtATime();
    // noCurryPlease();
    // orderMatters();
    // pointFreeNotation();
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

    output('Hello', upper); // HELLO
    output('Hello'); // Hello
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

  function someNowSomeLater() {
    const partial = (fn, ...presetArgs) => (...laterArgs) => fn(...presetArgs, ...laterArgs);

    const add = (x, y) => x + y;

    [1, 2, 3, 4, 5].map(function adder(val) {
      return add(3, val);
    }); // [4,5,6,7,8]

    [1, 2, 3, 4, 5].map(partial(add, 3)); // [4,5,6,7,8]

    /**
     * Reversing Arguments
     */

    const reverseArgs = fn => (...args) => fn(...args.reverse());
    const partialRight = (fn, ...presetArgs) => (...laterArgs) => fn(...laterArgs, ...presetArgs);

    function foo(x, y, z, ...rest) {
      console.log(x, y, z, rest);
    }

    const f = partialRight(foo, 'z:last');

    f(1, 2); // 1 2 "z:last" []

    f(1); // 1 "z:last" undefined []

    f(1, 2, 3); // 1 2 3 ["z:last"]

    f(1, 2, 3, 4); // 1 2 3 [4,"z:last"]
  }

  function oneAtATime() {
    // functioanl way
    function curryFunc(fn, arity = fn.length) {
      return (function nextCurried(prevArgs) {
        return function curried(nextArg) {
          const args = [...prevArgs, nextArg];

          if (args.length >= arity) {
            return fn(...args);
          } else {
            return nextCurried(args);
          }
        };
      })([]);
    }

    // or the ES6 => arrow form
    const curry = (fn, arity = fn.length, nextCurried) =>
      (nextCurried = prevArgs => nextArg => {
        const args = [...prevArgs, nextArg];

        if (args.length >= arity) {
          return fn(...args);
        } else {
          return nextCurried(args);
        }
      })([]);

    const add = (x, y) => x + y;
    [1, 2, 3, 4, 5].map(curry(add)(3)); // [4,5,6,7,8]

    const adder = curry(add);
    // later
    [1, 2, 3, 4, 5].map(adder(3)); // [4,5,6,7,8]

    function sum(...nums) {
      let total = 0;
      for (let num of nums) {
        total += num;
      }
      return total;
    }

    sum(1, 2, 3, 4, 5); // 15

    // now with currying:
    // (5 to indicate how many we should wait for)
    const curriedSum = curry(sum, 5);

    curriedSum(1)(2)(3)(4)(5); // 15

    /**
     *  Loose curry function that allow to apply several arguments at a time
     * @param fn
     * @param arity
     * @returns {curried}
     */

    function looseCurry(fn, arity = fn.length) {
      return (function nextCurried(prevArgs) {
        return function curried(...nextArgs) {
          const args = [...prevArgs, ...nextArgs];

          if (args.length >= arity) {
            return fn(...args);
          } else {
            return nextCurried(args);
          }
        };
      })([]);
    }

    const looseCurryArrowFn = (fn, arity = fn.length, nextCurried) =>
      (nextCurried = prevArgs => (...nextArg) => {
        const args = [...prevArgs, ...nextArg];

        if (args.length >= arity) {
          return fn(...args);
        } else {
          return nextCurried(args);
        }
      })([]);

    const loosedCurriedSum = looseCurry(sum, 5);
    const loosedCurriedSumArr = looseCurryArrowFn(sum, 5);

    console.log(loosedCurriedSum(1)(2, 3)(4, 5)); // 15
    console.log(loosedCurriedSumArr(1)(2, 3)(4, 5)); // 15
  }

  function noCurryPlease() {
    function uncurryFunc(fn) {
      return function uncurried(...args) {
        let ret = fn;

        for (let arg of args) {
          ret = ret(arg);
        }

        return ret;
      };
    }

    // or the ES6 => arrow form
    const uncurry = fn => (...args) => {
      let ret = fn;

      for (let arg of args) {
        ret = ret(arg);
      }

      return ret;
    };

    function sum(...nums) {
      let sum = 0;
      for (let num of nums) {
        sum += num;
      }
      return sum;
    }

    const curry = (fn, arity = fn.length, nextCurried) =>
      (nextCurried = prevArgs => nextArg => {
        const args = [...prevArgs, nextArg];

        if (args.length >= arity) {
          return fn(...args);
        } else {
          return nextCurried(args);
        }
      })([]);

    const curriedSum = curry(sum, 5);
    const uncurriedSum = uncurry(curriedSum);

    curriedSum(1)(2)(3)(4)(5); // 15

    uncurriedSum(1, 2, 3, 4, 5); // 15
    uncurriedSum(1, 2, 3)(4)(5); // 15
  }

  function orderMatters() {
    const partialProps = (fn, presentArgs) => laterArgs => fn(Object.assign({}, presentArgs, laterArgs));

    const foo3Params = ({ x, y, z } = {}) => console.log('x:', x, 'y:', y, 'z: ', z);
    const getTwoParams = partialProps(foo3Params, { x: 1, z: 2 });
    getTwoParams({ y: 3 }); // x: 1 y: 3 z:  2

    function curryProps(fn, arity = 1) {
      return (function nextCurried(prevArgsObj) {
        return function curried(nextArgObj = {}) {
          let [key] = Object.keys(nextArgObj);
          let allArgsObj = Object.assign({}, prevArgsObj, { [key]: nextArgObj[key] });

          if (Object.keys(allArgsObj).length >= arity) {
            return fn(allArgsObj);
          } else {
            return nextCurried(allArgsObj);
          }
        };
      })({});
    }

    const f1 = curryProps(foo3Params, 3);

    f1({ y: 2 })({ x: 1 })({ z: 3 }); // x:1 y:2 z:3
  }

  function pointFreeNotation() {
    const output = msg => console.log(msg);
    const printIf = (predicate, msg) => {
      if (predicate(msg)) {
        output(msg);
      }
    };
    const isShortEnough = str => str.length <= 5;
    printIf(isShortEnough, 'Hello'); // Hello
    printIf(isShortEnough, 'Hello World'); // nothing

    /**
     * NOT!!!
     * @param predicate: function that return condition check result
     * @returns {function(...[*]): boolean}: converted predicate value
     */
    const not = predicate => (...args) => !predicate(...args);
    const isLongEnough = not(isShortEnough);

    printIf(isLongEnough, 'Hello'); // nothing
    printIf(isLongEnough, 'Hello World!'); // Hello World!


    const when = (predicate, fn) => (...args) => predicate(...args) ? fn(...args) : undefined;

    const partialRight = (fn, ...presetArgs) => (...laterArgs) => fn(...laterArgs, ...presetArgs);
    const uncurry = fn => (...args) => {
      let ret = fn;

      for (let arg of args) {
        ret = ret(arg);
      }

      return ret;
    };

    /**
     * printIfFP
     * @type {function(...[*]): *}
     * partialRight(when, output) ==> when({{predicate}}, output) ==> fn(predicate)(str);
     * uncurry(fn(predicate)(str)) ==> fn(predicate, str);
     */
    const printIfFP = uncurry(partialRight(when, output));

    printIfFP(isShortEnough, "Hi!"); // Hi!
    printIfFP(isLongEnough, "Hello World!!!"); // Hello World!!!
  }

  return <h2>Chapter 3: Managing Function Inputs</h2>;
}

export default ChapterThree;

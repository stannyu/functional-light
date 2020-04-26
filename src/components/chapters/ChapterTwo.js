import React, { useEffect } from 'react';

function ChapterTwo() {
  useEffect(() => {
    initChapterTwoCalculations();
  });

  function initChapterTwoCalculations() {
    console.log('Chapter 2: The Nature Of Functions');
  }

  function checkArity() {
    /**
     * Function arity can be checked by [[length]] function property
     * it will show how many parameters this function have
     */
    const foo = (x, y, z) => {};
    foo.length; // 3 as there are 3 parameters
  }

  return <h2>Chapter 2: The Nature Of Functions</h2>;
}

export default ChapterTwo;

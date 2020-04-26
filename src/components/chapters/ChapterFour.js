import React, { useEffect } from 'react';

function ChapterFour() {
  useEffect(() => {
    initChapterFourCalculations();
  });

  function initChapterFourCalculations() {
      console.log('Chapter 4: Composing Functions');
  }

  return <h2>Chapter 4: Composing Functions</h2>;
}

export default ChapterFour;

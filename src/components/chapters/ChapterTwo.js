import React, { useEffect } from 'react';

function ChapterTwo(props) {
  useEffect(() => {
    console.log('chapter 2 loaded');
  });

  return <h2>Chapter 2: The Nature Of Functions</h2>;
}

export default ChapterTwo;

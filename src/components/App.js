import React, { useEffect } from 'react';
import ChapterTwo from './chapters/ChapterTwo';
import ChapterThree from './chapters/ChapterThree';
import ChapterFour from './chapters/ChapterFour';

function App() {
  useEffect(() => {
    logEffectInit();
  });

  const logEffectInit = () => {
    console.log('Functional-Light JavaScript by Kyle Simpson loaded!');
  };
  return (
    <>
      <h1>Hi there</h1>
      <ChapterTwo />
      <ChapterThree />
      <ChapterFour />
    </>
  );
}

export default App;

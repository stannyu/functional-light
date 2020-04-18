import React, { useEffect } from 'react';
import ChapterTwo from './chapters/ChapterTwo';

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
    </>
  );
}

export default App;

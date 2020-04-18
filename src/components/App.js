import React, { useEffect } from 'react';

function App(props) {
  useEffect(() => {
    console.log('Use Effect initiated');
  });
  return <div>Hi there</div>;
}

export default App;

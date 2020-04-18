import React, {useEffect} from "react";

function App(props) {
  useEffect(() => {
    console.log("Use Effect!");
  });
  return <div>Hi there</div>;
}

export default App;

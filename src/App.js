import React from "react";
import { useSelector } from "react-redux";

function App() {
  const history = useSelector(state => state.searchHistory)
  console.log(history)
  return (
    <div>
      <h4>History {history[0].name}</h4>
    </div>
  )
}
export default App
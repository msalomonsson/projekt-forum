import "./App.css";
import React from "react";

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/posts/allPost")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  //test hej
  return (
    <div className="App">
      <header className="App-header">
        <ul>
          {!data
            ? "Loading..."
            : data.map((doc) => {
                return <li key={doc.id}>{doc.data.body}</li>;
              })}
        </ul>
      </header>
    </div>
  );
}

export default App;

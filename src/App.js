/*global chrome*/
import React, { useState, useEffect, useMemo } from "react";
import "./App.css";

function App() {
  const [groups, setGroups] = useState(null);

  const getGroups = () =>
    chrome.runtime.sendMessage({ type: "getGroups" }, (res) => {
      setGroups(res);
    });

  useEffect(() => {
    getGroups();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {groups !== null &&
          groups.map((dat) => (
            <div>
              <p>{`${dat.title} ${dat.tabsInCurrentGroup.length}`}</p>
            </div>
          ))}
      </header>
    </div>
  );
}

export default App;

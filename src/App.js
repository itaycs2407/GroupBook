/*global chrome*/
import React, { useState, useEffect, useMemo } from "react";
import Groups from "./components/groups";
import "./App.css";

function App() {
  const [groups, setGroups] = useState(null);
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(-1);

  const getGroups = () =>
    chrome.runtime.sendMessage({ type: "getGroups" }, (res) => {
      setGroups(res);
    });

  const handleConvert = () => {
    const groupId = groups[selectedGroupIndex].id;
    chrome.runtime.sendMessage(
      {
        type: "converGroup",
        groupTitle: groups[selectedGroupIndex].title,
        tabs: groups[selectedGroupIndex].tabsInCurrentGroup,
      },
      () => {}
    );
  };

  useEffect(() => {
    getGroups();
  }, []);

  console.log(selectedGroupIndex);
  return (
    <div className="App">
      <header className="App-header">
        <Groups
          groups={groups}
          selectedGroup={selectedGroupIndex}
          setSelectedGroup={setSelectedGroupIndex}
        />
        {selectedGroupIndex !== -1 && (
          <>
            <div>{`The selcted group is ${groups[selectedGroupIndex].title}`}</div>
            <button onClick={handleConvert}>Convert</button>
          </>
        )}
      </header>
    </div>
  );
}

export default App;

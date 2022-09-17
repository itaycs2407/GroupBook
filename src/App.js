/*global chrome*/
import React, { useState, useEffect, useMemo } from "react";
import Groups from "./components/groups";
import "./App.css";

const App = () => {
  const [groups, setGroups] = useState(null);
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(-1);

  const getGroups = () =>
    chrome.runtime.sendMessage({ type: "getGroups" }, (res) => {
      setGroups(res);
    });

  const handleConvert = () => {
    chrome.runtime.sendMessage(
      {
        type: "converGroup",
        groupTitle: groups[selectedGroupIndex].title,
        tabs: groups[selectedGroupIndex].tabsInCurrentGroup,
      },
      () => {}
    );
    setSelectedGroupIndex(-1);
  };

  useEffect(() => {
    getGroups();
  }, []);

  return (
    <div className="App">
      <Groups
        groups={groups}
        selectedGroup={selectedGroupIndex}
        setSelectedGroup={setSelectedGroupIndex}
      />
      {selectedGroupIndex !== -1 && (
        <>
          <div>{`The selcted group is ${groups[selectedGroupIndex].title}`}</div>
        </>
      )}
      <button onClick={handleConvert} disabled={selectedGroupIndex === -1}>
        Convert
      </button>
    </div>
  );
};

export default App;

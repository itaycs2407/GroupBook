/*global chrome*/
import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import Groups from "./components/groups";
import "./App.css";

const App = () => {
  const [groups, setGroups] = useState(null);
  const [selectedGroupIndex, setSelectedGroupIndex] = useState([]);

  const handelAddRemove = (index) => {
    const isInArray =
      selectedGroupIndex.findIndex((idx) => idx === index) !== -1;
    isInArray
      ? setSelectedGroupIndex((prev) => [
          ...prev.filter((item) => item !== index),
        ])
      : setSelectedGroupIndex((prev) => [...prev, index]);
  };

  const getGroups = () =>
    chrome.runtime.sendMessage({ type: "getGroups" }, (res) => {
      setGroups(res);
    });

  const handleConvert = () => {
    selectedGroupIndex.forEach((groupIndex) => {
      chrome.runtime.sendMessage(
        {
          type: "converGroup",
          groupTitle: groups[groupIndex].title,
          tabs: groups[groupIndex].tabsInCurrentGroup,
        },
        () => {}
      );
    });

    setSelectedGroupIndex([]);
  };

  useEffect(() => {
    getGroups();
  }, []);

  return (
    <Container>
      {groups !== null ? (
        <>
          <div>Select group to convert</div>
          <Groups
            groups={groups}
            selectedGroup={selectedGroupIndex}
            setSelectedGroup={handelAddRemove}
          />
        </>
      ) : (
        <div>No groups found</div>
      )}

      <ConvertButton
        onClick={handleConvert}
        disabled={selectedGroupIndex.length === 0}
      >
        Convert
      </ConvertButton>
    </Container>
  );
};

export default App;

const Container = styled.div`
  background-image: linear-gradient(315deg, #f8b500 0%, #fceabb 75%);
  padding: 20px 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5);
`;

const ConvertButton = styled.button`
  margin-top: 50px;
  min-width: 130px;
  height: 40px;
  color: #fff;
  padding: 5px 10px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  outline: none;
  border-radius: 5px;
  z-index: 0;
  background: #fff;
  overflow: hidden;
  border: 2px solid #495057;
  color: #495057;

  &:hover {
    color: #fff;
  }
  &:hover:after {
    height: 100%;
  }
  &:after {
    content: "";
    position: absolute;
    z-index: -1;
    transition: all 0.3s ease;
    left: 0;
    top: 0;
    height: 0;
    width: 100%;
    background: #495057;
  }
`;

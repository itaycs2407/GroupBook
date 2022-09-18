import React from "react";
import styled from "styled-components";

const Groups = ({ groups, selectedGroup, setSelectedGroup }) => {
  return (
    <Ul>
      {groups !== null &&
        groups.map((group, index) => (
          <Li
            key={index}
            onClick={() => setSelectedGroup(index)}
            selected={selectedGroup.includes(index)}
          >
            {group.title}
          </Li>
        ))}
    </Ul>
  );
};

export default Groups;

const Ul = styled.ul`
  padding: 0;
  gap: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Li = styled.li`
  min-width: 130px;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  text-align: center;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  outline: none;

  border-radius: 20px;
  border: none;
  box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
    7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
  background: ${(props) => (props.selected ? "#80ed99" : "#57cc99")};

  :hover {
    background-color: #80ed99;
  }
  :active {
    top: 2px;
  }
`;

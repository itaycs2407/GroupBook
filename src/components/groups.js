import React from "react";

const Groups = ({ groups, selectedGroup, setSelectedGroup }) => {
  return (
    <ul>
      {groups !== null &&
        groups.map((group, index) => (
          <li key={index} onClick={() => setSelectedGroup(index)}>
            {group.title}
          </li>
        ))}
    </ul>
  );
};

export default Groups;

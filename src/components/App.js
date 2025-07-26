// App.js
import React, { useState, useCallback } from "react";

// SkillList Component
const SkillList = React.memo(({ skills, onDelete }) => {
  return (
    <ul id="skill-list">
      {skills.map((skill, idx) => (
        <li
          key={idx}
          id={`skill-number-${idx}`}
          onClick={() => onDelete(skill)}
          style={{ cursor: "pointer", margin: "5px 0" }}
        >
          {skill}
        </li>
      ))}
    </ul>
  );
});

// Main Component
const UseCallbackComp = () => {
  const [skills, setSkills] = useState(["HTML", "CSS", "JavaScript", "React"]);
  const [inputValue, setInputValue] = useState("");

  // useCallback for deleting a skill
  const deleteSkill = useCallback(
    (skillToDelete) => {
      setSkills((prevSkills) =>
        prevSkills.filter((skill) => skill !== skillToDelete)
      );
    },
    [setSkills]
  );

  // useCallback for adding a skill
  const addSkill = useCallback(() => {
    const trimmedSkill = inputValue.trim();
    if (
      trimmedSkill &&
      !skills.includes(trimmedSkill.toLowerCase()) &&
      !skills.some((s) => s.toLowerCase() === trimmedSkill.toLowerCase())
    ) {
      setSkills((prevSkills) => [...prevSkills, trimmedSkill]);
    }
    setInputValue("");
  }, [inputValue, skills]);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1 id="heading">Skill Manager</h1>
      <input
        id="skill-input"
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter a skill"
      />
      <button id="skill-add-btn" onClick={addSkill} style={{ marginLeft: "10px" }}>
        Add Skill
      </button>

      <SkillList skills={skills} onDelete={deleteSkill} />
    </div>
  );
};

export default UseCallbackComp;

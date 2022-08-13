import React from 'react';

const EditButton = ({ setIsEditMode }) => {
  return (
    <button
      onClick={() => {
        setIsEditMode(prev => !prev);
      }}
    >
      Edit
    </button>
  );
};

export default EditButton;

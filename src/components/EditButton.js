import React from 'react';

const EditButton = ({ setisEditModeOn }) => {
  return (
    <button
      onClick={() => {
        setisEditModeOn(prev => !prev);
      }}
    >
      Edit
    </button>
  );
};

export default EditButton;

import React from "react";

import "./ImageLinkForm.css";

const ImageLinkForm = ({ onInputChange, onSubmit }) => {
  return (
    <div>
      <p className="f3 center">
        {"This Magic Brain will detect faces in your pictures"}
      </p>
      <div className="center">
        <div className="pa4 br3 shadow-3 form center">
          <input
            type="text"
            className="f4 pa2 w-70 center"
            onChange={onInputChange}
          />
          <button
            onClick={onSubmit}
            className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple pointer"
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;

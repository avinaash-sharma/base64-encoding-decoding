import React, { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [fileText, setFileText] = useState("");
  const fileHandler = async (e) => {
    const file = e.target.files[0];
    console.log(e.target.files[0]);
    const converted = await convert(file);
    setFileText(converted);
  };
  const convert = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (errorMessage) => {
        console.error("error reading file", errorMessage);
      };
    });
  };

  return (
    <div className="App">
      <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
        <div>
          <input type="file" name="file" onChange={fileHandler} />
          <button type="button">Click to convert</button>
        </div>
        <div>
          <textarea
            defaultValue={fileText}
            id="convertedImageToText"
            name="convertedImageToText"
            rows="10"
            cols="33"
          ></textarea>
        </div>
        {fileText && <img src={fileText} height="300px" width="300px" />}
      </div>
    </div>
  );
}

export default App;

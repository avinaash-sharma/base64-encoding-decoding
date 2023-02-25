import React, { useState, useEffect } from "react";
import Avatar from "react-avatar-edit";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [fileText, setFileText] = useState("");
  const [preview, setPreview] = useState(null);
  function onClose() {
    setPreview(null);
  }
  function onCrop(previous) {
    console.log("🚀 ~ file: App.jsx:13 ~ onCrop ~ previous:", previous)
    
    setPreview(previous);
  }
  function onBeforeFileLoad(elem) {
    if (elem.target.files[0].size > 1303476) {
      alert("File is too big!");
      elem.target.value = "";
    }
  }
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
        {fileText && (
          <img src={fileText} width={400} height={400} />
        )}
         
          <Avatar
            src={null}
            width={300}
            height={300}
            onCrop={onCrop}
            onClose={onClose}
            onBeforeFileLoad={onBeforeFileLoad}
          />

        {preview && <img src={preview} alt="Preview" />}
      </div>
    </div>
  );
}

export default App;

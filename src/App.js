import React, { useState } from "react";
import Particles from "react-particles-js";
import Clarifai from "clarifai";

import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";

import "./App.css";

const app = new Clarifai.App({
  apiKey: "010e9af0b5744483ba4fbab6eb22af45"
});

const particlesOptions = {
  line_linked: {
    shadow: {
      enable: true,
      color: "#3CA9D1",
      blur: 5
    }
  }
};

const App = () => {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [box, setBox] = useState({});

  const calculateFaceLocation = data => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height
    };
  };

  const display = box => {
    console.log("box:", box);
    setBox(box);
  };

  const onInputChange = ({ target }) => {
    setInput(target.value);
  };

  const onSubmit = () => {
    setImageUrl(input);

    app.models
      .predict("a403429f2ddf4b49b307e318f00e528b", input)
      .then(response =>
        // do something with response
        display(calculateFaceLocation(response))
      )
      .catch(err => console.log(err));

    // app.models
    //   .initModel({
    //     id: Clarifai.FACE_DETECT_MODEL,
    //     version: "a403429f2ddf4b49b307e318f00e528b"
    //   })
    //   .then(generalModel => {
    //     return generalModel.predict(input);
    //   })
    //   .then(
    //     response => {
    //       const concepts = response["outputs"][0]["data"]["concepts"];
    //       console.log("concepts:", concepts);
    //     }
    //   );
  };

  return (
    <div className="App">
      <Particles params={particlesOptions} className="particles" />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm onInputChange={onInputChange} onSubmit={onSubmit} />
      <FaceRecognition imageUrl={imageUrl} box={box}/>
    </div>
  );
};

export default App;

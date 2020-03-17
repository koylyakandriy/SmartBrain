import React, { useState } from "react";
import Particles from "react-particles-js";

import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";

import { config } from "./components/utils/config";

import "./App.css";

const particlesOptions = {
  line_linked: {
    shadow: {
      enable: true,
      color: "#3CA9D1",
      blur: 5
    }
  }
};

const initialUserState = {
  id: "",
  name: "",
  email: "",
  entries: 0,
  joined: ""
};

const App = () => {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [box, setBox] = useState({});
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState(initialUserState);

  const loadUser = data => {
    const { id, name, email, entries, joined } = data;
    setUser({ ...user, id, name, email, entries, joined });
  };

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

  const displayFaceBox = box => {
    setBox(box);
  };

  const onInputChange = ({ target }) => {
    setInput(target.value);
  };

  const onPictureSubmit = () => {
    const { id } = user;
    setImageUrl(input);

    fetch(`${config.URL}imageurl`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input: input })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch(`${config.URL}image`, {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
          })
            .then(res => res.json())
            .then(count => {
              setUser(Object.assign(user, { entries: count }));
            })
            .catch(console.log);
        }
        displayFaceBox(calculateFaceLocation(response));
      })
      .catch(err => console.log(err));
  };

  const onRouteChange = route => {
    if (route === "signout") {
      setIsSignedIn(false);
      setUser(initialUserState);
    } else if (route === "home") {
      setIsSignedIn(true);
    }
    setRoute(route);
  };

  return (
    <div className="App">
      <Particles params={particlesOptions} className="particles" />
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
      {route === "home" ? (
        <>
          <Logo />
          <Rank user={user} />
          <ImageLinkForm
            onInputChange={onInputChange}
            onSubmit={onPictureSubmit}
          />
          <FaceRecognition imageUrl={imageUrl} box={box} />
        </>
      ) : route === "signin" ? (
        <Signin onRouteChange={onRouteChange} loadUser={loadUser} />
      ) : (
        <Register onRouteChange={onRouteChange} loadUser={loadUser} />
      )}
    </div>
  );
};

export default App;

import React, { useState } from "react";

import {config} from '../utils/config';

const Register = ({ onRouteChange, loadUser }) => {
  const [userCredentials, setUserCredentials] = useState({
    name: "",
    email: "",
    password: ""
  });

  const { name, email, password } = userCredentials;

  const handleChange = ({ target }) => {
    const { value, name } = target;

    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const onSubmitSignIn = e => {
    e.preventDefault();

    fetch(`${config.URL}api/register`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    })
      .then(res => res.json())
      .then(user => {
        if (user.id) {
          loadUser(user);
          onRouteChange("home");
        }
      });
  };

  return (
    <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-3 center">
      <main className="pa4 black-80">
        <form className="measure" onSubmit={onSubmitSignIn}>
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Register</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="name">
                Name
              </label>
              <input
                onChange={handleChange}
                value={name}
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="name"
                id="name"
              />
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                Email
              </label>
              <input
                onChange={handleChange}
                value={email}
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email"
                id="email-address"
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">
                Password
              </label>
              <input
                onChange={handleChange}
                value={password}
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
              />
            </div>
          </fieldset>
          <button className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f4 dib" type="submit">
            Register
          </button>
        </form>
      </main>
    </article>
  );
};

export default Register;

import React, { useState } from "react";

const Signin = ({ onRouteChange, loadUser }) => {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: ""
  });

  const { email, password } = userCredentials;

  const handleChange = ({ target }) => {
    const { value, name } = target;

    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const onSubmitSignIn = e => {
    e.preventDefault();

    fetch("http://localhost:3001/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
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
        <form className="measure" onSubmit={onSubmitSignIn} autoComplete="off">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                Email
              </label>
              <input
                value={email}
                onChange={handleChange}
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
                value={password}
                onChange={handleChange}
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
              />
            </div>
          </fieldset>
          <button
            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f4 dib"
            type="submit"
          >
            Sign In
          </button>
          <div className="lh-copy mt3">
            <p
              onClick={() => onRouteChange("register")}
              className="f6 link dim black db pointer"
            >
              Register
            </p>
          </div>
        </form>
      </main>
    </article>
  );
};

export default Signin;

import React, { useState, useEffect } from "react";
import "./Login.css";
import logo from "../assets/logo.jpg";
import axios from "axios";
import Loading from "./loading";
import ErrorMessage from "./ErrorMessage";

function Login({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassord] = useState("");
  const [error, setError] = useState(false);
  const [lodaing, setLoading] = useState(false);
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      history.push("/Calendar");
    }
  }, [history]);
  const submitHandler = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      alert("Please fill your informations");
    } else {
      try {
        const config = {
          headers: {
            "content-type": "application/json",
          },
        };

        setLoading(true);
        const data = await axios.post(
          "https://yassine-backend.herokuapp.com/api/users/login",
          {
            email,
            password,
          },
          config
        );
        console.log(data);
        console.log("email errr", data.data.email_error);
        if (data.data.passworderror || data.data.email_error) {
          if (data.data.passworderror) {
            alert("Password incorrect");
          } else {
            alert("email incorrect");
          }
          console.log("Error in password pls workkk", data.data.passworderror);
        } else if (data.data.token) {
          console.log("User connected");
          localStorage.setItem("userInfo", JSON.stringify(data));
          setLoading(false);

          window.location.reload();
        }
      } catch (error) {
        setError("catch error :", error);
        setLoading(false);
      }
    }
  };

  return (
    <div className="login">
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {Loading && <Loading />}

      <div className="login__container">
        <img src={logo} alt="Logo " />
        <h1>Welcome to Zimota </h1>
        {Loading && <Loading />}
        <form className="inputs1" onSubmit={submitHandler}>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=" email"
          />
          <input
            value={password}
            onChange={(e) => setPassord(e.target.value)}
            type="password"
            placeholder="password"
          />
          <button onClick={submitHandler}>
            <strong>Sign in</strong>{" "}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

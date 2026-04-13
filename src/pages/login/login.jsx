import React, { useContext, useEffect, useState } from "react";
import logo from "../../assets/images/logo/admin-logo.png";
import "./login.css";
import { useApi } from "../../customhook/useApi";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

export function LoginPage() {
  const [Capturevalue, setCapturevalue] = useState(null);
  const [Capturecheck, setCapturecheck] = useState(null);
  const object = {
    username: "",
    password: "",
  };
  const { setAuth } = useContext(AuthContext);
  const usenavigate = useNavigate();
  const [formdata, handelChange] = useApi(object);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Number(Capturevalue) === Number(Capturecheck)) {
      try {
        const apiurl = await fetch(
          `${import.meta.env.VITE_API_URL}/login/loginAdmin`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(formdata),
          }
        );
        const res = await apiurl.json();
        if (apiurl.ok) {
          setAuth(true);
          toast.success(res.message || "Login successfull");
          setTimeout(() => {
            usenavigate("/dashboard");
          }, 2000);
        } else {
          toast.error(res.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    }else{
      toast.error("Captcha Not Match")
    }
  };
  function CaptureFn() {
    setCapturevalue(Math.floor(Math.random() * 10000));
  }
  useEffect(() => {
    CaptureFn();
  }, []);

  return (
    <>
      <Toaster />
      <div className="new-body">
        <div className="login-wrap">
          <form className="login-box" onSubmit={handleSubmit}>
            <div className="logo">
              <img src={logo} alt="Logo" />
            </div>
            {/* <h2>Corporate Login</h2> */}
            <h2>Admin Login</h2>
            <div className="field">
              <input
                type="text"
                value={formdata.username}
                onChange={handelChange}
                name="username"
                placeholder="Enter Username"
              />
            </div>
            <div className="field">
              <input
                type="password"
                value={formdata.password}
                placeholder="Enter Password"
                name="password"
                onChange={handelChange}
              />
            </div>
            <div className="remember">
               <label>Remember</label>
               <input type="checkbox" /> 
              
            </div>
            <div className="captcha-row">
              <div className="captcha-box">{Capturevalue}</div>
              <button className="refresh" type="button" onClick={CaptureFn}>
                Refresh
              </button>
            </div>
            <div className="field">
              <input
                type="number"
                placeholder="Enter Captcha"
                onChange={(e) => {
                  setCapturecheck(e.target.value.trim());
                }}
                required
              />
            </div>
            <button className="login-btn" type="submit">
              Login
            </button>


          </form>
        </div>
      </div>
    </>
  );
}

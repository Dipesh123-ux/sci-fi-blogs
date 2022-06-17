import React, { useState,useEffect } from "react";
import { signup ,isAuth,preSignup} from "../../actions/auth";
import {RotatingLines} from "react-loader-spinner"
import Router from "next/router"

const SignupComponent = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    Loading: false,
    message: "",
    showForm: true,
  });

  const [showPass,setShowPass] = useState(true);


  const { name, password, email, error, Loading, message, showForm } = values;

  useEffect(() => {
    isAuth() && Router.push('/')
},[])

  const handleSubmit = (e) => {
    e.preventDefault();

    setValues({ ...values, Loading: true, error: false });

    const user = { name, email, password };

    preSignup(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          Loading: false,
          message: data.message,
          showForm: false,
        });

        console.table(name, password, email, error, Loading, message, showForm);
      }
    });
  };

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const showLoading = () => (
    Loading ?<div className="d-flex justify-content-center mt-4" style={{position : "fixed",right:"39vw",top:"33vh"}} >   <RotatingLines width="100" strokeColor="black" strokeWidth="2" /> </div>: ""
  )
  const showError = () => (
    error ? <div className="alert alert-danger">{error}</div> : ""
  );
  const showMessage = () => (
    message ? <div style={{backgroundColor:"silver"}} className="p-4">{message}</div> : ""
  );

  const SignupForm = () => {
    return (
      <form  onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            value={name} 
            onChange={handleChange("name")}
            type="text"
            className="form-control"
            placeholder="Type your name"
          />
        </div>
        <div className="form-group">
          <input
            value={email}
            onChange={handleChange("email")}
            type="email"
            className="form-control mt-3"
            placeholder="Enter your email address"
          />
        </div>
        <div className="form-group d-flex justify-content-end">
          <input
            value={password}
            onChange={handleChange("password")}
            type={showPass ? "password" : "text"}
            className="form-control mt-3"
            placeholder="Enter password"
          />
                    <i onClick={()=>setShowPass(!showPass)} style={{position:"absolute",marginTop : "28px",marginRight : "10px",cursor:"pointer"}} className={showPass ? "fas fa-eye-slash" : "fas fa-eye"} ></i>
        </div>
        <button className="btn  mt-4" style={{backgroundColor : "white" , boxShadow : "0 0 3px white"}} type="submit">
          SignUp
        </button>
      </form>
    );
  };

  return (
    <React.Fragment>
      {showLoading()}
      {showError()}
      {showMessage()}
      {showForm && SignupForm()}
    </React.Fragment>
  );
};
export default SignupComponent;

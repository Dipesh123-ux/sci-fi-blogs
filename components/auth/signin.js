import React, { useState ,useEffect} from "react";
import { signIn ,authenticate ,isAuth} from "../../actions/auth";
import {RotatingLines} from "react-loader-spinner"
import Router from "next/router";
import Link from 'next/link'
// import LoginGoogle from './googlelogin';

const SignInComponent = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    Loading: false,
    message: "",
    showForm: true,
  });

  const [showPass,setShowPass] = useState(true);

  const { password, email, error, Loading, message, showForm } = values;

  useEffect(() => {
      isAuth() && Router.push('/')
  },[])

  const handleSubmit = (e) => {
    e.preventDefault();

    setValues({ ...values, Loading: true, error: false });

    const user = { email, password };

    signIn(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        authenticate(data,()=>{

          if(isAuth() && isAuth().role == 1){
            Router.push('/admin');
          }
          else{
            Router.push('/user');
          }
 
        })
        console.table(password, email, error, Loading, message, showForm);
      }
    });
  };

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const showLoading = () => (
    Loading ?<div className="d-flex justify-content-center" style={{position : "fixed",right:"39vw",top:"37vh"}} >   <RotatingLines width="100" strokeColor="black" strokeWidth="2" /> </div>: ""
  )
  const showError = () => (
    error ? <div className="alert alert-danger">{error}</div> : ""
  );
  const showMessage = () => (
    message ? <div style={{backgroundColor:"pink"}} className="alert alert-info">{message}</div> : ""
  );

  const SignInForm = () => {
    return (
      <form  onSubmit={handleSubmit}>
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
        <button className="btn mt-4" style={{backgroundColor : "white" , boxShadow : "0 0 3px white"}} type="submit">
          SignIn
        </button>
      </form>
    );
  };

  return (
    <React.Fragment>
      {showLoading()}
      {showError()}
      {showMessage()}
      <br/>
      {showForm && SignInForm()}
      <br/>
      <Link href="/auth/password/forgot">
                <a className="text-white btn btn-outline-dark w-50 btn-sm">Forgot password</a>
       </Link>
      <Link href="/signup">
                <a style={{textDecoration:"underline"}} className="text-white text-end">create new account!</a>
       </Link>
    </React.Fragment>
  );
};
export default SignInComponent;

import Layout from "../components/layout";
import SignInComponent from "../components/auth/signin";
import styled from 'styled-components'

const SignIn = () => {

    
  return (
  
    <Layout>
      <div className="sign">
          <div className="d-flex justify-content-center mb-4" >
            <h1 className="main-head" >SignIn</h1>
          </div>
          <SignInComponent />
        </div>
    </Layout>
  );
};



export default SignIn;

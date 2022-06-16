import Layout from "../components/layout";
import SignupComponent from "../components/auth/signup";
import styled from 'styled-components'

const SignUp = () => {
  return (
    <Layout>
      <div className="sign">
        <div className="d-flex justify-content-center mb-4" >
            <h1 className="main-head">SignUp</h1>
          </div>
          <SignupComponent />
        </div>
    </Layout>

  );
};





export default SignUp;

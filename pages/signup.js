import Layout from "../components/layout";
import SignupComponent from "../components/auth/signup";
import styled from 'styled-components'

const SignUp = () => {
  return (
    <Layout>
      <Sign>
        <div className="d-flex justify-content-center mb-4" >
            <h1 className="main-head">SignUp</h1>
          </div>
          <SignupComponent />
        </Sign>
    </Layout>

  );
};

const Sign = styled.div`
display:flex;
flex-direction:column;
margin:10vh 20vw 20vw;

@media (max-width : 768px){
  margin:20vh 5vh 5vh;
}


`

export default SignUp;

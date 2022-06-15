import Layout from "../components/Layout";
import SignInComponent from "../components/auth/signin";
import styled from 'styled-components'

const SignIn = () => {

    
  return (
  
    <Layout>
      <Sign className="">
          <div className="d-flex justify-content-center mb-4" >
            <h1 className="main-head" >SignIn</h1>
          </div>
          <SignInComponent />
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

export default SignIn;

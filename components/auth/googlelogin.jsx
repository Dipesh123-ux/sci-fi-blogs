import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import {GoogleLogin} from 'react-google-login';
import { loginWithGoogle, authenticate, isAuth } from '../../actions/auth';
import { GOOGLE_CLIENT_ID } from '../../config';



const LoginGoogle = () => {

    const responseGoogle = async response => {
        console.log(response.tokenId);
        const token = response.tokenId;

        loginWithGoogle({token}).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                authenticate(data, () => {
                    if (isAuth() && isAuth().role === 1) {
                        Router.push(`/admin`);
                    } else {
                        Router.push(`/user`);
                    }
                });
            }
        });
    }

    const responseError = (err)=>{
        console.log(err)
        console.log('failed to authenticate')
    }
   
       


    return (
        <div className="pb-3">
            <GoogleLogin
                clientId="505114108732-vnpj8g2aarqjdb5pado5u03661n7b3n2.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={responseGoogle}
                onFailure={responseError}
                theme="dark"
                cookiePolicy='single_host_origin'
            />
        </div>
    );
};

export default LoginGoogle;
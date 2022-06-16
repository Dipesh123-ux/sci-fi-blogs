import { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import Layout from '../../../../components/layout';
import { withRouter } from 'next/router';
import { signup } from '../../../../actions/auth';
import styled from 'styled-components'
import {RotatingLines} from "react-loader-spinner"

const ActivateAccount = ({ router }) => {
    const [values, setValues] = useState({
        name: '',
        token: '',
        error: '',
        loading: false,
        success: false,
        showButton: true
    });

    const { name, token, error, loading, success, showButton } = values;

    useEffect(() => {
        let token = router.query.id;
        if (token) {
            const { name } = jwt.decode(token);
            setValues({ ...values, name, token });
        }
    }, [router]);

    const clickSubmit = e => {
        e.preventDefault();
        setValues({ ...values, loading: true, error: false });
        signup({ token }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false, showButton: false });
            } else {
                setValues({ ...values, loading: false, success: true, showButton: false });
            }
        });
    };

    const showLoading = () => ( loading ?<div className="d-flex justify-content-center mt-4" style={{position : "fixed",right:"39vw",top:"33vh"}} >   <RotatingLines width="100" strokeColor="silver" strokeWidth="2" /> </div>: "");

    return (
        <Layout>
            <div className="container activate">
                <h4 className="pb-4 main-head text-center">Hey {name}, Ready to activate your account?</h4>
                {showLoading()}
                <p className="sub-head">{error && error},
                {success && 'You have successfully activated your account. Please signin.'}
                </p>
                {showButton && (
                    <button className="text-white btn btn-outline-dark" onClick={clickSubmit}>
                        Activate Account
                    </button>
                )}
            </div>
        </Layout>
    );
};


export default withRouter(ActivateAccount);
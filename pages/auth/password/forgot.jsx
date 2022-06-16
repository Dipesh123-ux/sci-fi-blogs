import { useState } from 'react';
import Layout from '../../../components/layout';
import { forgotPassword } from '../../../actions/auth';
import {RotatingLines} from "react-loader-spinner"

const ForgotPassword = () => {
    const [values, setValues] = useState({
        email: '',
        message: '',
        error: '',
        loading: false,
        showForm: true
    });

    const { email, message, error, showForm ,  loading} = values;

    const handleChange = name => e => {
        setValues({ ...values, message: '', error: '', [name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        setValues({ ...values, message: '', error: '',loading: true, });
        forgotPassword({ email }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error ,loading: false});
            } else {
                setValues({ ...values, message: data.message,loading: false, email: '', showForm: false });
            }
        });
    };

    const showError = () => (error ? <div className="alert alert-danger">{error}</div> : '');
    const showMessage = () => (message ? <div className="alert alert-success">{message}</div> : '');
    const showLoading = () => ( loading ?<div className="d-flex justify-content-center mt-4" style={{position : "fixed",right:"39vw",top:"33vh"}} >   <RotatingLines width="100" strokeColor="silver" strokeWidth="2" /> </div>: "");

    

    const passwordForgotForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group pt-5">
                <input
                    type="email"
                    onChange={handleChange('email')}
                    className="form-control"
                    value={email}
                    placeholder="Type your email"
                    required
                />
            </div>
            <div>
                <br />
                <button className="btn btn-dark">Send password reset link</button>
            </div>
        </form>
    );

    return (
        <Layout>
            <div className="sign">
                <h2 className="main-head" >Forgot password</h2>
                <hr />
                {showError()}
                {showMessage()}
                {showLoading()}
                {showForm && passwordForgotForm()}
            </div>
        </Layout>
    );
};

export default ForgotPassword;
import { useState } from 'react';
import Layout from '../../../../components/layout';
import  Router ,{ withRouter  } from 'next/router';
import { resetPassword } from '../../../../actions/auth';
import {RotatingLines} from "react-loader-spinner"

const ResetPassword = ({ router }) => {
    const [values, setValues] = useState({
        name: '',
        newPassword: '',
        error: '',
        message: '',
        loading : false,
        showForm: true
    });

    const { showForm, name, newPassword, error, message,loading } = values;

    const handleSubmit = e => {
        e.preventDefault();
        setValues({ ...values, loading: true});
        resetPassword({
            newPassword,
            resetPasswordLink: router.query.id
        }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, showForm: false, newPassword: '',loading:false });
            } else {
                setValues({ ...values, message: data.message, showForm: false, newPassword: '', error: false,loading: false});
                Router.push('/signin')
            }
        });
    };

    const passwordResetForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group pt-5">
                <input
                    type="password"
                    onChange={e => setValues({ ...values, newPassword: e.target.value })}
                    className="form-control"
                    value={newPassword}
                    placeholder="Type new password"
                    required
                />
                <input
                    type="password"
                    className="form-control mt-2"
                    placeholder="confirm new password"
                    required
                />
            </div>
            <br />
            <div>
                <button className="btn btn-dark ">Change password</button>
            </div>
        </form>
    );

    const showError = () => (error ? <div className="alert alert-danger">{error}</div> : '');
    const showMessage = () => (message ? <div className="alert alert-success">{message}</div> : '');
    const showLoading = () => ( loading ?<div className="d-flex justify-content-center mt-4" style={{position : "fixed",right:"39vw",top:"33vh"}} >   <RotatingLines width="100" strokeColor="silver" strokeWidth="2" /> </div>: "");

    return (
        <Layout>
            <div className="sign">
                <h2 className="main-head">Reset password</h2>
                <hr className="text-white" />
                {showError()}
                {showMessage()}
                {showLoading()}
                {passwordResetForm()}
            </div>
        </Layout>
    );
};

export default withRouter(ResetPassword);
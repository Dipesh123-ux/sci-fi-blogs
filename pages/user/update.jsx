import Layout from '../../components/layout';
import ProfileUpdate from '../../components/auth/profileupdate';
import Link from 'next/link';

const UserProfileUpdate = () => {
    return (
        <Layout>
                <div className="container-fluid mt-5">
                    <div className="row">
                        <ProfileUpdate />
                    </div>
                </div>
        </Layout>
    );
};

export default UserProfileUpdate
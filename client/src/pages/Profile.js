import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import SnippetsForm from '../components/SnippetsForm';
import SnippetsList from '../components/SnippetsList';

import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {
    const { username: userParam } = useParams();

    const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
        variables: { username: userParam },
    });

    const user = data?.me || data?.user || {};
    if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
        return <Navigate to="/me" />;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user?.username) {
        return (
            <h4>You must be logged in to do this! Please sign up or log in to proceed.</h4>
        );
    }

    return (
        <div>
            <div className="flex-row justify-center mb-3">
                <h2 className="col-12 col-md-10 p-3 mb-5">
                    {userParam ? `${user.username}'s` : "your"} profile.
                </h2>

                <div className="col-12 col-md-10 mb-5">
                    <SnippetsList
                        snippets={user.snippets}
                        title={`${user.username}'s snippets:`}
                        showtitle={false}
                        showUsername={false}
                    />
                </div>
                {!userParam && (
                    <div 
                        className="col-12 col-md-10 mb-3 p-3"
                        style={{ border: '1px' }}
                    >
                        <SnippetsForm />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
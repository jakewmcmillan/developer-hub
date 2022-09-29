import React from 'react';

import SnippetsList from '../components/SnippetsList';
import SnippetsForm from '../components/SnippetsForm';

import { QUERY_THOUGHTS } from '../../utils/queries';

const Home = () => {
    const { loading, data } = useQuery(QUERY_THOUGHTS);
    const thoughts = data?.snippets || [];

    return (
        <main>
            <div className="flex-row justify-center">
                <div className="col-12 col-md-10 mb-3 p-3">
                    <SnippetsForm />
                </div>
                <div className="col-12 col-md-10 mb-3 p-3">
                    {loading ? (
                        <div>Loading Snippets...</div>
                    ) : (
                        <SnippetsList
                            snippets={snippets}
                            title="Snippets:"
                        />
                    )}
                </div>
            </div>
        </main>
    );
};

export default Home;
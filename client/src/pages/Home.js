import React from 'react';

import SnippetList from '../components/SnippetList';
import SnippetForm from '../components/SnippetForm';

import { QUERY_THOUGHTS } from '../../utils/queries';

const Home = () => {
    const { loading, data } = useQuery(QUERY_THOUGHTS);
    const thoughts = data?.snippets || [];

    return (
        <main>
            <div className="flex-row justify-center">
                <div className="col-12 col-md-10 mb-3 p-3">
                    <SnippetForm />
                </div>
                <div className="col-12 col-md-10 mb-3 p-3">
                    {loading ? (
                        <div>Loading Snippets...</div>
                    ) : (
                        <SnippetList
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
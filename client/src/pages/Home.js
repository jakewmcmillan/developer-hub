import React from 'react';
import { useQuery } from '@apollo/client';

import SnippetList from '../components/SnippetList';
// import SnippetForm from '../components/SnippetForm';

import { QUERY_SNIPPET } from '../utils/queries';


const Home = () => {
    const { loading, data } = useQuery(QUERY_SNIPPET);
    const snippets = data?.snippets || [];


    return (
        <main>
            <div className="flex-row justify-center">
                {/* <div className="col-12 col-md-10 mb-3 p-3">
                    <SnippetForm />
                </div> */}
                <div className="col-12 col-md-10 mb-3 p-3">
                    {loading ? (
                        <div>Loading Snippets...</div>
                    ) : (
                        <SnippetList

                            snippets={snippets}

                            title="BlackBook Feed:"
                        />
                    )}
                </div>
            </div>
        </main>
    );
};

export default Home;
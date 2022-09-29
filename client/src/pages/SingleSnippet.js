import React from 'React';

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import SnippetsList from '../components/SnippetsList';
import SnippetsForm from '../components/SnippetsForm';

import { QUERY_SINGLE_SNIPPET } from '../utils/queries';

const singleSnippet = () => {
    const { snippetId } = useParams();

    const { loading, data } = useQuery(QUERY_SINGLE_SNIPPET, {
        variables: { snippetId: snippetId}
    });

    const snippet = data?.thought || {};

    if (loading) {
        return <div>Loading...</div>
    }
    return (
        <div className="my-3">
            <h3 className="card-header p-2 m-0">
                {snippet.snippetAuthor} <br />
                <span style={{ fontSize: '1rem' }}>
                    created this snippet on {snippet.createdAt}
                </span>
            </h3>
            <div className="py-4">
                <blockquote
                    className="p-4"
                    style={{
                        fontSize: '1.5rem',
                        fontStyle: 'italic',
                        border: '2px',
                        lineHeight: '1.5',
                    }}
                >
                    {snippet.snippetText}
                </blockquote>
            </div>

            <div className="my-5">
                <SnippetsList snippets={snippet.comments} />
            </div>
            <div className="m-3 p-4" style={{ border: '1px' }}>
                <SnippetsForm snippetId={snippet._id} />
            </div>
        </div>
    );
};

export default SingleSnippet
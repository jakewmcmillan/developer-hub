import React from 'react';

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import SnippetList from '../components/SnippetForm/index.js';
import SnippetForm from '../components/SnippetForm/index.js';

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

import { QUERY_SINGLE_SNIPPET } from '../utils/queries';

const SingleSnippet = () => {
    const { snippetId } = useParams();

    const { loading, data } = useQuery(QUERY_SINGLE_SNIPPET, {
        variables: { snippetId: snippetId}
    });

    const snippet = data?.snippet || {};

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
                <CommentList comments={snippet.comments} />
            </div>
            <div className="m-3 p-4" style={{ border: '1px' }}>
                <CommentForm snippetId={snippet._id} />
            </div>
        </div>
    );
};

export default SingleSnippet;
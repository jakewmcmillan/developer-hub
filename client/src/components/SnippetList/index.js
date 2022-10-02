import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { REMOVE_SNIPPET } from '../../utils/mutations';
import {QUERY_SNIPPET, QUERY_ME, QUERY_USER} from '../../utils/queries';
import { useMutation, useQuery } from '@apollo/client';
import DeleteSnippet from '../DeleteButton';


const SnippetList = ({
  snippets,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  
  if (!snippets.length) {
    return <h3>No Snippets Yet</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {snippets &&
        snippets.map((snippet) => (
          <div key={snippet._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
           {/* <DeleteSnippet
            key={snippet._id}
            className="btn btn-primary btn-sm"
           ></DeleteSnippet> */}

              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/profiles/${snippet.snippetAuthor}`}
                >
                  {snippet.snippets} <br />
                  <span style={{ fontSize: '1rem' }}>
                  {snippet.snippetAuthor} created this snippet on {snippet.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    You created this snippet on {snippet.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2 css-fix">
              <code>{snippet.snippetText}</code>
            </div>
            <Link
              className="btn btn-primary btn-block btn-round"
              to={`/snippets/${snippet._id}`}
            >
              Have something to say about this snippet?
            </Link>
          </div>
        ))}
    </div>
  );
};

export default SnippetList;


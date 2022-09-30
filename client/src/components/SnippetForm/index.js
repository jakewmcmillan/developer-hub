import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import { ADD_SNIPPET } from '../../utils/mutations';
import { QUERY_SNIPPET, QUERY_ME, QUERY_CATEGORIES } from '../../utils/queries';

import Auth from '../../utils/auth';

const SnippetForm = () => {
  const [snippetText, setSnippetText] = useState('');

  const [characterCount, setCharacterCount] = useState(0);
  const {data:catData, error:catError, loading:catLoading} = useQuery(QUERY_CATEGORIES)
  const [addSnippet, { error }] = useMutation(ADD_SNIPPET, {
    update(cache, { data: { ADD_SNIPPET } }) {
      try {
        const { snippet } = cache.readQuery({ query: QUERY_SNIPPET });

        cache.writeQuery({
          query: QUERY_SNIPPET,
          data: { snippet: [addSnippet, ...snippet] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, snippets: [...me.snippets, addSnippet] } },
      });
    },
  });

   if (catData) {console.log(catData)}

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addSnippet({
        variables: {
          snippetText,
          snippetAuthor: Auth.getProfile().data.username,
        },
      });

      setSnippetText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'snippetText' && value.length <= 2000) {
      setSnippetText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h3>Share your snippets</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 2000 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/2000
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="snippetText"
                placeholder="Here's a new snippet..."
                value={snippetText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Snippet
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your snippets. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default SnippetForm;

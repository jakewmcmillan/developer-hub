import React from 'react';
import { Link } from 'react-router-dom';

const SnippetsList = ({ Snippets, title }) => {
    if (!Snippets.length) {
      return <h3>No code Yet</h3>;
    }
  
    return (
      <div>
        <h3>{title}</h3>
        {Snippets &&
          Snippets.map((Snippets) => (
            <div key={Snippets._id} className="card mb-3">
              <h4 className="card-header bg-primary text-light p-2 m-0">
                {Snippets.SnippetsAuthor} <br />
                <span style={{ fontSize: '1rem' }}>
                  new snippets added {Snippets.createdAt}
                </span>
              </h4>
              <div className="card-body bg-light p-2">
                <p>{Snippets.SnippetsText}</p>
              </div>
            </div>
          ))}
      </div>
    );
  };
    

  export default SnippetsList;

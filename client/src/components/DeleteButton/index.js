import React from "react";
import { useMutation, useQuery } from '@apollo/client';


import { DELETE_SNIPPET } from '../../utils/mutations';
import {QUERY_SNIPPET} from '../../utils/queries';

const DeleteSnippet = ({id}) => {
   
    
    const [deleteSnippet, { error }] = useMutation(DELETE_SNIPPET, {
        update(cache, { data: { DELETE_SNIPPET } })  {
          try{
            const { snippet } = cache.readQuery({ query: QUERY_SNIPPET });
          cache.writeQuery({
            query: QUERY_SNIPPET,
            data: { snippet: snippet.filter(e => e.id !== id)}
          });
        } catch (e) {
            console.error(e);
          }
    
    },
});

        return (
          <button
            onClick={e => {
              deleteSnippet({
                variables: {
                  id
                }
              });
            }}
          >Delete</button>            
        )
  };
  
  export default DeleteSnippet;
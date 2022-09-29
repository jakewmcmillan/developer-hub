import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_COMMENT } from '../../utils/mutations';

import Auth from '../../utils/auth';

const CommentForm = ({ snippetId }) => {
    const [commentText, setCommentText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
  
    const [addComment, { error }] = useMutation(ADD_COMMENT);
  
    const handleFormSubmit = async (event) => {
      event.preventDefault();
  
      try {
        const { data } = await addComment({
          variables: {
            snippetId,
            commentText,
            commentAuthor: Auth.getProfile().data.username,
          },
        });
  
        setCommentText('');
      } catch (err) {
        console.error(err);
      }
    };
  
    const handleChange = (event) => {
      const { name, value } = event.target;
  
      if (name === 'commentText' && value.length <= 280) {
        setCommentText(value);
        setCharacterCount(value.length);
      }
    };
    return ()






export default CommentForm;
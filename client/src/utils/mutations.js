import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_SNIPPET = gql`
  mutation addSnippet($snippetText: String!) {
    addSnippet(snippetText: $snippetText) {
      _id
      snippetText
      snippetAuthor
      createdAt
      category
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($snippetId: ID!, $commentText: String!) {
    addComment(snippetId: $snippetId, commentText: $commentText) {
      _id
      snippetText
      snippetAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;

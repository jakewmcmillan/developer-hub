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
      category {
        _id
      }
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

export const DELETE_SNIPPET = gql`
  mutation deleteSnippet(
    $id: ID!
  ) {
    deleteSnippet(
      id: $id
    ) {
      _id
    }
  }
`;


// export const REMOVE_SNIPPET = gql`
//  mutation removeSnippet($snippetId: ID!) {
//    removeSnippet(snippetId: $snippetId) {
//      _id
//     }
//   }
// `;

//export const REMOVE_COMMENT = gql`
//   mutation removeComment($snippetId: String!, $commentId: String!) {
//     removeComment(snippetId: $snippetId, commentId: $commentId) {
//       _id
//       snippetText
//       snippetAuthor
//       createdAt
//       comments {
//         _id
//         commentText
//         createdAt
//       }
//     }
//   }
// `;
import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      snippets {
        _id
        snippetText
        createdAt
        category
      }
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  query getCategories {
    categories {
      _id
      categoryName
    }
  }
`;

export const QUERY_SINGLE_CATEGORY = gql`
  query getSingleCategory($categoryId: ID!) {
    category(categoryId: $categoryId) {
        _id
        categoryName
        snippets {
            _id
            snippetText
            createdAt
            snippetAuthor
        }
    }
  }
`;

export const QUERY_SNIPPET = gql`
  query getSnippets {
    snippets {
      _id
      snippetText
      snippetAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_SNIPPET = gql`
  query getSingleSnippet($snippetId: ID!) {
    snippet(snippetId: $snippetId) {
      _id
      snippetText
      snippetAuthor
      createdAt
      category {
        categoryName
      }
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      snippets {
        _id
        snippetText
        snippetAuthor
        createdAt
      }
    }
  }
`;

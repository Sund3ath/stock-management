// src/queries.ts
import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
    }
  }
`;

export const GET_USER = gql`
  query GetUser($userId: Int!) {
    user(id: $userId) {
      id
      email
    }
  }
`;
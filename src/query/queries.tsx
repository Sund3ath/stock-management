// src/queries.ts
import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      id
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

export const GET_PRODUCTS = gql`
query Query {
    products {
      id
      name
    }
  }
  
`;

export const GET_PRODUCT_MATERIALS = gql`
query Query($filterRecipeArgs: FilterRecipeArgs!) {
    recipes(filterRecipeArgs: $filterRecipeArgs) {
      material {
        id
        name
      }
      quantity
      unit
    }
  }
`;

export const GET_MATERIALS = gql`
query Query {
    materials {
      id
      name
    }
  }
`;
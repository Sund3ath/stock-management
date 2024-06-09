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

export const GET_COMPANIES = gql`
query Query {
  companies {
    id
    name
    restaurants {
      id
      name
    }
    vatNumber
    warehouses {
      id
      name
    }
  }
}

`;

export const GET_RESTAURANTS = gql`
  query GetRestaurants {
    restaurants {
      id
      name
      companyId
    }
  }
`;

export const GET_WAREHOUSES = gql`
  query GetWarehouses {
    warehouses {
      id
      name
      companyId
    }
  }
`;


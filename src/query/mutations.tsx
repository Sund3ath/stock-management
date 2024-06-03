// src/mutations.ts
import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
    }
  }
`;

export const CREATE_USER = gql`
  mutation Mutation($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      id
    }
  }
`;

export const ADD_PRODUCT = gql`
mutation Mutation($createProductInput: CreateProductInput!) {
  createProduct(createProductInput: $createProductInput) {
    id
    name
  }
}
`;

export const UPDATE_PRODUCT_MATERIALS = gql`
mutation Mutation($updateRecipeInput: UpsertRecipeInput!) {
  upsertRecipe(updateRecipeInput: $updateRecipeInput) {
    id
  }
}


`;

export const ADD_RECIPE_MATERIAL = gql`
mutation Mutation($updateRecipeInput: UpsertRecipeInput!) {
  upsertRecipe(updateRecipeInput: $updateRecipeInput) {
    id
  }
}
`;

export const REMOVE_RECIPE_MATERIAL = gql`
mutation Mutation($deleteRecipeInput: DeleteRecipeInput!) {
  removeRecipe(deleteRecipeInput: $deleteRecipeInput) {
    id
  }
}
`;


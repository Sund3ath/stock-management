import {  gql } from '@apollo/client';

export const GET_ALL_POSTS = gql`
query {
    posts(options:{paginate : { limit: 3 }}){
      data{
        id
        title
      }
    }
  }
`;
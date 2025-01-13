import { gql } from "@apollo/client";

// Authentication

export const SIGN_UP = gql`
  mutation sigUp(
    $username: String!
    $email: String!
    $company_name: String
    $phone_number: String!
    $address: String!
    $password: String!
    $confirmPassword: String!
  ) {
    signUp(
      username: $username
      email: $email
      company_name: $company_name
      phone_number: $phone_number
      address: $address
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
      username
      email
    }
  }
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      username
      email
    }
  }
`;
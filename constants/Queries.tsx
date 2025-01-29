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

export const GET_USER = gql`
  query GetUser($email: String!) {
    getUser(email: $email) {
      address
      company_name
      email
      id
      phone_number
      username
      BusinessForms {
        id
        userId
        DocType
        DocNumber
        formData
      }
    }
  }
`;

// Form Details

export const GET_BUSINESS_FORMS = gql`
  query GetBusinessForms($userId: Int!, $DocType: String!,$orderBy: BusinessFormOrderByInput) {
    getBusinessForms(userId: $userId, DocType: $DocType, orderBy: $orderBy) {
        id
        userId
        DocType
        DocNumber
        formData
        status
        url
        createdAt
        updatedAt
    }
}
`;

export const GET_BUSINESS_FORM = gql`
  query GetBusinessForm($userId: Int!, $DocType: String!, $DocNumber: Int!) {
    getBusinessForm(userId: $userId, DocType: $DocType, DocNumber: $DocNumber) {
      id
      userId
      DocType
      DocNumber
      formData
      status
      createdAt
      updatedAt
      url
    }
  }
`;

export const CREATE_BUSINESS_FORM = gql`
  mutation CreateBusinessForm($input: CreateBusinessFormInput!) {
    createBusinessForm(input: $input) {
        id
        userId
        DocType
        formData
        status
        url
        createdAt
    }
}
`;

export const UPDATE_BUSINESS_FORM = gql`
  mutation UpdateBusinessForm($input: UpdateBusinessFormInput!) {
    updateBusinessForm(input: $input) {
        id
        DocType
        DocNumber
        formData
        status
        url
        updatedAt
    }
}
`;

export const DELETE_BUSINESS_FORM = gql`
    mutation DeleteBusinessForm($input: DeleteBusinessFormInput!) {
        deleteBusinessForm(input: $input)
    }
`;

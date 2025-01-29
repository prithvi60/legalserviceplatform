export const typeDefs = `#graphql

scalar JSON

type User {
    id: Int!
    username: String!
    email: String!
    phone_number: String
    company_name: String
    address: String
    BusinessForms: [BusinessForm]!
  }

  type BusinessForm {
    id: ID!
    userId: Int!
    DocType: String!
    DocNumber: Int!
    formData: JSON!
    status: String!
    url: String!
    createdAt: String!
    updatedAt: String!
}

input BusinessFormOrderByInput {
  DocNumber: SortOrder
}

enum SortOrder {
  asc
  desc
}

input CreateBusinessFormInput {
  userId: Int!
  DocType: String!
  DocNumber: Int
  formData: JSON!
  status: String!
  url: String!
}

input UpdateBusinessFormInput {
    userId: Int!
    DocType: String!
    DocNumber: Int!
    formData: JSON
    status: String!
}

input DeleteBusinessFormInput {
    userId: Int!
    DocType: String!
    DocNumber: Int!
}

  type Query {
    user: User
    users: [User]
    getUser(email: String!): User
    getBusinessForms(userId: Int!, DocType: String!, orderBy: BusinessFormOrderByInput): [BusinessForm!]!
    getBusinessForm(userId: Int!, DocType: String!, DocNumber: Int!): BusinessForm
    }

  type Mutation {
    signUp(
      username: String!,
      email: String!,
      company_name: String,
      phone_number: String!,
      address: String,
      password: String!,
      confirmPassword: String!
    ): User
    login(email: String!, password: String!): User!
    logout: Boolean!
    getUser(email: String!): User
    createBusinessForm(input: CreateBusinessFormInput!): BusinessForm!
    updateBusinessForm(input: UpdateBusinessFormInput!): BusinessForm!
    deleteBusinessForm(input: DeleteBusinessFormInput!): Boolean!
  }
`;

export const typeDefs = `#graphql

type User {
    id: Int
    username: String
    email: String
    phone_number: String
    company_name: String
    address: String
  }

  type Query {
    user: User
    users: [User]
    getUser(email: String!): User
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
  }
`;

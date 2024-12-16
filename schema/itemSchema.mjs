import gql from "graphql-tag";

export const itemTypeDefs = gql`
  type Item {
    type: String!
    identifier: ID!
    label: String
    description: String
    price: Float
    sections: [Section]
  }

  type Query {
    item(identifier: ID!): Item
  }
`;

import { gql } from "graphql-tag";

export const menuTypeDefs = gql`
  type Menu {
    id: ID!
    identifier: String!
    label: String
    state: String
    start_date: String
    end_date: String
  }

  type Query {
    menu(identifier: String!): Menu
    menus: [Menu]
  }
`;

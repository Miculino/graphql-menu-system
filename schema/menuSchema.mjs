import { gql } from "graphql-tag";

export const menuTypeDefs = gql`
  type Menu {
    identifier: ID!
    label: String
    state: String
    start_date: String
    end_date: String
    sections: [Section]
  }

  type Query {
    menu(identifier: ID!): Menu
    menus: [Menu]
  }
`;

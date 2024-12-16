import { gql } from "graphql-tag";

export const menuTypeDefs = gql`
  type Menu {
    id: ID!
    label: String
    state: String
    start_date: String
    end_date: String
    sections: [Section]
  }

  type Query {
    menu(id: ID!): Menu
    menus: [Menu]
  }

  type MenuSection {
    id: ID!
    menu: Menu!
    section: Section!
  }

  type Mutation {
    createMenu(
      label: String!
      state: String
      start_date: String!
      end_date: String!
      sections: [ID!]
    ): Menu

    updateMenu(
      id: ID!
      label: String
      state: String
      start_date: String
      end_date: String
      sections: [ID!]
    ): Menu

    deleteMenu(id: ID!): Menu
  }
`;

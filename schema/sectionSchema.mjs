import { gql } from "graphql-tag";

export const sectionTypeDefs = gql`
  type Section {
    identifier: ID!
    label: String
    menus: [Menu]
    items: [Item]
  }

  type Query {
    sections: [Section]
    items: [Item]
  }
`;
import { gql } from "graphql-tag";

export const sectionTypeDefs = gql`
  type Section {
    id: ID!
    label: String
    menus: [Menu]
    items: [Item]
  }

  type Query {
    sections: [Section]
    section(id: ID!): Section!
    items: [Item]
  }
`;

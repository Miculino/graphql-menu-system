import { gql } from "graphql-tag";

export const sectionTypeDefs = gql`
  type Section {
    id: ID!
    label: String
    menus: [Menu]
    items: [Item]
    display_order: Int
  }

  type Query {
    sections: [Section]
    section(id: ID!): Section!
    items: [Item]
  }

  type Mutation {
    createSection(label: String!): Section

    updateSection(id: ID!, label: String): Section

    deleteSection(id: ID!): Section
  }
`;

import { gql } from "graphql-tag";

export const sectionTypeDefs = gql`
  type Section {
    id: ID!
    identifier: String!
    label: String
    menus: [Menu]
  }

  type Query {
    sections: [Section]
  }
`;

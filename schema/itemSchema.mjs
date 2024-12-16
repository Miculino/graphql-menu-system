import gql from "graphql-tag";

export const itemTypeDefs = gql`
  type ModifierGroup {
    identifier: ID!
    label: String
    selection_required_min: Int
    selection_required_max: Int
    modifiers: [Modifier]
  }

  type Modifier {
    item: Item!
    modifier_group: ModifierGroup!
    display_order: Int!
    default_quantity: Int!
    price_override: Float
    name: String!
  }

  type Item {
    type: String!
    identifier: ID!
    label: String
    description: String
    price: Float
    sections: [Section]
    itemModifierGroups: [ModifierGroup]!
    modifiers: [Modifier]!
  }

  type Query {
    item(identifier: ID!): Item
    items: [Item]
    modifierGroups(identifier: ID): [ModifierGroup]
  }
`;

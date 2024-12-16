import gql from "graphql-tag";

export const itemTypeDefs = gql`
  type ModifierGroup {
    id: ID!
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
    id: ID!
    label: String
    description: String
    price: Float
    sections: [Section]
    itemModifierGroups: [ModifierGroup]!
    modifiers: [Modifier]!
  }

  type Query {
    item(id: ID!): Item
    items: [Item]
    modifierGroups(id: ID): [ModifierGroup]
  }

  type Mutation {
    createItem(
      label: String!
      price: Float!
      sectionId: ID!
      type: String!
    ): Item

    createModifierGroup(
      itemId: ID!
      label: String!
      selection_required_min: Int
      selection_required_max: Int
    ): ModifierGroup

    createModifier(
      name: String!
      default_quantity: Int!
      price_override: Float
      display_order: Int
      itemId: ID!
      modifierGroupId: ID!
    ): Modifier

    updateModifier(
      id: ID!
      name: String
      default_quantity: Int
      price_override: Float
      display_order: Int
      itemId: ID
      modifierGroupId: ID
    ): Modifier

    deleteModifier(id: ID!): Modifier

    deleteModifierGroup(id: ID!): ModifierGroup

    deleteItem(id: ID!): Item

    deleteSection(id: ID!): Section
  }
`;

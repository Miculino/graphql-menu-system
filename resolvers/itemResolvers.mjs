import { mockItems, mockModifierGroups, mockModifiers } from "../mockData.mjs";

export const itemResolvers = {
  Query: {
    item: (_, { id }) => mockItems.find((mi) => mi.id === id),
    items: () => mockItems,
    modifierGroups: (_, { id }) =>
      id
        ? mockModifierGroups.filter((group) => group.id === id)
        : mockModifierGroups,
  },
  Item: {
    modifiers: (item) =>
      mockModifiers.filter((modifier) => modifier.itemId === item.id),
  },
  ModifierGroup: {
    modifiers: (group) =>
      mockModifiers.filter((modifier) => modifier.modifierGroupId === group.id),
  },
  Modifier: {
    item: (modifier) => mockItems.find((item) => item.id === modifier.itemId),
    modifier_group: (modifier) =>
      mockModifierGroups.find((group) => group.id === modifier.modifierGroupId),
  },
};

import { mockItems, mockModifierGroups, mockModifiers } from "../mockData.mjs";

export const itemResolvers = {
  Query: {
    item: (_, { identifier }) =>
      mockItems.find((mi) => mi.identifier === identifier),
    items: () => mockItems,
    modifierGroups: (_, { identifier }) =>
      identifier
        ? mockModifierGroups.filter((group) => group.identifier === identifier)
        : mockModifierGroups,
  },
  Item: {
    modifiers: (item) =>
      mockModifiers.filter((modifier) => modifier.itemId === item.identifier),
  },
  ModifierGroup: {
    modifiers: (group) =>
      mockModifiers.filter(
        (modifier) => modifier.modifierGroupId === group.identifier
      ),
  },
  Modifier: {
    item: (modifier) =>
      mockItems.find((item) => item.identifier === modifier.itemId),
    modifier_group: (modifier) =>
      mockModifierGroups.find(
        (group) => group.identifier === modifier.modifierGroupId
      ),
  },
};

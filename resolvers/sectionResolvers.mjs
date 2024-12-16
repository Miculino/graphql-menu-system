import {
  mockMenuSections,
  mockSections,
  mockMenus,
  mockItems,
  mockSectionItems,
} from "../mockData.mjs";

export const sectionResolvers = {
  Query: {
    sections: () => mockSections,
    items: () => mockItems,
  },
  Section: {
    menus: (section) => {
      const menuIds = mockMenuSections
        .filter((ms) => ms.sectionId === section.identifier)
        .map((ms) => ms.menuId);

      return mockMenus.filter((menu) => menuIds.includes(menu.identifier));
    },
    items: (section) => {
      const itemIds = mockSectionItems
        .filter((si) => si.sectionId === section.identifier)
        .map((si) => si.itemId);

      return mockItems.filter((item) => itemIds.includes(item.identifier));
    },
  },
  Item: {
    sections: (item) => {
      const sectionIds = mockSectionItems
        .filter((si) => si.itemId === item.identifier)
        .map((si) => si.sectionId);

      return mockSections.filter((section) =>
        sectionIds.includes(section.identifier)
      );
    },
  },
};

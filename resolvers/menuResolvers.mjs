import { mockSections, mockMenuSections, mockMenus } from "../mockData.mjs";

export const menuResolvers = {
  Query: {
    menus: () => mockMenus,
    menu: (_, { id }) => {
      return mockMenus.find((ms) => ms.id === id);
    },
    sections: () => mockSections,
  },
  Menu: {
    sections: (menu) => {
      const sectionIds = mockMenuSections
        .filter((ms) => ms.menuId === menu.id)
        .map((ms) => ms.sectionId);
      return mockSections.filter((section) => sectionIds.includes(section.id));
    },
  },
};

import { mockSections, mockMenuSections, mockMenus } from "../mockData.mjs";

export const menuResolvers = {
  Query: {
    menus: () => mockMenus,
    menu: (_, { identifier }) => {
      return mockMenus.find((ms) => ms.identifier === identifier);
    },
    sections: () => mockSections,
  },
  Menu: {
    sections: (menu) => {
      const sectionIds = mockMenuSections
        .filter((ms) => ms.menuId === menu.identifier)
        .map((ms) => ms.sectionId);
      return mockSections.filter((section) =>
        sectionIds.includes(section.identifier)
      );
    },
  },
};

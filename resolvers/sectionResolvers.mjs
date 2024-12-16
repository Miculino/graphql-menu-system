import { mockMenuSections, mockSections, mockMenus } from "../mockData.mjs";

export const sectionResolvers = {
  Query: {
    sections: () => mockSections,
  },
  Section: {
    menus: (section) => {
      const menuIds = mockMenuSections
        .filter((ms) => ms.sectionId === section.id)
        .map((ms) => ms.menuId);

      return mockMenus.filter((menu) => menuIds.includes(menu.id));
    },
  },
};

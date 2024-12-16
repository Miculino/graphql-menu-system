import prisma from "../prismaClient.mjs";

export const menuResolvers = {
  Query: {
    menus: async () => await prisma.menu.findMany(),
    menu: async (_, { id }) => {
      return await prisma.menu.findUnique({ where: { id: parseInt(id) } });
    },
    sections: async () => await prisma.section.findMany(),
  },
  Menu: {
    sections: async (menu) => {
      const menuSections = await prisma.menuSection.findMany({
        where: { menuId: menu.id },
        include: { section: true },
      });

      return menuSections.map((menuSection) => menuSection.section);
    },
  },
};

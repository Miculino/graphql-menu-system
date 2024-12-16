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
  Mutation: {
    createMenu: async (_, { label, state, start_date, end_date }) => {
      return await prisma.menu.create({
        data: {
          label,
          state,
          start_date: new Date(start_date),
          end_date: new Date(end_date),
        },
      });
    },
    updateMenu: async (_, { id, label, state, start_date, end_date }) => {
      return await prisma.menu.update({
        where: { id: parseInt(id) },
        data: {
          label,
          state,
          start_date: start_date ? new Date(start_date) : undefined,
          end_date: end_date ? new Date(end_date) : undefined,
        },
      });
    },
    deleteMenu: async (_, { id }) => {
      return await prisma.menu.delete({
        where: { id: parseInt(id) },
      });
    },
  },
};

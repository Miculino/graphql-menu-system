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
    createMenu: async (_, { label, state, start_date, end_date, sections }) => {
      const existingSections = await prisma.section.findMany({
        where: {
          id: {
            in: sections.map((sectionId) => parseInt(sectionId)),
          },
        },
      });

      if (existingSections.length !== sections.length) {
        throw new Error("One or more section IDs are invalid.");
      }

      const menu = await prisma.menu.create({
        data: {
          label,
          state,
          start_date: new Date(start_date),
          end_date: new Date(end_date),
          sections: {
            connect: existingSections.map((section) => ({ id: section.id })),
          },
        },
      });

      return menu;
    },
    updateMenu: async (
      _,
      { id, label, state, start_date, end_date, sections }
    ) => {
      const updatedMenu = await prisma.menu.update({
        where: { id: parseInt(id) },
        data: {
          label,
          state,
          start_date: new Date(start_date),
          end_date: new Date(end_date),
        },
      });

      if (sections && sections.length > 0) {
        await prisma.menuSection.deleteMany({
          where: { menuId: parseInt(id) },
        });

        const existingSections = await prisma.section.findMany({
          where: {
            id: {
              in: sections.map((sectionId) => parseInt(sectionId)),
            },
          },
        });

        if (existingSections.length !== sections.length) {
          throw new Error("One or more section IDs are invalid.");
        }

        await prisma.menuSection.createMany({
          data: existingSections.map((section) => ({
            menuId: parseInt(id),
            sectionId: section.id,
          })),
        });
      }

      return updatedMenu;
    },
    deleteMenu: async (_, { id }) => {
      return await prisma.menu.delete({
        where: { id: parseInt(id) },
      });
    },
  },
};

import prisma from "../prismaClient.mjs";

export const sectionResolvers = {
  Query: {
    sections: async () => await prisma.section.findMany(),
    section: async (_, { id }) => {
      return await prisma.section.findUnique({ where: { id: parseInt(id) } });
    },
    items: async () => await prisma.item.findMany(),
  },
  Section: {
    menus: async (section) => {
      const menuSections = await prisma.menuSection.findMany({
        where: { sectionId: section.id },
        include: { menu: true },
      });

      return menuSections.map((menuSection) => menuSection.menu);
    },
    items: async (section) => {
      const sectionItems = await prisma.sectionItem.findMany({
        where: { sectionId: section.id },
        include: { item: true },
      });
      return sectionItems.map((sectionItem) => sectionItem.item);
    },
  },
  Item: {
    sections: async (item) => {
      console.log(item.id, "item id");
      const sectionItems = await prisma.sectionItem.findMany({
        where: { itemId: item.id },
        include: { section: true },
      });

      return sectionItems.map((sectionItem) => sectionItem.section);
    },
  },
  Mutation: {
    createSection: async (_, { label }) => {
      return await prisma.section.create({
        data: {
          label,
        },
      });
    },

    updateSection: async (_, { id, label }) => {
      return await prisma.section.update({
        where: { id: parseInt(id) },
        data: {
          label,
        },
      });
    },

    deleteSection: async (_, { id }) => {
      const deletedSection = await prisma.section.delete({
        where: { id: parseInt(id) },
      });

      return deletedSection;
    },
  },
};

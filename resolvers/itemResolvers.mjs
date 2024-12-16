import prisma from "../prismaClient.mjs";

export const itemResolvers = {
  Query: {
    items: async () => await prisma.item.findMany(),
    item: async (_, { id }) => {
      return await prisma.item.findUnique({ where: { id: parseInt(id) } });
    },
  },
  Item: {
    sections: async (item) => {
      const sectionItems = await prisma.sectionItem.findMany({
        where: { itemId: item.id },
        include: { section: true },
      });
      return sectionItems.map((sectionItem) => sectionItem.section);
    },
    itemModifierGroups: async (item) => {
      return await prisma.modifierGroup.findMany({
        where: { itemId: item.id },
        include: { modifiers: true },
      });
    },
    modifiers: async (item) => {
      return await prisma.modifier.findMany({
        where: { itemId: item.id },
      });
    },
  },
  Mutation: {
    createItem: async (_, { label, price, sectionId, type }) => {
      return await prisma.item.create({
        data: {
          label,
          price,
          type,
          sections: {
            create: {
              sectionId: parseInt(sectionId),
            },
          },
        },
      });
    },

    createModifierGroup: async (
      _,
      { itemId, label, selection_required_min, selection_required_max }
    ) => {
      return await prisma.modifierGroup.create({
        data: {
          label,
          selection_required_min,
          selection_required_max,
          item: {
            connect: {
              id: parseInt(itemId),
            },
          },
        },
      });
    },
  },
};

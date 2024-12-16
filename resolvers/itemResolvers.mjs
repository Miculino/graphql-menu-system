// Mock data
import { mockItems } from "../mockData.mjs";

export const itemResolvers = {
  Query: {
    item: (_, { identifier }) => {
      return mockItems.find((mi) => mi.identifier === identifier);
    },
  },
};

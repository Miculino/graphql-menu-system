// We merge the modularized resolvers files to have one source of truth

import { menuResolvers } from "./menuResolvers.mjs";
import { sectionResolvers } from "./sectionResolvers.mjs";

export const resolvers = [menuResolvers, sectionResolvers];

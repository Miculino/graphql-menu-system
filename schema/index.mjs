// We merge the modularized schema files to have one source of truth

import { menuTypeDefs } from "./menuSchema.mjs";
import { sectionTypeDefs } from "./sectionSchema.mjs";

export const typeDefs = [menuTypeDefs, sectionTypeDefs];

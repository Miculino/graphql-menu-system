-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MenuSection" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "menuId" INTEGER NOT NULL,
    "sectionId" INTEGER NOT NULL,
    CONSTRAINT "MenuSection_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "MenuSection_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_MenuSection" ("id", "menuId", "sectionId") SELECT "id", "menuId", "sectionId" FROM "MenuSection";
DROP TABLE "MenuSection";
ALTER TABLE "new_MenuSection" RENAME TO "MenuSection";
CREATE TABLE "new_ModifierGroup" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "label" TEXT NOT NULL,
    "selection_required_min" INTEGER NOT NULL,
    "selection_required_max" INTEGER NOT NULL,
    "itemId" INTEGER,
    CONSTRAINT "ModifierGroup_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ModifierGroup" ("id", "itemId", "label", "selection_required_max", "selection_required_min") SELECT "id", "itemId", "label", "selection_required_max", "selection_required_min" FROM "ModifierGroup";
DROP TABLE "ModifierGroup";
ALTER TABLE "new_ModifierGroup" RENAME TO "ModifierGroup";
CREATE TABLE "new_SectionItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sectionId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,
    CONSTRAINT "SectionItem_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "SectionItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_SectionItem" ("id", "itemId", "sectionId") SELECT "id", "itemId", "sectionId" FROM "SectionItem";
DROP TABLE "SectionItem";
ALTER TABLE "new_SectionItem" RENAME TO "SectionItem";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

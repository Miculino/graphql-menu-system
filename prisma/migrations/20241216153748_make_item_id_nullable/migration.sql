-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SectionItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sectionId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,
    CONSTRAINT "SectionItem_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SectionItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_SectionItem" ("id", "itemId", "sectionId") SELECT "id", "itemId", "sectionId" FROM "SectionItem";
DROP TABLE "SectionItem";
ALTER TABLE "new_SectionItem" RENAME TO "SectionItem";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

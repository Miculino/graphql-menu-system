-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ModifierGroup" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "label" TEXT NOT NULL,
    "selection_required_min" INTEGER NOT NULL,
    "selection_required_max" INTEGER NOT NULL,
    "itemId" INTEGER,
    CONSTRAINT "ModifierGroup_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ModifierGroup" ("id", "label", "selection_required_max", "selection_required_min") SELECT "id", "label", "selection_required_max", "selection_required_min" FROM "ModifierGroup";
DROP TABLE "ModifierGroup";
ALTER TABLE "new_ModifierGroup" RENAME TO "ModifierGroup";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

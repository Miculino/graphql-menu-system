/*
  Warnings:

  - You are about to drop the column `identifier` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `identifier` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the column `identifier` on the `ModifierGroup` table. All the data in the column will be lost.
  - You are about to drop the column `identifier` on the `Section` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "label" TEXT NOT NULL,
    "description" TEXT,
    "price" REAL NOT NULL,
    "type" TEXT NOT NULL
);
INSERT INTO "new_Item" ("description", "id", "label", "price", "type") SELECT "description", "id", "label", "price", "type" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
CREATE TABLE "new_Menu" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "label" TEXT NOT NULL,
    "start_date" DATETIME NOT NULL,
    "end_date" DATETIME NOT NULL
);
INSERT INTO "new_Menu" ("end_date", "id", "label", "start_date") SELECT "end_date", "id", "label", "start_date" FROM "Menu";
DROP TABLE "Menu";
ALTER TABLE "new_Menu" RENAME TO "Menu";
CREATE TABLE "new_ModifierGroup" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "label" TEXT NOT NULL,
    "selection_required_min" INTEGER NOT NULL,
    "selection_required_max" INTEGER NOT NULL
);
INSERT INTO "new_ModifierGroup" ("id", "label", "selection_required_max", "selection_required_min") SELECT "id", "label", "selection_required_max", "selection_required_min" FROM "ModifierGroup";
DROP TABLE "ModifierGroup";
ALTER TABLE "new_ModifierGroup" RENAME TO "ModifierGroup";
CREATE TABLE "new_Section" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "label" TEXT NOT NULL
);
INSERT INTO "new_Section" ("id", "label") SELECT "id", "label" FROM "Section";
DROP TABLE "Section";
ALTER TABLE "new_Section" RENAME TO "Section";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

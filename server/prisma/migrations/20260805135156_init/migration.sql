/*
  Warnings:

  - Added the required column `userWhoAdd` to the `Music` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Music" ADD COLUMN     "userWhoAdd" INTEGER NOT NULL;

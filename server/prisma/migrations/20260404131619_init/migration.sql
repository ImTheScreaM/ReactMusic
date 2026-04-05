/*
  Warnings:

  - You are about to drop the column `artist` on the `LoveMusic` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `LoveMusic` table. All the data in the column will be lost.
  - You are about to drop the column `genre` on the `LoveMusic` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `LoveMusic` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `LoveMusic` table. All the data in the column will be lost.
  - You are about to drop the column `urlAvatar` on the `LoveMusic` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,musicId]` on the table `LoveMusic` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `musicId` to the `LoveMusic` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LoveMusic" DROP COLUMN "artist",
DROP COLUMN "description",
DROP COLUMN "genre",
DROP COLUMN "name",
DROP COLUMN "time",
DROP COLUMN "urlAvatar",
ADD COLUMN     "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "musicId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Music" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "artist" TEXT,
    "genre" TEXT,
    "description" TEXT,
    "time" INTEGER,
    "urlAvatar" TEXT,

    CONSTRAINT "Music_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LoveMusic_userId_musicId_key" ON "LoveMusic"("userId", "musicId");

-- AddForeignKey
ALTER TABLE "LoveMusic" ADD CONSTRAINT "LoveMusic_musicId_fkey" FOREIGN KEY ("musicId") REFERENCES "Music"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

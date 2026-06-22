/*
  Warnings:

  - You are about to drop the column `musicId` on the `Playlists` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[playlistId,musicId]` on the table `PlaylistMusic` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "PlaylistMusic" DROP CONSTRAINT "PlaylistMusic_musicId_fkey";

-- DropForeignKey
ALTER TABLE "PlaylistMusic" DROP CONSTRAINT "PlaylistMusic_playlistId_fkey";

-- DropForeignKey
ALTER TABLE "Playlists" DROP CONSTRAINT "Playlists_musicId_fkey";

-- AlterTable
ALTER TABLE "Playlists" DROP COLUMN "musicId";

-- CreateIndex
CREATE UNIQUE INDEX "PlaylistMusic_playlistId_musicId_key" ON "PlaylistMusic"("playlistId", "musicId");

-- AddForeignKey
ALTER TABLE "PlaylistMusic" ADD CONSTRAINT "PlaylistMusic_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaylistMusic" ADD CONSTRAINT "PlaylistMusic_musicId_fkey" FOREIGN KEY ("musicId") REFERENCES "Music"("id") ON DELETE CASCADE ON UPDATE CASCADE;

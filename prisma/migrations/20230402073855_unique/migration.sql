/*
  Warnings:

  - A unique constraint covering the columns `[poemId,saverId]` on the table `Bookmark` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Bookmark_poemId_saverId_key" ON "Bookmark"("poemId", "saverId");

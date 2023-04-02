/*
  Warnings:

  - You are about to drop the column `text` on the `Poem` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Poem` table. All the data in the column will be lost.
  - Added the required column `creatorId` to the `Poem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `poem` to the `Poem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Poem" DROP CONSTRAINT "Poem_userId_fkey";

-- AlterTable
ALTER TABLE "Poem" DROP COLUMN "text",
DROP COLUMN "userId",
ADD COLUMN     "creatorId" TEXT NOT NULL,
ADD COLUMN     "poem" TEXT NOT NULL,
ALTER COLUMN "image" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "Bookmark" (
    "id" TEXT NOT NULL,
    "poemId" TEXT NOT NULL,
    "saverId" TEXT NOT NULL,

    CONSTRAINT "Bookmark_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Poem" ADD CONSTRAINT "Poem_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_poemId_fkey" FOREIGN KEY ("poemId") REFERENCES "Poem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_saverId_fkey" FOREIGN KEY ("saverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

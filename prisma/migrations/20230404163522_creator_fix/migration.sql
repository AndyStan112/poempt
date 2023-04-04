-- DropForeignKey
ALTER TABLE "Poem" DROP CONSTRAINT "Poem_creatorId_fkey";

-- AddForeignKey
ALTER TABLE "Poem" ADD CONSTRAINT "Poem_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

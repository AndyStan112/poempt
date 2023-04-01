-- CreateTable
CREATE TABLE "Poem" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "image" BYTEA NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Poem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Poem" ADD CONSTRAINT "Poem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

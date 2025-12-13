/*
  Warnings:

  - Added the required column `authorId` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Made the column `thumbnail` on table `Project` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "authorId" INTEGER NOT NULL,
ALTER COLUMN "thumbnail" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

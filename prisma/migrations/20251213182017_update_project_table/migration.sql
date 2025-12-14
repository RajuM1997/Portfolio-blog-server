/*
  Warnings:

  - You are about to drop the column `project_links` on the `Project` table. All the data in the column will be lost.
  - Added the required column `client_repo_link` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `server_repo_link` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "project_links",
ADD COLUMN     "client_repo_link" TEXT NOT NULL,
ADD COLUMN     "server_repo_link" TEXT NOT NULL;

/*
  Warnings:

  - You are about to drop the column `accountId` on the `Animal` table. All the data in the column will be lost.
  - Added the required column `owner` to the `Animal` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Animal" DROP CONSTRAINT "Animal_accountId_fkey";

-- AlterTable
ALTER TABLE "Animal" DROP COLUMN "accountId",
ADD COLUMN     "owner" VARCHAR(36) NOT NULL;

-- AddForeignKey
ALTER TABLE "Animal" ADD CONSTRAINT "Animal_owner_fkey" FOREIGN KEY ("owner") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

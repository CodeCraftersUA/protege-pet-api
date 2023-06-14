/*
  Warnings:

  - You are about to drop the column `owner` on the `Animal` table. All the data in the column will be lost.
  - You are about to drop the column `specie` on the `Sickness` table. All the data in the column will be lost.
  - Added the required column `owner_id` to the `Animal` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Animal" DROP CONSTRAINT "Animal_owner_fkey";

-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "approved" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Animal" DROP COLUMN "owner",
ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "owner_id" VARCHAR(36) NOT NULL;

-- AlterTable
ALTER TABLE "Sickness" DROP COLUMN "specie",
ADD COLUMN     "species" "AnimalSpecie"[];

-- AddForeignKey
ALTER TABLE "Animal" ADD CONSTRAINT "Animal_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

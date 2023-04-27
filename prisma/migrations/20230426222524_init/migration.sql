/*
  Warnings:

  - The primary key for the `AnimalsOnSickness` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `animalId` on the `AnimalsOnSickness` table. All the data in the column will be lost.
  - You are about to drop the column `sicknessId` on the `AnimalsOnSickness` table. All the data in the column will be lost.
  - Added the required column `animal_id` to the `AnimalsOnSickness` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sickness_id` to the `AnimalsOnSickness` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AnimalsOnSickness" DROP CONSTRAINT "AnimalsOnSickness_animalId_fkey";

-- DropForeignKey
ALTER TABLE "AnimalsOnSickness" DROP CONSTRAINT "AnimalsOnSickness_sicknessId_fkey";

-- AlterTable
ALTER TABLE "AnimalsOnSickness" DROP CONSTRAINT "AnimalsOnSickness_pkey",
DROP COLUMN "animalId",
DROP COLUMN "sicknessId",
ADD COLUMN     "added_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "animal_id" TEXT NOT NULL,
ADD COLUMN     "sickness_id" TEXT NOT NULL,
ADD CONSTRAINT "AnimalsOnSickness_pkey" PRIMARY KEY ("animal_id", "sickness_id");

-- AddForeignKey
ALTER TABLE "AnimalsOnSickness" ADD CONSTRAINT "AnimalsOnSickness_animal_id_fkey" FOREIGN KEY ("animal_id") REFERENCES "Animal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnimalsOnSickness" ADD CONSTRAINT "AnimalsOnSickness_sickness_id_fkey" FOREIGN KEY ("sickness_id") REFERENCES "Sickness"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

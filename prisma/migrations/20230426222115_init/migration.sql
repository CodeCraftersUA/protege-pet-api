/*
  Warnings:

  - You are about to drop the `account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `animal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `animalsOnSickness` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sickness` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('ADMIN', 'PROTECTOR');

-- CreateEnum
CREATE TYPE "AnimalSpecie" AS ENUM ('CAT', 'DOG');

-- CreateEnum
CREATE TYPE "AnimalGender" AS ENUM ('MALE', 'FEMALE');

-- DropForeignKey
ALTER TABLE "animalsOnSickness" DROP CONSTRAINT "animalsOnSickness_animalId_fkey";

-- DropForeignKey
ALTER TABLE "animalsOnSickness" DROP CONSTRAINT "animalsOnSickness_sicknessId_fkey";

-- DropTable
DROP TABLE "account";

-- DropTable
DROP TABLE "animal";

-- DropTable
DROP TABLE "animalsOnSickness";

-- DropTable
DROP TABLE "sickness";

-- DropEnum
DROP TYPE "accountType";

-- DropEnum
DROP TYPE "animalGender";

-- DropEnum
DROP TYPE "animalSpecie";

-- CreateTable
CREATE TABLE "Account" (
    "id" VARCHAR(36) NOT NULL,
    "email" VARCHAR(125) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "name" VARCHAR(55) NOT NULL,
    "type" "AccountType" NOT NULL,
    "cnpj" VARCHAR(14),

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Animal" (
    "id" VARCHAR(36) NOT NULL,
    "name" VARCHAR(55) NOT NULL,
    "specie" "AnimalSpecie" NOT NULL,
    "gender" "AnimalGender" NOT NULL,

    CONSTRAINT "Animal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sickness" (
    "id" VARCHAR(36) NOT NULL,
    "name" VARCHAR(55) NOT NULL,
    "specie" "AnimalSpecie"[],

    CONSTRAINT "Sickness_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnimalsOnSickness" (
    "animalId" TEXT NOT NULL,
    "sicknessId" TEXT NOT NULL,

    CONSTRAINT "AnimalsOnSickness_pkey" PRIMARY KEY ("animalId","sicknessId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_name_key" ON "Account"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Account_cnpj_key" ON "Account"("cnpj");

-- AddForeignKey
ALTER TABLE "AnimalsOnSickness" ADD CONSTRAINT "AnimalsOnSickness_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Animal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnimalsOnSickness" ADD CONSTRAINT "AnimalsOnSickness_sicknessId_fkey" FOREIGN KEY ("sicknessId") REFERENCES "Sickness"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateEnum
CREATE TYPE "animalSpecie" AS ENUM ('CAT', 'DOG');

-- CreateEnum
CREATE TYPE "animalGender" AS ENUM ('MALE', 'FEMALE');

-- CreateTable
CREATE TABLE "animal" (
    "id" VARCHAR(36) NOT NULL,
    "name" VARCHAR(55) NOT NULL,
    "specie" "animalSpecie" NOT NULL,
    "gender" "animalGender" NOT NULL,

    CONSTRAINT "animal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sickness" (
    "id" VARCHAR(36) NOT NULL,
    "name" VARCHAR(55) NOT NULL,
    "specie" "animalSpecie" NOT NULL,

    CONSTRAINT "sickness_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "animalsOnSickness" (
    "animalId" TEXT NOT NULL,
    "sicknessId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "animalsOnSickness_pkey" PRIMARY KEY ("animalId","sicknessId")
);

-- AddForeignKey
ALTER TABLE "animalsOnSickness" ADD CONSTRAINT "animalsOnSickness_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "animal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "animalsOnSickness" ADD CONSTRAINT "animalsOnSickness_sicknessId_fkey" FOREIGN KEY ("sicknessId") REFERENCES "sickness"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

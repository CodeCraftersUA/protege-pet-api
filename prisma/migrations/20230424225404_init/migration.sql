/*
  Warnings:

  - You are about to drop the `account` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('ADMIN', 'PROTECTOR');

-- DropTable
DROP TABLE "account";

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

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_name_key" ON "Account"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Account_cnpj_key" ON "Account"("cnpj");

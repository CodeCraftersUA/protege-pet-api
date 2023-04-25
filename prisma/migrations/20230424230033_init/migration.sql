/*
  Warnings:

  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "accountType" AS ENUM ('ADMIN', 'PROTECTOR');

-- DropTable
DROP TABLE "Account";

-- DropEnum
DROP TYPE "AccountType";

-- CreateTable
CREATE TABLE "account" (
    "id" VARCHAR(36) NOT NULL,
    "email" VARCHAR(125) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "name" VARCHAR(55) NOT NULL,
    "type" "accountType" NOT NULL,
    "cnpj" VARCHAR(14),

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "account_email_key" ON "account"("email");

-- CreateIndex
CREATE UNIQUE INDEX "account_name_key" ON "account"("name");

-- CreateIndex
CREATE UNIQUE INDEX "account_cnpj_key" ON "account"("cnpj");

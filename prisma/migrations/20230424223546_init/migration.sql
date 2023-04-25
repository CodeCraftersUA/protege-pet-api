-- CreateTable
CREATE TABLE "account" (
    "id" VARCHAR(36) NOT NULL,
    "cnpj" VARCHAR(14) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "email" VARCHAR(125) NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "account_cnpj_key" ON "account"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "account_email_key" ON "account"("email");

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Type_user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "desc" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Type_approval" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "desc" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Approval" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "desc_approval" TEXT NOT NULL,
    "status_verf" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "type_approval" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Detail_user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_type" TEXT NOT NULL,
    "id_user" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

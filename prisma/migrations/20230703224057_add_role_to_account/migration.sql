-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER');

-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER';

-- AlterTable
ALTER TABLE "Otp" ALTER COLUMN "verified" SET DEFAULT false;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "avatarUrl" DROP DEFAULT;

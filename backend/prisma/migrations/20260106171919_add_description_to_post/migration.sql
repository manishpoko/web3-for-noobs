-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "description" TEXT,
ADD COLUMN     "slug" TEXT NOT NULL DEFAULT 'uncategorized';

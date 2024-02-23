-- CreateEnum
CREATE TYPE "RoomType" AS ENUM ('SINGLE', 'DOUBLE');

-- CreateTable
CREATE TABLE "Rooms" (
    "id" SERIAL NOT NULL,
    "type" "RoomType" NOT NULL,
    "description" TEXT NOT NULL,
    "amenities" TEXT[],
    "price" INTEGER NOT NULL,
    "availability" BOOLEAN NOT NULL,
    "images" TEXT[],

    CONSTRAINT "Rooms_pkey" PRIMARY KEY ("id")
);

/*
  Warnings:

  - The primary key for the `UserFavoriteRestaurant` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "UserFavoriteRestaurant" DROP CONSTRAINT "UserFavoriteRestaurant_pkey",
ADD CONSTRAINT "UserFavoriteRestaurant_pkey" PRIMARY KEY ("userId", "restaurantId");

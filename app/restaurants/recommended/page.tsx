import Header from "@/app/_components/header";
import RestaurantItem from "@/app/_components/restaurant-item";
import { db } from "@/app/_lib/prisma";
import { UserFavoriteRestaurant } from "@prisma/client";
import { getSession } from "next-auth/react";

const RecommendedRestaurants = async () => {
    
    const session = await getSession();
    const userId = session?.user?.id || null;

    const restaurants = await db.restaurant.findMany({});
    let userFavoriteRestaurants: UserFavoriteRestaurant[] = []; 

    

  if (userId) {
    userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
      where: {
        userId: userId,
      },
    });
  }
    return ( 
       <>
       <Header />
        <div className="px-5 py-6">
            <h2 className="text-lg font-bold mb-6">
                Restaurantes recomendados
            </h2>
            <div className="flex w-full flex-col gap-6 ">
            {restaurants.map((restaurant) => (
            <RestaurantItem 
            key={restaurant.id} 
            restaurant={restaurant} 
            className="min-w-full max-w-full"
            userFavoriteRestaurants={userFavoriteRestaurants}
           
            />
            ))}
        </div>
        </div>
        </>
     );
};
 
export default RecommendedRestaurants;
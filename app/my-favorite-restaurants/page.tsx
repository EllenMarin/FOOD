import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import { notFound } from "next/navigation";
import Header from "../_components/header";
import { db } from "../_lib/prisma";
import RestaurantItem from "../_components/restaurant-item";

const MyFavoriteRestaurants = async () => {
    const session = await getServerSession(authOptions)

        if(!session) {
        return notFound()
    }

    const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
        where: {
            userId: session.user.id,
        },
        include: {
            restaurant: true,
        },
    });
    return (
        <>
        <Header />
            <div className="px-5 py-6">
                <h2 className="text-lg font-bold mb-6">
                    Restaurantes favoritos
                </h2>
                <div className="flex w-full flex-col gap-6">
                {userFavoriteRestaurants.length > 0 ? (
                    userFavoriteRestaurants.map(({restaurant}) => (
                <RestaurantItem 
                key={restaurant.id} 
                restaurant={restaurant} 
                className="min-w-full max-w-full"
                userFavoriteRestaurants={userFavoriteRestaurants}
                />
                ))
                ) : (
                    <h3 className="font-medium">
                        Você ainda nao marcou nenhum restaurante como favorito
                    </h3>
                )
            }
            </div>
            </div>
            </>
    )
};

export default MyFavoriteRestaurants;
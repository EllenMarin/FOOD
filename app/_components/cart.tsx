import { useContext } from "react";
import { CartContext } from "../_context/cart";
import CartItem from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "../_lib/_helpers/price";
import { space } from "postcss/lib/list";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";


const Cart = () => {
    const { products, subTotalPrice, totalPrice, totalDiscount } = useContext(CartContext);
    return ( 
        <div className="py-5 flex h-full flex-col">
            

    {products.length > 0 ? (
        <> 
            <div className="space-y-4 flex-auto">
                    {products.map((product) =>(
                    <CartItem key={product.id} cartProduct={product} />
                    ))}
                </div>
            <div className="mt-6">
            <Card>
                <CardContent className="space-y-2 p-5">
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>{formatCurrency(subTotalPrice)}</span>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Promoção</span>
                        <span>- {formatCurrency(totalDiscount)}</span>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Entrega</span>
                        
                        {Number(products?.[0].restaurant.deliveryFee) == 0 ? (
                            <span className="uppercase text-primary">Grátis</span>
                        ) : (
                            formatCurrency(Number(products?.[0].restaurant.deliveryFee))
                        )}
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between text-xs font-semibold">
                        <span>Total</span>
                        <span>{formatCurrency(totalPrice)}</span>
                    </div>
                </CardContent>
            </Card>
            </div>

            <Button className="mt-6 w-full">Confirmar e pagar</Button>
        </>
    ) : (<h2 className="text-left font-medium">Você ainda não adicionou nenhum produto á sua sacola</h2>
    )}
        </div>
     );
};
 
export default Cart;
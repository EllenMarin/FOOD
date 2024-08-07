"use client";
import { Prisma, Product } from "@prisma/client";
import { ReactNode, createContext, useMemo, useState } from "react";
import ProductItem from "../_components/product-item";
import { calculateProductTotalPrice } from "../_lib/_helpers/price";

export interface CartProduct 
extends Prisma.ProductGetPayload<{
    include: {
        restaurant: {
            select: {
                id: true;
                deliveryFee: true;
                deliveryTimeMinutes: true;
            };
        };    
    };
}> {
    quantity: number;
}

interface ICartContext {
    products: CartProduct[];
    subTotalPrice: number;
    totalPrice: number;
    totalDiscount: number;
    totalQuantity: number;
    addProductToCart: ({ 
        product, 
        quantity, 
        emptyCart, 
    }: {
        product: Prisma.ProductGetPayload<{
            include: {
                restaurant: {
                    select: {
                        id: true;
                        deliveryFee: true;
                        deliveryTimeMinutes: true;
                    };
                };
            };
        }>;
        quantity: number;
        emptyCart?: boolean | undefined;
    }) => void
    decreaseProductQuantity: (productId: string) => void;
    increaseProductQuantity: (productId: string) => void;
    removeProductFromCart: (productId: string) => void;
    clearCart: () => void 
}

export const CartContext = createContext<ICartContext>({
    products: [],
    subTotalPrice: 0,
    totalPrice: 0,
    totalDiscount: 0,
    totalQuantity: 0,
    addProductToCart: () => {},
    decreaseProductQuantity: () => {},
    increaseProductQuantity: () => {},
    removeProductFromCart: () => {},
    clearCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [products, setProducts] = useState<CartProduct[]>([]);

    const subTotalPrice = useMemo(() => {
        return products.reduce((acc, product) => {
            return acc + Number(product.price) * product.quantity
        }, 0);
    }, [products]);

    const totalPrice = useMemo(() => {
        return products.reduce((acc, product) => {
            return acc + calculateProductTotalPrice(product) * product.quantity
        }, 0) + Number(products?.[0]?.restaurant?.deliveryFee);
    }, [products]);

    const totalQuantity = useMemo(() => {
        return products.reduce((acc, product) => {
            return acc + product.quantity;
        }, 0);
    }, [products])

    const totalDiscount = subTotalPrice - totalPrice + Number(products?.[0]?.restaurant?.deliveryFee);

    const clearCart = () => {
        return setProducts([]);
    };

    const decreaseProductQuantity = (productId: string) => {
        return setProducts((prev) =>
        prev.map((cartProduct) => {
            if(cartProduct.id == productId) {
                if(cartProduct.quantity == 1){
                    return cartProduct;
                }
                return {
                    ...cartProduct,
                    quantity: cartProduct.quantity - 1,
                };
            }
            return cartProduct;
        }),
        );
    }

    const increaseProductQuantity = (productId: string) => {
        return setProducts((prev) =>
        prev.map((cartProduct) => {
            if(cartProduct.id == productId) {
                
                return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + 1,
                };
            }
            return cartProduct;
        }),
        );
    }

    const removeProductFromCart = (productId: string) => {
        return setProducts((prev) => prev.filter((product) => product.id != productId));
    }

    const addProductToCart = ({
        product,
        quantity,
        emptyCart,
    }: {
        product: Prisma.ProductGetPayload<{
            include: {
                restaurant:{
                    select: {
                        id: true;
                        deliveryFee: true;
                        deliveryTimeMinutes: true;
                    };
                };
            };
        }>,
        quantity: number,
        emptyCart?: boolean,
    }) => {
            if(emptyCart) {
                setProducts([]);
            }

               
        const isProductAlreadyOnCart = products.some(
            (cartProduct) => cartProduct.id == product.id,
        );
        if (isProductAlreadyOnCart){
            return setProducts((prev) =>
            prev.map((cartProduct) => {
                if(cartProduct.id == product.id) {
                    return {
                        ...cartProduct,
                        quantity: cartProduct.quantity + quantity,
                    };
                }
                return cartProduct;
            }),
            );
            
        }
        setProducts((prev) => [...prev, { ...product, quantity: quantity}]);
        
    };

    return (
        <CartContext.Provider 
        value={{ 
            products, 
            subTotalPrice,
            totalPrice,
            totalDiscount,
            totalQuantity,
            clearCart,
            addProductToCart, 
            decreaseProductQuantity, 
            increaseProductQuantity, 
            removeProductFromCart, 
        }}>
        {children}
        </CartContext.Provider>
    );
};

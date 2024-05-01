"use client";

import { calculateProductTotalPrice, formatCurrency } from "@/app/_lib/_helpers/price";
import Image from "next/image";
import DiscountBadge from "@/app/_components/discount-badge";
import { Prisma, Product } from "@prisma/client";
import { Button } from "@/app/_components/ui/button";
import { ChevronRightIcon, ChevronLeftIcon } from "lucide-react";
import { useState } from "react";

interface ProductDetailsProps{
    product : Prisma.ProductGetPayload<{
        include: {
            restaurant: true;
        };
    }>;
}

const ProductDetails = ({product}: ProductDetailsProps) => {
    const [quantity, setQuantity] = useState(1);

    const handleIncreaseQuantityClick = () => 
    setQuantity((currencyState) => currencyState + 1);
    const handleDecreaseQuantityClick = () => 
    setQuantity((currencyState) => {
        if (currencyState == 1) return 1 ;
        return currencyState - 1;
    });

    return ( 
        <div className="p-5">
        <div className="flex items-center gap-[0.375rem]">
            <div className="relative h-6 w-6">
                <Image 
                src={product.restaurant.imageUrl}
                alt={product.restaurant.name}
                fill
                className="rounded-full object-cover"
                />

            </div>
            <span className="text-xs text-muted-foreground">
                {product.restaurant.name}
            </span>
        </div>

        <h1 className="mb-1 mt-1 text-xl font-semibold">{product.name}</h1>

        <div className="flex justify-between">
            <div>
            <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">
                {formatCurrency(calculateProductTotalPrice(product))}
                </h2>
            {product.discountPercentage > 0 && (
                <DiscountBadge product={product} />
            )}
            </div>
            {product.discountPercentage > 0 && (
                <p className="text-sm text-muted-foreground">
                De: {formatCurrency(Number(product.price))}
                </p>
            )}
            </div>

            <div className="flex items-center gap-3 text-center">
                <Button
                size="icon"
                variant="ghost"
                className="border border-solid border-muted-foreground"
                onClick={handleDecreaseQuantityClick}
                >
                <ChevronLeftIcon />
                </Button>
                <span className="w-4">{quantity}</span>
                <Button
                size="icon"
                onClick={handleIncreaseQuantityClick}
                >
                <ChevronRightIcon />
                </Button>
            </div>
        </div>

    </div>
     );
}
 
export default ProductDetails;

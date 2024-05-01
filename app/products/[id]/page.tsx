import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import ProductImage from "./_component/product-image";
import ProductDetails from "./_component/product-details";

interface ProductPageProps {
    params: {
        id: string;
    };
}

const ProductPage = async ({ params: { id }}: ProductPageProps) => {
    const product = await db.product.findUnique({
        where: {
            id,
        },
        include:{
            restaurant: true,
        }
    })
    if(!product) {
        return notFound();
    }

    return (
    <div>
        <ProductImage product={product}/>
        
       <ProductDetails product={product}/>
        
    </div>
    );
};
export default ProductPage;
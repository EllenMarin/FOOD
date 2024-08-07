import { Category } from "@prisma/client";
import Image from 'next/image'; 
import Link from "next/link";

interface CategoryItemProps{
    category: Category;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
    return ( 
       <Link href={`/categories/${category.id}/products`} className="flex items-center justify-center gap-3 px-4 py-3 bg-slate-50 shadow-md rounded-full" >
       <Image
       src={category.imageUrl}
       alt={category.name}
       height={30}
       width={30}
       />

       <span className="font-semibold text-sm">{category.name}</span>
   </Link>
     );
};
 
export default CategoryItem;
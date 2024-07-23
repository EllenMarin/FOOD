"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import { LogInIcon, LogOutIcon, MenuIcon } from "lucide-react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Sheet , SheetContent, SheetHeader, SheetTitle, SheetTrigger} from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Header = () => {
    const { data, status } = useSession(); 

    console.log(data?.user);
    
    return(
    <div className="flex justify-between pt-6 px-5">
        <div className="relative h-[70px] w-[100px]">
        <Link href={"/"}>
        <Image 
            src="/logo.png" 
            alt="FOOD" 
            fill 
            className="object-cover"/>
        </Link>
        </div>
        
        <Sheet>
            <SheetTrigger>
            <Button 
                size="icon" 
                variant="outline" 
                className="border-none bg-transparent">
                <MenuIcon />
            </Button>
            </SheetTrigger>

            <SheetContent>
                <SheetHeader>
                    <SheetTitle className="text-left">Menu</SheetTitle>
                </SheetHeader>

               {data?.user  ? (
                
                <div className="flex justify-between">
                    <div className="flex items-center gap-3">
                        <Avatar>
                            
                            <AvatarFallback>
                                {data?.user?.name?.split(" ")[0][0]}
                                {data?.user?.name?.split(" ")[1][0]}
                            </AvatarFallback>
                        </Avatar>

                        <div>
                            <h3 className="font-semibold">{data?.user?.name}</h3>
                            <span className="block text-xs text-muted-foreground">
                                {data?.user?.email}
                            </span>
                        </div>
                    
                    </div>
                    <Button size="icon" onClick={() => signOut()}>
                        <LogOutIcon size={20}/>
                    </Button>
                </div>
            
               ) : (
                
                    <div className="flex items-center justify-between">
                        <h2>Faça seu login</h2>
                        <Button size="icon" onClick={() => signIn()}>
                            <LogInIcon />
                        </Button>
                    </div>
                
               )}
            </SheetContent>
        </Sheet>
            
    </div>
    );
};

export default Header;

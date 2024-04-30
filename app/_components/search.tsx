import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Search = () => {
    return (
        <div className="flex gap-2">
            <Input placeholder="Procurar restaurantes" className="border-none"/>
            <Button size="icon">
                <SearchIcon size={19}/>
            </Button>
        </div>
    );
};
export default Search;
import {React, useState} from 'react';
import { Search } from 'lucide-react';

const SearchBar = () => {
    // const [query, setQuery] = useState("");
    // const handleSearch = (e) => {
    //     const value = e.target.value;
    //     setQuery(value);

    //     // Filtrage simple sur le titre ou la description
    //     const filtered = data.filter(item =>
    //     item.title.toLowerCase().includes(value.toLowerCase()) ||
    //     item.description.toLowerCase().includes(value.toLowerCase())
    //     );
    //     onFilter(filtered);
    // };

    return (
        <div className="relative flex items-center group">
            <Search
                className="absolute left-3 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" 
            />
            <input
                type="text"
                placeholder="Search..."
                className="
                    bg-slate-100/50
                    border-none
                    rounded-full
                    pl-10 pr-4 py-1.5
                    text-sm
                    focus:ring-2
                    focus:ring-blue-600/50
                    focus:bg-white
                    outline-none
                    w-32 focus:w-48
                    transition-all
                    duration-300
                    placeholder:text-slate-400
                "
            />
        </div>
    );
};

export default SearchBar;
'use client';
import React, { useState, useEffect, useRef } from 'react';
import { FiSearch } from 'react-icons/fi';

// Sample search data 
const searchData = [
    { id: 1, name: 'Resume Builder' },
    { id: 2, name: 'Cover Letter Generator' },
    { id: 3, name: 'Job Tracker' },
    { id: 4, name: 'AI Review' },
    { id: 5, name: 'Templates' },
];

const Searchbar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredResults, setFilteredResults] = useState(searchData);
    const [showResults, setShowResults] = useState(false);

    const profileRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLDivElement>(null);

    // Close dropdowns when clicked outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowResults(false); // Just hide dropdown
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);

        if (value.trim() === '') {
            setFilteredResults([]);
            setShowResults(false);
        } else {
            const results = searchData.filter(item =>
                item.name.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredResults(results);
            setShowResults(true);
        }
    };

    return (
        <div className="relative w-64" ref={searchRef}>
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleSearch}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-1 focus:ring-hamzaPrimary bg-gray-100"
                />
                <FiSearch className="absolute left-3 top-2.5 text-xl text-primarySlate/80" />
            </div>

            {searchQuery && showResults && (
                <ul className="absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow z-50 max-h-60 overflow-y-auto">
                    {filteredResults.length > 0 ? (
                        filteredResults.map(result => (
                            <li
                                key={result.id}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            >
                                {result.name}
                            </li>
                        ))
                    ) : (
                        <li className="px-4 py-2 text-gray-500">No results found</li>
                    )}
                </ul>
            )}
        </div>

    )
}

export default Searchbar
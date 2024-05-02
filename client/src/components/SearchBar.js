import React from  'react';

export default function SearchBar({searchQuery, setSearchQuery}) {
    return (
            <input
                type="text"
                className="w-1/3 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Pesquisar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
    );
}
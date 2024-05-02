import React from  'react';

export default function SearchBar({searchQuery, setSearchQuery}) {
    return (
        <div className='w-1/3 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 flex justify-between' > {/* Wrap JSX elements inside a parent element */}
            <input className='w-full bg-transparent focus:outline-none'
                type="text"
                placeholder="Pesquisar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <img src="/img/search.png" alt="search" className="w-6 h-6 ml-2" /> {/* Remove the closing slash */}
        </div>
    );
}
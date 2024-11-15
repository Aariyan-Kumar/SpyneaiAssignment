import React, { useState, useEffect } from 'react';
import appwriteService from '../appwrite/databaseConfig';
import { Cards, Contanier } from '../components/index';

function Search() {
    const [posts, setPosts] = useState([]); // Stores all posts
    const [filteredPosts, setFilteredPosts] = useState([]); // Stores posts filtered by the search query
    const [searchTerm, setSearchTerm] = useState(''); // Tracks the user's search input

    useEffect(() => {
        // Fetch all posts from the database
        appwriteService.getAllPost([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        });

        if(searchTerm == null)
        {
            setFilteredPosts([]);
        }
    }, []);

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchTerm(query);

        if(query == null)
        {
            setFilteredPosts([]);
        }

        // Filter posts based on the search query
        const filtered = posts.filter((post) =>
            post.title.toLowerCase().includes(query) ||
            post.description.toLowerCase().includes(query)
        );
        setFilteredPosts(filtered);
    };

    return (
        <div className="w-full py-8">
            <Contanier>
                {/* Search Bar */}
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search cars by title or description..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </div>

                {/* Display Filtered Posts */}
                <div className="w-full grid grid-cols-3 gap-4">
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map((post) => (
                            <div className="p-2 w-full" key={post.$id}>
                                <Cards {...post} />
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 col-span-3">
                            No cars found for your search.
                        </p>
                    )}
                </div>
            </Contanier>
        </div>
    );
}

export default Search;

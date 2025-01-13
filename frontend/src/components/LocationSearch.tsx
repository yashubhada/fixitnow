import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HERE_API_KEY = 'lMiwkIYzohYhq4--gQP9JMg4p9O_NJhAaQ2LQYWmpcY';

const LocationSearch: React.FC = () => {
    const [query, setQuery] = useState<string>('');
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (query.length < 3) {
                setSuggestions([]);
                setLoading(false);
                return;
            }

            setLoading(true);
            const endpoint = `https://autocomplete.search.hereapi.com/v1/autocomplete?q=${encodeURIComponent(
                query
            )}&apiKey=${HERE_API_KEY}`;

            try {
                const response = await axios.get(endpoint);
                setSuggestions(response.data.items || []);
            } catch (error) {
                console.error('Error fetching suggestions:', error);
            } finally {
                setLoading(false);
            }
        };

        const debounceFetch = setTimeout(fetchSuggestions, 300);
        return () => clearTimeout(debounceFetch);
    }, [query]);

    // Function to handle clicking on a suggestion
    const handleSuggestionClick = (address: string) => {
        const formattedAddress = encodeURIComponent(address);
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${formattedAddress}`;
        window.open(googleMapsUrl, '_blank'); // Opens the location in a new tab
    };

    return (
        <div className="location-search">
            <input
                type="text"
                placeholder="Search location"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="p-2 border rounded w-full"
            />

            {loading && (
                <div className="loading-indicator text-gray-500 p-2">
                    Searching...
                </div>
            )}

            <ul className="suggestions-list mt-2 border rounded bg-white">
                {suggestions.map((suggestion, index) => (
                    <li
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion.address.label)}
                        className="p-2 border-b cursor-pointer hover:bg-gray-100"
                    >
                        {suggestion.title}
                    </li>
                ))}
            </ul>

            {!loading && query.length >= 3 && suggestions.length === 0 && (
                <div className="no-results text-gray-500 p-2">
                    No results found
                </div>
            )}
        </div>
    );
};

export default LocationSearch;

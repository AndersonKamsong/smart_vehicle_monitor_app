import React, { useState } from 'react'

export default function Service() {
    const [searchTerm, setSearchTerm] = useState('');
    const [modal, setModal] = useState(false);
  
    const toggleOpen = () => setModal(!modal);

    const filteredData = [].filter((item) => {
        const searchTextLower = searchTerm.toLowerCase(); // Ensure consistent casing
        return (
            item.title.toLowerCase().includes(searchTextLower)
        );
    });
    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase()); // Convert to lowercase for case-insensitive search
    };
    return (
        <>
            <hr />
            <h1 className='display-1'>Services</h1>
        </>
    )
}

import React, { useState } from 'react'
import Maps from './Map/Maps'
import { useLoaderData } from 'react-router-dom'

export default function Overview() {
    let loaderData = useLoaderData()
    console.log(loaderData);
    return (
        <div className="container-fluid">
            <Maps bracelets={loaderData.bracelets} />
        </div>
    )
}

export const getAllBracelet = async ({ params }) => {
    let response = await fetch(`${process.env.REACT_APP_API_URL}/bracelet/getAllBracelet`, {
        method: 'get',
        headers: {
            'content-type': 'application/json',
            'accept': 'applicaion/json',
            'access-control-origin': '*',
            'Authorization': `Bearer ${localStorage.getItem('easy_archives_token')}`
        },
    })
    if (!response.ok) {
        throw ("An error occur in get data")
    }
    return response.json()
}
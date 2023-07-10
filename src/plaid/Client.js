import React, { useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Link from './Link';
import { DataContext } from '../context/DataContext';

export default function Client() {
const { linkToken, setLinkToken } = useContext(AuthContext);
const { decodedToken } = useContext(DataContext);

useEffect(() => {
const generateLinkToken = async () => {
    const response = await fetch(`https://piggybank-api.onrender.com/api/create_link_token/${decodedToken._id}`, {
    // const response = await fetch(`http://localhost:8080/api/create_link_token/${decodedToken._id}`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    });

const data = await response.json();
console.log("Link completed successfully");
setLinkToken(data.link_token);
};

generateLinkToken();
}, []); // Empty dependency array to execute only once on component mount

return (
    <div>
    {linkToken !== null && <Link id = {decodedToken._id} />}
    </div>
);
}
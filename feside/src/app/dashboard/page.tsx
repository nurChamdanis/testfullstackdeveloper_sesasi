'use client';
import { Backend_URL } from "@/lib/Constants";
import axios from "axios";
import Link from "next/dist/client/link";
import React, { useEffect, useState } from "react";

interface Item {
  id: number;
  email: string;
  detail_type: string;
  type: string;
}

const DashboardPage = () => {
  const [data, setData] = useState<Item[]>([]); // State to store fetched data
  const [loading, setLoading] = useState(true); // St ate to handle loading state
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${Backend_URL}/user/all/0`); // Replace with your API endpoint
        setData(response.data); // Update state with the data
        console.log(response); 
        setLoading(false); // Update loading state
      } catch (error) { 
        setLoading(false); // Update loading state
      }
    };

    fetchData();
  }, []);
  
  return (
    <div>
      <h1>Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Name</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.email}</td>
              <td>{item.detail_type}</td>
              <td>{item.type}</td>
              <td>
                <Link href={`/dashboard/edit/${item.id}`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardPage;

 
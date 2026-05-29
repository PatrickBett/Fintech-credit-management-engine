import { createContext } from 'react';
import { useEffect, useState } from 'react';

export const AdminContext = createContext();

export const AdminProvider = ({children}) => {
    const [members, setMembers] = useState([]);

    // fetch members data
    useEffect(() =>{
        const fetchMembers = async () => {
            try {
                const res = await fetch("http://127.0.0.1:8000/api/members/");
                const data = await res.json();
                setMembers(data);
                console.log("Fetched members:", data);
            } catch (err) {
                console.error("Error fetching members:", err);
            }
        }

        fetchMembers();
    }, [])

    return (
        <AdminContext.Provider value={{ members, setMembers }}>
            {children}
        </AdminContext.Provider>
    )
}
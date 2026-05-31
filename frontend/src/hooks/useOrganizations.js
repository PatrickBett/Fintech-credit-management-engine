import { useQuery } from "@tanstack/react-query";
import api from '../api';

export const useOrganizations = () => {
    const fetchOrganizations = async () =>{
        const res = await api.get("")
        const data = await res.data()
        console.log("Fetched organizations", data)
        return data;
    }
    const { data, error, isLoading } = useQuery({queryKey: ["organizations"],queryFn: fetchOrganizations})
    return { organizations:data, error, isLoading };
}
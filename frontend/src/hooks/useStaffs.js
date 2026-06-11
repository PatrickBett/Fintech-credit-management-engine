import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api";

//fetch loanofficers
export const useLoanOfficers = () => {
    const fetchLoanOfficers = async () =>{
        const res = await api.get("http://127.0.0.1:8000/api/transactions/loanofficers/")
        const data = await res.data;
        return data;
    }
    const { data=[], isPending, error } = useQuery({
        queryKey: ['loanofficers'],
        queryFn: fetchLoanOfficers,
        staleTime: 5 * 60 * 1000, 
    })
    return { loanofficers: data, error, isPending }
}
//fetch creditofficers
export const useCreditOfficer = () => {
    const fetchCreditOfficer = async () =>{
        const res = await api.get("http://127.0.0.1:8000/api/transactions/creditofficers/")
        const data = await res.data;
        return data;
    }
    const { data=[], isPending, error } = useQuery({
        queryKey: ['creditofficers'],
        queryFn: fetchCreditOfficer,
        staleTime: 5 * 60 * 1000, 
    })
    return { creditofficers: data, error, isPending }
}
//fetch collectors
export const useCollectors = () => {
    const fetchCollectors = async () =>{
        const res = await api.get("http://127.0.0.1:8000/api/transactions/collectors/")
        const data = await res.data;
        return data;
    }
    const { data=[], isPending, error } = useQuery({
        queryKey: ['collectors'],
        queryFn: fetchCollectors,
        staleTime: 5 * 60 * 1000, 
    })
    return { collectors: data, error, isPending }
}
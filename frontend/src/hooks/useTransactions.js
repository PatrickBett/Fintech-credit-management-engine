import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import api from "../api";

// const queryClient = useQueryClient();

export const useTransactions = () => {

    const fetchTransactions = async () => {
        const res = await api.get("http://127.0.0.1:8000/api/transactions/");
        const data = res.data;
        return data;
    }

    const { data = [], isPending, error } = useQuery({
        queryKey: ["transactions"],
        queryFn: fetchTransactions,
        staleTime: 5 * 60 * 1000, // 5minutes
    });
    return { transactions: data, isPending, error }
}
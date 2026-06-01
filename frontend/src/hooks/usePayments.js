import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import api from "../api";

// const queryClient = useQueryClient();

export const usePayments = () => {

    const fetchPayments = async () => {
        const res = await api.get("http://127.0.0.1:8000/api/payments/");
        const data = res.data;
        return data;
    }

    const { data = [], isPending, error } = useQuery({
        queryKey: ["payments"],
        queryFn: fetchPayments,
        staleTime: 5 * 60 * 1000, // 5minutes
    });
    return { payments: data, isPending, error }
}
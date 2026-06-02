import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import api from "../api";

// const queryClient = useQueryClient();


// ...........PAYMENT ..........
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

//Create Payment
export const useAddPayment = () => {
    const queryClient = useQueryClient();
    const addPayment = async (paymentForData) => {
        const res = await api.post("http://127.0.0.1:8000/api/payments/", paymentForData);
        const data = await res.data;
        console.log("Payment added:", data);
        return data;
    }

    const { mutate, error, isPending } = useMutation({
        mutationFn: addPayment,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["payments"] });
        }
    })
    return { addPayment: mutate, error, isPending }
}
// ...........PAYEMENT METHODS..........

//fetch paymentmethods
export const usePaymentMethods = () => {
    const fetchPaymentMethods = async () => {
        const res = await api.get("http://127.0.0.1:8000/api/payments/payment-methods/");
        const data = await res.data;
        console.log("Fetched Payment Methods:", data);
        return data;
    }

    const { data = [], error, isPending } = useQuery({
        queryKey: ["payment-methods"],
        queryFn: fetchPaymentMethods,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
    return { paymentMethods: data, error, isPending };
}
//Create Payment Method
export const useAddPaymentMethod = () => {
    const queryClient = useQueryClient();
    const addPaymentMethod = async (paymentMethodData) => {
        const res = await api.post("http://127.0.0.1:8000/api/payments/payment-methods/", paymentMethodData);
        const data = await res.data;
        console.log("Payment Method added:", data);
        return data;
    }

    const { mutate, error, isPending } = useMutation({
        mutationFn: addPaymentMethod,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["payment-methods"] });
        }
    })
    return { addPaymentMethod: mutate, error, isPending }
}

// ...........PAYEMENT FOR..........
//fetch paymentfor

export const usePaymentFor = () => {
    const fetchPaymentFor = async () => {
        const res = await api.get("http://127.0.0.1:8000/api/payments/payment-fors/");
        const data = await res.data;
        console.log("Fetched Payment For:", data);
        return data;
    }

    const { data = [], error, isPending } = useQuery({
        queryKey: ["payment-fors"],
        queryFn: fetchPaymentFor,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
    return { paymentFors: data, error, isPending };
}
//Create Payment For
export const useAddPaymentFor = () => {
    const queryClient = useQueryClient();
    const addPaymentFor = async (paymentForData) => {
        const res = await api.post("http://127.0.0.1:8000/api/payments/payment-fors/", paymentForData);
        const data = await res.data;
        console.log("Payment For added:", data);
        return data;
    }

    const { mutate, error, isPending } = useMutation({
        mutationFn: addPaymentFor,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["payment-fors"] });
        }
    })
    return { addPaymentFor: mutate, error, isPending }
}




// ...........PAYEMENT STATUS..........
//fetch paymentstatus

export const usePaymentStatus = () => {
    const fetchPaymentStatus = async () => {
        const res = await api.get("http://127.0.0.1:8000/api/payments/payment-statuses/");
        const data = await res.data;
        console.log("Fetched Payment Status:", data);
        return data;
    }

    const { data = [], error, isPending } = useQuery({
        queryKey: ["payment-statuses"],
        queryFn: fetchPaymentStatus,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
    return { paymentStatuses: data, error, isPending };
}
//Create Payment Status
export const useAddPaymentStatus = () => {
    const queryClient = useQueryClient();
    const addPaymentStatus = async (paymentStatusData) => {
        const res = await api.post("http://127.0.0.1:8000/api/payments/payment-statuses/", paymentStatusData);
        const data = await res.data;
        console.log("Payment Status added:", data);
        return data;
    }

    const { mutate, error, isPending } = useMutation({
        mutationFn: addPaymentStatus,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["payment-statuses"] });
        }
    })
    return { addPaymentStatus: mutate, error, isPending }
}

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api";

//fetch employers
export const useEmployers = () => {
    const fetchEmployers = async () => {
        const res = await api.get("http://127.0.0.1:8000/api/employers/");
        const data = await res.data;
        console.log("Fetched Employers:", data);
        return data;
    }

    const { data = [], error, isPending } = useQuery({
        queryKey: ["employers"],
        queryFn: fetchEmployers,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
    return { employers: data, error, isPending };
}
//Create Employer
export const useAddEmployer = () => {
    const queryClient = useQueryClient();
    const addEmployer = async (employerData) => {
        const res = await api.post("http://127.0.0.1:8000/api/employers/", employerData);
        const data = await res.data;
        console.log("Employer added:", data);
        return data;
    }

        const { mutate, error, isPending} = useMutation({
            mutationFn: addEmployer,
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["employers"] });
            }
        })
        return { addEmployer: mutate, error, isPending}
    }

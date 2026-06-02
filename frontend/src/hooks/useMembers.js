import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api';

// fetch members
export const useMembers = () => {
    const fetchMembers = async () => {
        const res = await api.get('http://127.0.0.1:8000/api/members');
        const data = await res.data;
        console.log('Fetched members:', data);
        return data;
    }

    const { data=[], error, isPending } = useQuery({ 
        queryKey: ['members'], 
        queryFn: fetchMembers,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
    return { members: data, error, isPending };
}

//  add/post member
export const useAddMember = () => {
    const queryClient = useQueryClient();

    const addMember = async (memberData) => {
        const res = await api.post('http://127.0.0.1:8000/api/members/', memberData);
        const data = await res.data;
        console.log('Member added:', data);
        return data;
    }

    const { mutate, isPending, error }   = useMutation({ 
        mutationFn: addMember,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['members']})
        }
     });
    return { addMember: mutate,isPending, error };
}
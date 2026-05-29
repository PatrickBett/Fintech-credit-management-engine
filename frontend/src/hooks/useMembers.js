import { useQuery } from '@tanstack/react-query';
import api from '../api';
export const useMembers = () => {
    const fetchMembers = async () => {
        const res = await api.get('http://127.0.0.1:8000/api/members');
        const data = await res.data;
        console.log('Fetched members:', data);
        return data;
    }

    const { data, error, isLoading } = useQuery({ queryKey: ['members'], queryFn: fetchMembers });
    return { members: data, error, isLoading };
}
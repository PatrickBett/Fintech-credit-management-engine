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
            queryClient.invalidateQueries({
        queryKey: ["employers"],
      });
      queryClient.refetchQueries({
    queryKey: ["employers"],
  });
        }
     });
    return { addMember: mutate,isPending, error };
}

//fetch referees
export const useReferees = () =>{
    const fetchReferees = async() =>{
        const response = await api.get("http://127.0.0.1:8000/api/members/referees/")
        const data = response.data
        return data;
    }
    const { data=[], error, isPending } = useQuery({
        queryKey: ['referees'],
        queryFn: fetchReferees,
        staleTime: 5 * 60 * 1000, // 5 minutes
    })
    return { referees: data, isPending, error }
}
// add/post referee
export const useAddReferee = () => {
    const queryClient = useQueryClient();
    const addReferee = async (refereeData) => {
        try {
            const res = await api.post("http://127.0.0.1:8000/api/members/referees/", refereeData);
            const data = await res.data;
            console.log('Referee added:', data);
            return data;
        }
        catch (error) {

            console.error('Error adding referee:', error);
            console.log("Response:", error.response?.data);
            throw error; // Re-throw the error to be caught by useMutation's onError
        }
    }

    const { mutate, isPending, error } = useMutation({
        mutationFn: addReferee,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['referees'] });
        }
    });
    return { addReferee: mutate, isPending, error };
}
//UPDATE CUSTOMER STATUS
export const useUpdateMemberStatus = () => {
  const queryClient = useQueryClient();

  const updateStatus = async ({ id, status }) => {
    const res = await api.patch(
      `http://127.0.0.1:8000/api/members/${id}/update-status/`,
      { status }
    );
    return res.data;
  };

  return useMutation({
    mutationFn: updateStatus,
    onSuccess: () => {
      queryClient.invalidateQueries(["members"]);
    },
  });
};

//UPDATE CUSTOMER LIMIT
export const useUpdateMemberLimit = () => {
  const queryClient = useQueryClient();

  const updateLimit = async ({ id, limit }) => {
    const res = await api.patch(
      `http://127.0.0.1:8000/api/members/${id}/update-limit/`,
      { limit }
    );
    return res.data;
  };

  return useMutation({
    mutationFn: updateLimit,
    onSuccess: () => {
      queryClient.invalidateQueries(["members"]);
    },
  });
};
import React from 'react'
import {useMembers} from '../hooks/useMembers';

function Dashboard() {
  const { members, error, isLoading } = useMembers();

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error: {error.message}</div>
  }
  if (!members) {
    return <div>No members found</div>
  }
  return (
    <div>
  <h1>Dashboard</h1>

  {members?.length > 0 ? (
    members.map((member) => (
      <div key={member.id}>
        <h2>{member.name}</h2>
        <p>Email: {member.email}</p>
        <p>Phone: {member.primary_mobile}</p>
      </div>
    ))
  ) : (
    <p>No members found.</p>
  )}
</div>
  )
}

export default Dashboard

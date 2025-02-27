import React from "react";
import styled from "styled-components";

const UserListContainer = styled.div`
  width: 300px;
  border-right: 1px solid #ddd;
  padding: 10px;
`;

const UserCard = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  &:hover {
    background: #f9f9f9;
  }
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

function AdminUserList({ users, onSelectUser }) {
  // console.log(users);
  return (
    <UserListContainer>
      {users?.map((user) => (
        <UserCard key={user.id} onClick={() => onSelectUser(user)}>
          <Avatar
            src={user.profileImg || "https://via.placeholder.com/40"}
            alt="Profile"
          />
          <div>
            <div>
              <strong>{user.name}</strong>
            </div>
            <div>
              생년월일 : {user.birth} / {user.gender}
            </div>
          </div>
        </UserCard>
      ))}
    </UserListContainer>
  );
}

export default AdminUserList;

import React, { useEffect, useState } from "react";
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
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(
          "http://localhost:8927/api/photo/715bdc89-8865-42a3-aaf2-da310298b3fe_picture-city.jpg"
        );

        if (!response.ok) {
          throw new Error("이미지를 불러오지 못했습니다.");
        }

        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setImageSrc(imageUrl);
      } catch (error) {
        console.error("이미지 로드 오류:", error);
      }
    };

    fetchImage();
  }, []);
  return (
    <UserListContainer>
      {users?.map((user) => (
        <UserCard key={user.id} onClick={() => onSelectUser(user)}>
          <Avatar
            src={imageSrc /*|| "https://via.placeholder.com/40"*/}
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

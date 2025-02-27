import { useEffect, useState } from "react";
import styled from "styled-components";
import AdminFilter from "./AdminFilter";
import AdminUserList from "./AdminUserList";
import AdminUserModal from "./AdminUserModal";

const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
  max-width: 1300px; /* 최대 너비 제한 */
  width: 100%;
  margin: 0 auto; /* 화면 가운데 정렬 */
`;

const UserListArea = styled.div`
  flex: 0 0 300px; /* 유저 목록 영역의 고정 너비 */
  max-width: 300px; /* 최대 너비 설정 */
  padding: 20px;
  overflow-y: auto; /* 스크롤 처리 */
`;

const ContentArea = styled.div`
  flex: 1;
  padding: 20px;
  max-width: calc(
    100% - 320px
  ); /* UserList와 ContentArea의 크기 합이 100% 되도록 설정 */
  overflow-y: auto; /* 내용이 길어지면 스크롤 */
`;

const UserBoxContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* 5개씩 그리드로 배치 */
  gap: 20px;
  margin-top: 20px;
  @media (max-width: 1200px) {
    grid-template-columns: repeat(4, 1fr); /* 화면 크기가 작아지면 4개씩 */
  }
  @media (max-width: 900px) {
    grid-template-columns: repeat(3, 1fr); /* 화면 크기가 더 작아지면 3개씩 */
  }
  @media (max-width: 600px) {
    grid-template-columns: repeat(
      2,
      1fr
    ); /* 화면 크기가 600px 이하일 때 2개씩 */
  }
`;

const UserBox = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  background-color: #f9f9f9;
  cursor: pointer;
`;

const UserProfileImg = styled.div`
  width: 80px;
  height: 80px;
  background-color: #ddd;
  border-radius: 50%;
  margin: 0 auto 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UserName = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin: 5px 0;
`;

const UserInfo = styled.p`
  font-size: 14px;
  color: #666;
`;

function AdminDashboard({ users }) {
  const [selectedFilters, setSelectedFilters] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [infoState, setInfoState] = useState("user");
  // const [filterUser, setFilterUser] = useState({});

  // ✅ 필터링된 회원 목록 (추천 회원)
  const filteredUsers = users?.filter((user) =>
    Object.entries(selectedFilters).every(
      ([category, values]) =>
        values.length === 0 || values.includes(user[category])
    )
  );
  // useEffect(() => {
  //   // console.log(selectedFilters.job);
  //   getState();
  //   console.log(filterUser);
  // }, [selectedFilters]);

  // const getState = () => {
  //   let custom = [];
  //   if (selectedFilters.age?.includes("20대 초반")) {
  //     custom = users.filter(
  //       (user) =>
  //         2025 - user.birth.substr(0, 4) >= 20 &&
  //         2025 - user.birth.substr(0, 4) < 30
  //     );
  //     console.log(custom);
  //     setFilterUser({ ...custom });
  //   }
  // };

  // const toggle1 = () => {
  //   const filteredUsers = users?.filter((user) => {
  //     // const userDegree = degrees.find((degree) => degree.id === user.degreeId);
  //     const userCareer = careers.find((career) => career.user_id === user.id);
  //     if(selectedFilters == ) {

  //     }
  //   });
  // };

  return (
    <DashboardContainer>
      {/* 회원 목록은 필터에 영향을 받지 않음! */}
      <UserListArea>
        <AdminUserList users={users} onSelectUser={setSelectedUser} />
      </UserListArea>
      <ContentArea>
        {/* 필터 적용된 유저를 필터링된 회원 섹션에서만 사용 */}
        <AdminFilter
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />
        {/* <button onClick={() => toggle1()} /> */}

        {/* 필터링된 회원 목록 */}
        <div>
          <h3>🔍 추천 회원</h3>5
          {filteredUsers?.length > 0 ? (
            <UserBoxContainer>
              {filteredUsers.map((user) => (
                <UserBox key={user.id} onClick={() => setSelectedUser(user)}>
                  <UserProfileImg>
                    {user.profileImg ? (
                      <img
                        src={user.profileImg}
                        alt={user.name}
                        style={{
                          borderRadius: "50%",
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    ) : (
                      <span>📷</span>
                    )}
                  </UserProfileImg>
                  <UserName>{user.name}</UserName>
                  <UserInfo>
                    {user.gender} | {2025 - user.birth.substr(0, 4)}세
                  </UserInfo>
                </UserBox>
              ))}
            </UserBoxContainer>
          ) : (
            <p>조건에 맞는 회원이 없습니다.</p>
          )}
        </div>

        {/* 선택된 회원 상세 정보 모달 */}
        {selectedUser && (
          <AdminUserModal
            user={selectedUser}
            onClose={() => setSelectedUser(null)}
            infoState={infoState}
            setInfoState={setInfoState}
          />
        )}
      </ContentArea>
    </DashboardContainer>
  );
}

export default AdminDashboard;

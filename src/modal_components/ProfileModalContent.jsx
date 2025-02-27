import styled from "styled-components";
import InputField from "./InputField";
// import ContentBox from "../profile_components/ContentBox"
//import { useState } from "react";
import { useState, useEffect } from "react";

const Container = styled.div`
  width: 80%;
  margin-left: 47px;
  // margin-top: 20px !important; /* ✅ 강제 적용 */
`;

const Box = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  border-bottom: 1px solid #ddd; /* 얇은 선으로 구분 */
`;

const Title = styled.div`
  width: 25%;
  font-weight: bold;
  color: #333;
  margin-right: 30px;
`;

const Content = styled.div`
  width: 100%;
`;

const Writing = styled.input`
  width: 100%;
  border: none;
  outline: none;
  font-size: 1rem;
  padding: 5px;
  background: transparent;
  color: #555;
`;

function ProfileModalContent({ profile, handleChange }) {
  const [showDiseaseOptions, setShowDiseaseOptions] = useState(false);

  // ✅ '질병 있음' 선택 시 즉시 반영되도록 설정
  useEffect(() => {
    if (profile?.disease === "yes") {
      setShowDiseaseOptions(true);
    } else {
      setShowDiseaseOptions(false);
    }
  }, [profile.disease]);

  const handleDiseaseChange = (e) => {
    handleChange(e);
    // ✅ 상태 업데이트를 보장하기 위해 setTimeout 사용
    setTimeout(() => {
      setShowDiseaseOptions(e.target.value === "yes");
    }, 0);
  };

  const handleCheckboxChange = (event) => {
    const selectedValue = event.target.value;
    const currentValues = profile.disease || []; // ✅ undefined 방지

    if (currentValues.includes(selectedValue)) {
      handleChange({
        target: {
          name: "disease",
          value: currentValues.filter((v) => v !== selectedValue),
        },
      });
    } else {
      handleChange({
        target: {
          name: "disease",
          value: [...currentValues, selectedValue],
        },
      });
    }
  };

  const options = {
    military: [
      { label: "군필", value: "yes" },
      { label: "미군필", value: "no" },
    ],
    religion: [
      { label: "기독교", value: "christian" },
      { label: "불교", value: "buddhism" },
      { label: "천주교", value: "catholic" },
      { label: "힌두교", value: "hinduism" },
      { label: "무교", value: "none" },
      { label: "기타", value: "other" },
    ],
    marriage: [
      { label: "재혼", value: "married" },
      { label: "미혼", value: "single" },
    ],

    mbti: [
      { label: "ISTJ", value: "ISTJ" },
      { label: "ISFJ", value: "ISFJ" },
      { label: "INFJ", value: "INFJ" },
      { label: "INTJ", value: "INTJ" },
      { label: "ISTP", value: "ISTP" },
      { label: "ISFP", value: "ISFP" },
      { label: "INFP", value: "INFP" },
      { label: "INTP", value: "INTP" },
      { label: "ESTP", value: "ESTP" },
      { label: "ESFP", value: "ESFP" },
      { label: "ENFP", value: "ENFP" },
      { label: "ENTP", value: "ENTP" },
      { label: "ESFJ", value: "ESFJ" },
      { label: "ENFJ", value: "ENFJ" },
      { label: "ENTJ ", value: "ENTJ" },
    ],
    hobby: [
      { label: "운동", value: "exercise" },
      { label: "독서", value: "reading" },
      { label: "영화 감상", value: "movies" },
      { label: "음악 감상", value: "music" },
      { label: "여행", value: "travel" },
      { label: "요리", value: "cooking" },
      { label: "자원봉사", value: "volunteering" },
      { label: "사진 촬영", value: "photography" },
      { label: "낚시", value: "fishing" },
      { label: "등산", value: "hiking" },
      { label: "게임", value: "gaming" },
      { label: "자전거 타기", value: "cycling" },
      { label: "스포츠 관람", value: "sports_watching" },
      { label: "미술", value: "art" },
      { label: "패션", value: "fashion" },
      { label: "동물 돌보기", value: "pet_caring" },
      { label: "블로그 작성", value: "blogging" },
      { label: "댄스", value: "dancing" },
      { label: "테마파크 방문", value: "amusement_park" },
      { label: "운전", value: "driving" },
      { label: "고전 게임", value: "retro_gaming" },
      { label: "스키", value: "skiing" },
      { label: "보드게임", value: "board_games" },
      { label: "라이딩", value: "riding" },
      { label: "크라우드 펀딩", value: "crowdfunding" },
      { label: "요가", value: "yoga" },
    ],
  };

  return (
    <Container>
      <InputField
        title="몸무게"
        type="text"
        name="weight"
        value={profile.weight}
        onChange={handleChange}
      />
      <InputField
        title="키"
        type="text"
        name="height"
        value={profile.height}
        onChange={handleChange}
      />
      <InputField
        title="MBTI"
        type="select"
        name="mbti"
        value={profile.mbti}
        onChange={handleChange}
        options={options.mbti}
      />
      <InputField
        title="취미"
        type="checkbox"
        name="hobby"
        value={profile.hobby}
        onChange={handleChange}
        options={options.hobby}
      />
      <InputField
        title="군필여부"
        type="select"
        name="military"
        value={profile.military}
        onChange={handleChange}
        options={options.military}
      />
      <InputField
        title="종교"
        type="select"
        name="religion"
        value={profile.religion}
        onChange={handleChange}
        options={options.religion}
      />
      <InputField
        title="재산"
        type="text"
        name="wealth"
        value={profile.wealth}
        onChange={handleChange}
      />
      <InputField
        title="혼인 여부"
        type="select"
        name="marriage"
        value={profile.marriage}
        onChange={handleChange}
        options={options.marriage}
      />
      <InputField
        title="추가 질병 선택"
        type="checkbox"
        name="disease"
        value={profile.disease || []} // ✅ 기본값을 빈 배열로 설정
        onChange={handleChange}
        options={[
          { label: "심장병 유전", value: "심장병 유전" },
          { label: "고혈압", value: "고혈압" },
          { label: "당뇨병", value: "당뇨병" },
          { label: "심근경색 유전", value: "심근경색 유전" },
          { label: "암 가족력", value: "암 가족력" },
          { label: "간 질환", value: "간 질환" },
          { label: "신장 질환", value: "신장 질환" },
          { label: "질환 없음", value: "질환 없음" },
        ]}
      />

      {/* ✅ '질병 있음' 선택 시 추가 질병 리스트 표시 */}
      {/* {showDiseaseOptions && (
        <InputField 
          title="추가 질병 선택"
          type="checkbox"
          name="diseaseTypes"
          value={profile.diseaseTypes || []}  // ✅ 기본값을 빈 배열로 설정
          onChange={handleChange} 
          options={[
            { label: "심장병 유전", value: "heart_disease" },
            { label: "고혈압", value: "hypertension" },
            { label: "당뇨병", value: "diabetes" },
            { label: "심근경색 유전", value: "myocardial_infarction" },
            { label: "암 가족력", value: "cancer" },
            { label: "간 질환", value: "liver_disease" },
            { label: "신장 질환", value: "kidney_disease" }
          ]}
        />
      )} */}
    </Container>
  );
}

export default ProfileModalContent;

// function ProfileModalContent({ profile, handleChange }) {
//   return (
//     <Container>
//       <Box>
//         <Title>몸무게</Title>
//         <Content>
//           <Writing
//             type="text"
//             name="weight"
//             value={profile.weight}
//             onChange={handleChange}
//           />
//         </Content>
//       </Box>
//       <Box>
//         <Title>키</Title>
//         <Content>
//           <Writing
//             type="text"
//             name="height"
//             value={profile.height}
//             onChange={handleChange}
//           />
//         </Content>
//       </Box>
//       <Box>
//         <Title>mbti</Title>
//         <Content>
//           <Writing
//             type="text"
//             name="mbti"
//             value={profile.mbti}
//             onChange={handleChange}
//           />
//         </Content>
//       </Box>
//       <Box>
//         <Title>취미</Title>
//         <Content>
//           <Writing
//             type="text"
//             name="hobby"
//             value={profile.hobby}
//             onChange={handleChange}
//           />
//         </Content>
//       </Box>
//       <Box>
//         <Title>군필여부</Title>
//         <Content>
//           <Writing
//             type="text"
//             name="military"
//             value={profile.military}
//             onChange={handleChange}
//           />
//         </Content>
//       </Box>
//       <Box>
//         <Title>종교</Title>
//         <Content>
//           <Writing
//             type="text"
//             name="religion"
//             value={profile.religion}
//             onChange={handleChange}
//           />
//         </Content>
//       </Box>
//       <Box>
//         <Title>재산</Title>
//         <Content>
//           <Writing
//             type="text"
//             name="wealth"
//             value={profile.wealth}
//             onChange={handleChange}
//           />
//         </Content>
//       </Box>
//       <Box>
//         <Title>결혼여부</Title>
//         <Content>
//           <Writing
//             type="text"
//             name="marriage"
//             value={profile.marriage}
//             onChange={handleChange}
//           />
//         </Content>
//       </Box>
//       <Box>
//         <Title>질병여부</Title>
//         <Content>
//           <Writing
//             type="text"
//             name="disease"
//             value={profile.disease}
//             onChange={handleChange}
//           />
//         </Content>
//       </Box>
//     </Container>
//   );
// }

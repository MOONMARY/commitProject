import styled from "styled-components";

const Box = styled.div`
  width: 100%;
  // height: 3rem;
  height: auto;
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

  display: flex;
  align-items: center;
  //flex-wrap: wrap; /* 여러 개의 선택지가 있을 때 자동 줄 바꿈 */
  flex-direction: column;
  gap: 10px; /* 옵션 간격 */
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

const RadioContainer = styled.div`
  display: grid;
  //grid-template-columns: repeat(auto-fit, minmax(60px, 1fr)); /* ✅ 한 줄에 여러 개 배치 */
  grid-template-columns: repeat(3, 1fr); /* ✅ 한 줄에 3개씩 배치 */
  gap: 10px;
  width: 100%;
  // max-height: 150px; /* ✅ 높이 제한 (필요 시 제거 가능) */
  //overflow-y: auto; /* ✅ 선택지가 많을 경우 스크롤 */
  padding: 5px;
`;

const RadioLabel = styled.label`
display: inline-flex; /* 한 줄 정렬 유지 */
max-width: 500px; /* 최대 너비 설정 (필요에 따라 조정 가능) */
  display: flex;
  align-items: center;
  gap: 5px;
  white-space: nowrap; /* ✅ 줄바꿈 방지 */
`;

const RadioInput = styled.input`
  margin-right: 5px;
`;

const SelectBox = styled.select`
  width: 100%;
  font-size: 1rem;
  padding: 5px;
  // border: 1px solid #ddd;
 //  border-radius: 5px;
  background: #fff;
  color: #333;
  border: none;
`;

function InputField({ title, type, name, value, onChange, options }) {

   // ✅ 취미 & 추가 질병 체크박스 핸들러 (완벽하게 통합)
  const handleCheckboxChange = (event) => {
    const selectedValue = event.target.value;
    const currentValues = Array.isArray(value) ? value : [];

    // 값 추가 또는 제거
    const updatedValues = currentValues.includes(selectedValue)
      ? currentValues.filter((v) => v !== selectedValue) // 체크 해제
      : [...currentValues, selectedValue]; // 체크 추가

    console.log(`변경된 ${name}:`, updatedValues); // 값 확인

    onChange({ target: { name, value: updatedValues } });
  };


  return (
    <Box>
      <Title>{title}</Title>
      <Content>
        {/* ✅ MBTI, 군필여부, 종교, 혼인여부 → 셀렉트 박스로 변경 */}
        {["mbti", "military", "religion", "marriage"].includes(name) ? (
          <SelectBox name={name} value={value} onChange={onChange}>
            <option value="">선택하세요</option>
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </SelectBox>
        ) : ["hobby", "diseaseTypes"].includes(name) ? (
          // ✅ 취미 & 추가 질병 체크박스 (완벽 적용)
          <RadioContainer>
            {options?.map((option) => (
              <RadioLabel key={option.value}>
                <RadioInput
                  type="checkbox"
                  name={name}
                  value={option.value}
                  checked={Array.isArray(value) && value.includes(option.value)}
                  onChange={handleCheckboxChange} // ✅ 공통 핸들러 사용
                />
                {option.label}
              </RadioLabel>
            ))}
          </RadioContainer>

        
        ) : type === "radio" ? (
          // ✅ 일반 라디오 버튼 처리
          <RadioContainer>
            {options?.map((option) => (
              <RadioLabel key={option.value}>
                <RadioInput
                  type="radio"
                  name={name}
                  value={option.value}
                  checked={value === option.value}
                  onChange={onChange}
                />
                {option.label}
              </RadioLabel>
            ))}
          </RadioContainer>
        ) : (
          // ✅ 일반 텍스트 입력 필드
          <Writing type={type} name={name} value={value} onChange={onChange} />
        )}
      </Content>
    </Box>
  );
}



export default InputField;

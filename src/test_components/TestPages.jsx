import { useState } from "react";
import TestMain from "./TestMain";
import TestQuestion from "./TestQuestion";
import TestResult from "./TestResult";

function TestPages() {
  const [step, setStep] = useState("main");  // 📌 현재 진행 단계 ('main', 'question', 'result')
  const [score, setScore] = useState(0); // 점수 상태

  return (
    <>
      {step === "main" && <TestMain setStep={setStep} />}
      {step === "question" && <TestQuestion setStep={setStep} score={score} setScore={setScore} />}
      {step === "result" && <TestResult score={score} setStep={setStep} setScore={setScore} />}  {/* ✅ setScore 추가 */}
    </>
  );
}

export default TestPages;

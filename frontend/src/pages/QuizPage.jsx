import { useState } from "react";

import Header from "../components/common/Header";
import Button from "../components/common/Button";

const exampleQuestion = {
  question: "React에서 화면을 구성하는 재사용 가능한 단위를 무엇이라고 할까요?",
  options: ["클래스", "컴포넌트", "데이터베이스", "서버"],
  answer: "컴포넌트",
};

function QuizPage() {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [resultMessage, setResultMessage] = useState("");

  function handleSubmit() {
    if (selectedAnswer === "") {
      setResultMessage("정답을 선택해 주세요.");
      return;
    }

    if (selectedAnswer === exampleQuestion.answer) {
      setResultMessage("정답입니다!");
    } else {
      setResultMessage(`오답입니다. 정답은 ${exampleQuestion.answer}입니다.`);
    }
  }

  return (
    <div className="page">
      <Header />

      <main className="page-container">
        <h1 className="page-title">퀴즈</h1>

        <p className="page-description">
          AI가 생성한 문제를 풀며 학습 내용을 확인하세요.
        </p>

        <section className="empty-card">
          <h2>{exampleQuestion.question}</h2>

          <div
            style={{
              display: "grid",
              gap: "12px",
              maxWidth: "500px",
              margin: "30px auto",
              textAlign: "left",
            }}
          >
            {exampleQuestion.options.map((option) => (
              <label
                key={option}
                style={{
                  padding: "15px",
                  border: "1px solid #e2e8df",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                <input
                  type="radio"
                  name="quiz-answer"
                  value={option}
                  checked={selectedAnswer === option}
                  onChange={(event) =>
                    setSelectedAnswer(event.target.value)
                  }
                  style={{ marginRight: "10px" }}
                />

                {option}
              </label>
            ))}
          </div>

          <Button onClick={handleSubmit}>정답 확인</Button>

          {resultMessage && (
            <p
              style={{
                marginTop: "20px",
                color: "var(--color-primary)",
                fontWeight: "700",
              }}
            >
              {resultMessage}
            </p>
          )}
        </section>
      </main>
    </div>
  );
}

export default QuizPage;
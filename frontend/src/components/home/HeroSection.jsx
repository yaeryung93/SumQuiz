import { useNavigate } from "react-router";

import Button from "../common/Button";
import "./HeroSection.css";

function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="hero-section">
      <div className="hero-section__content">
        <p className="hero-section__eyebrow">AI 학습 도우미</p>

        <h1>
          공부할 자료를 올리면
          <br />
          <span>AI가 요약하고 퀴즈를 만들어요.</span>
        </h1>

        <p className="hero-section__description">
          PDF와 학습 자료를 업로드하고 핵심 요약부터 퀴즈와 학습 리포트까지 한
          번에 관리해 보세요.
        </p>

        <div className="hero-section__buttons">
          <Button onClick={() => navigate("/upload")}>학습 자료 업로드</Button>

          <Button variant="outline" onClick={() => navigate("/quiz")}>
            퀴즈 시작하기
          </Button>
        </div>
      </div>

      <div className="hero-section__visual">
        <div className="hero-section__document">
          <span className="hero-section__document-title">AI SUMMARY</span>

          <span className="hero-section__line" />
          <span className="hero-section__line" />
          <span className="hero-section__line hero-section__line--short" />

          <div className="hero-section__check">✓</div>
        </div>

        <div className="hero-section__quiz-card">
          <span>Q.</span>
          <strong>오늘의 퀴즈</strong>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;

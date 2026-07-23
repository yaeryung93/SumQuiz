import { BarChart3, Check, Code2 } from "lucide-react";
import { Link } from "react-router";

import LoginForm from "../components/login/LoginForm";
import "./LoginPage.css";

function LoginPage() {
  return (
    <div className="login-page">
      <header className="login-page__header">
        <Link className="login-page__logo" to="/" aria-label="HWV 프로젝트 소개로 이동">
          <img src="/images/hwv-logo-cutout.png" alt="HWV" />
        </Link>
      </header>

      <main className="login-page__main">
        <section className="login-page__introduction">
          <img className="login-page__intro-logo" src="/images/hwv-logo-cutout.png" alt="HWV" />
          <p className="login-page__eyebrow">Java Learning Platform</p>
          <h1>코드로 배우는<br />나만의 <span>Java</span> 학습</h1>
          <p className="login-page__description">
            HWV와 함께 더 깊이, 더 꾸준히 성장해요.
            <br />오늘의 학습이 내일의 실력이 됩니다.
          </p>

          <div className="login-page__learning-visual" aria-hidden="true">
            <div className="login-page__code-card">
              <Code2 />
              <span /><span /><span />
            </div>
            <div className="login-page__progress-card">
              <div><Check /><span /></div>
              <div><Check /><span /></div>
              <div className="login-page__progress-empty"><i /><span /></div>
              <section><BarChart3 /><p>학습 진행률<strong>72%</strong></p></section>
            </div>
          </div>
          <div className="login-page__decoration-dots" aria-hidden="true">{Array.from({ length: 9 }, (_, index) => <i key={index} />)}</div>
        </section>

        <LoginForm />
      </main>

      <footer className="login-page__footer">
        <div><a href="#terms">이용약관</a><span /><a href="#privacy">개인정보처리방침</a></div>
        <p>© 2026 HWV. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LoginPage;

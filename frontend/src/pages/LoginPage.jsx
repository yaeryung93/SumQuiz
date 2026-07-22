import LoginForm from "../components/login/LoginForm";

import "./LoginPage.css";

function LoginPage() {
  return (
    <div className="login-page">
      <main className="login-page__main">
        <section className="login-page__introduction">
          <div className="login-page__brand">
            <img src="/images/hwv-logo-cutout.png" alt="HWV" />
          </div>

          <div className="login-page__illustration" aria-hidden="true">
            <div className="login-page__laptop"><span>&lt;/&gt;</span></div>
            <div className="login-page__books"><i /><i /><i /></div>
            <div className="login-page__mug" />
            <span className="login-page__sparkle login-page__sparkle--one">✦</span>
            <span className="login-page__sparkle login-page__sparkle--two">✦</span>
          </div>
        </section>

        <section className="login-page__form-area">
          <LoginForm />
        </section>
      </main>
    </div>
  );
}

export default LoginPage;

import { useEffect, useState } from "react";

import { getLearningStatistics } from "../../services/problemApi";
import "./LabPages.css";

function StatisticsPage() {
  const [statistics, setStatistics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;

    getLearningStatistics().then((result) => {
      if (active) {
        setStatistics(result);
      }
    }).catch((error) => { if (active) setErrorMessage(error.message); })
      .finally(() => { if (active) setIsLoading(false); });

    return () => {
      active = false;
    };
  }, [reloadKey]);

  function handleReload() {
    setIsLoading(true);
    setErrorMessage("");
    setReloadKey((value) => value + 1);
  }

  const correctAnswers = statistics?.correctAnswers ?? 0;
  const incorrectAnswers = statistics?.incorrectAnswers ?? 0;
  const answerCount = correctAnswers + incorrectAnswers;
  const accuracy =
    statistics?.accuracy ??
    (answerCount ? Math.round((correctAnswers / answerCount) * 100) : 0);
  const weekDays = ["월", "화", "수", "목", "금", "토", "일"];
  const weeklyAttempts = Array.from(
    { length: 7 },
    (_, index) => statistics?.weeklyAttempts?.[index] ?? 0,
  );
  const weeklyMaximum = Math.max(...weeklyAttempts, 1);
  const weeklyPoints = weeklyAttempts.map((value, index) => ({
    day: weekDays[index],
    value,
    x: 60 + index * 180,
    y: 130 - (value / weeklyMaximum) * 95,
  }));
  const weeklyPolyline = weeklyPoints.map((point) => `${point.x},${point.y}`).join(" ");

  if (isLoading) {
    return <div className="lab-page"><section className="large-empty">학습 통계를 불러오고 있습니다.</section></div>;
  }

  if (errorMessage && !statistics) {
    return (
      <div className="lab-page"><section className="large-empty">
        <strong>학습 통계를 불러오지 못했습니다.</strong><span>{errorMessage}</span>
        <button type="button" className="lab-primary-link" onClick={handleReload}>다시 불러오기</button>
      </section></div>
    );
  }

  return (
    <div className="lab-page">
      <div className="lab-page__heading">
        <div>
          <span className="lab-page__eyebrow">HWV CODE LAB</span>
          <h1>학습 통계</h1>
          <p>AI 코딩 문제 생성과 예상 테스트 통과 기록을 확인하세요.</p>
        </div>
      </div>

      <section className="metric-grid statistics-metrics">
        <article className="metric-card">
          <span>생성된 문제</span>
          <strong>
            {statistics?.generatedProblems ?? 0}<small>개</small>
          </strong>
        </article>
        <article className="metric-card">
          <span>AI 예상 성공</span>
          <strong>
            {correctAnswers}<small>개</small>
          </strong>
        </article>
        <article className="metric-card">
          <span>보완 필요</span>
          <strong>
            {incorrectAnswers}<small>개</small>
          </strong>
        </article>
      </section>

      <div className="statistics-grid">
        <section className="surface-card accuracy-card">
          <h2>전체 AI 예상 통과율</h2>
          <div
            className="accuracy-ring"
            style={{
              "--accuracy": accuracy * 3.6 + "deg",
            }}
          >
            <div>
              <strong>{accuracy}%</strong>
              <span>정답률</span>
            </div>
          </div>
          <p>AI 코드 검토 {answerCount}회 기준</p>
        </section>

        <section className="surface-card category-chart">
          <h2>문법별 예상 통과율</h2>
          {statistics?.categoryAccuracy?.length ? (
            <div>
              {statistics.categoryAccuracy.map((item) => (
              <article key={item.name}>
                <span>{item.name}</span>
                <div>
                  <b style={{ width: item.value + "%" }} />
                </div>
                <strong>{item.value}%</strong>
              </article>
              ))}
            </div>
          ) : (
            <div className="compact-empty">
              문제를 풀면 문법별 정답률이 표시됩니다.
            </div>
          )}
        </section>

        <section className="surface-card weekly-chart">
          <h2>최근 7일 제출</h2>
          <div className="weekly-chart__line">
            <svg
              viewBox="0 0 1200 180"
              role="img"
              aria-label={`최근 7일 제출 횟수: ${weeklyAttempts.join(", ")}`}
            >
              {[35, 82, 130].map((y) => (
                <line className="weekly-chart__grid-line" x1="60" x2="1140" y1={y} y2={y} key={y} />
              ))}
              <polyline className="weekly-chart__polyline" points={weeklyPolyline} />
              {weeklyPoints.map((point) => (
                <g key={point.day}>
                  <circle className="weekly-chart__point-halo" cx={point.x} cy={point.y} r="7" />
                  <circle className="weekly-chart__point" cx={point.x} cy={point.y} r="4" />
                  <text className="weekly-chart__value" x={point.x} y={Math.max(17, point.y - 13)}>
                    {point.value}
                  </text>
                  <text className="weekly-chart__day" x={point.x} y="168">{point.day}</text>
                </g>
              ))}
            </svg>
          </div>
        </section>
      </div>
    </div>
  );
}

export default StatisticsPage;

import Header from "../components/common/Header";

const reportItems = [
  {
    id: 1,
    title: "학습한 자료",
    value: "3개",
  },
  {
    id: 2,
    title: "푼 문제",
    value: "24문제",
  },
  {
    id: 3,
    title: "정답률",
    value: "79%",
  },
];

function ReportPage() {
  return (
    <div className="page">
      <Header />

      <main className="page-container">
        <h1 className="page-title">학습 리포트</h1>

        <p className="page-description">
          지금까지의 학습 기록과 퀴즈 결과를 확인하세요.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "18px",
            marginTop: "30px",
          }}
        >
          {reportItems.map((item) => (
            <article
              key={item.id}
              style={{
                padding: "30px",
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8df",
                borderRadius: "14px",
              }}
            >
              <p
                style={{
                  marginBottom: "12px",
                  color: "#777777",
                }}
              >
                {item.title}
              </p>

              <strong
                style={{
                  color: "var(--color-primary)",
                  fontSize: "30px",
                }}
              >
                {item.value}
              </strong>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}

export default ReportPage;
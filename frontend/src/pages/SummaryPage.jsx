import Header from "../components/common/Header";

function SummaryPage() {
  return (
    <div className="page">
      <Header />

      <main className="page-container">
        <h1 className="page-title">AI 요약</h1>

        <p className="page-description">
          업로드한 자료의 핵심 내용을 AI가 정리합니다.
        </p>

        <section className="empty-card">
          <h2>아직 요약된 자료가 없습니다.</h2>

          <p>
            학습 자료를 업로드하면 이곳에서 AI 요약 결과를
            확인할 수 있습니다.
          </p>
        </section>
      </main>
    </div>
  );
}

export default SummaryPage;
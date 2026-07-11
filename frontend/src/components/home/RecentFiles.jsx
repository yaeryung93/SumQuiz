import { useNavigate } from "react-router";

import "./RecentFiles.css";

const recentFiles = [
  {
    id: 1,
    name: "인공지능 입문.pdf",
    date: "2026.07.11",
    progress: 80,
    status: "요약 완료",
  },
  {
    id: 2,
    name: "자바 클래스 정리.pdf",
    date: "2026.07.10",
    progress: 55,
    status: "퀴즈 진행 중",
  },
  {
    id: 3,
    name: "React 기초 학습자료.pdf",
    date: "2026.07.09",
    progress: 25,
    status: "학습 중",
  },
];

function RecentFiles() {
  const navigate = useNavigate();

  return (
    <section className="recent-files">
      <div className="recent-files__heading">
        <div>
          <h2>최근 학습 자료</h2>
          <p>최근에 공부한 자료를 이어서 학습하세요.</p>
        </div>

        <button type="button" onClick={() => navigate("/summary")}>
          전체 보기
        </button>
      </div>

      <div className="recent-files__list">
        {recentFiles.map((file) => (
          <article className="recent-files__item" key={file.id}>
            <div className="recent-files__file-icon">PDF</div>

            <div className="recent-files__information">
              <div className="recent-files__title-row">
                <h3>{file.name}</h3>
                <span>{file.status}</span>
              </div>

              <p>{file.date}</p>

              <div className="recent-files__progress-row">
                <div className="recent-files__progress">
                  <span style={{ width: `${file.progress}%` }} />
                </div>

                <strong>{file.progress}%</strong>
              </div>
            </div>

            <button
              className="recent-files__continue"
              type="button"
              onClick={() => navigate("/summary")}
            >
              이어서 학습
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default RecentFiles;

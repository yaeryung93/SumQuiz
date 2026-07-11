import { useState } from "react";

import Header from "../components/common/Header";
import Button from "../components/common/Button";

function UploadPage() {
  const [selectedFile, setSelectedFile] = useState(null);

  function handleFileChange(event) {
    const file = event.target.files[0];

    if (file) {
      setSelectedFile(file);
    }
  }

  function handleUpload() {
    if (!selectedFile) {
      alert("먼저 파일을 선택해 주세요.");
      return;
    }

    console.log("업로드할 파일:", selectedFile);
    alert(`${selectedFile.name} 파일이 선택되었습니다.`);
  }

  return (
    <div className="page">
      <Header />

      <main className="page-container">
        <h1 className="page-title">학습 자료 업로드</h1>

        <p className="page-description">
          요약하고 퀴즈로 만들 학습 자료를 선택하세요.
        </p>

        <section className="empty-card">
          <h2>파일 선택</h2>
          <p>현재는 PDF 파일 선택 화면을 만드는 단계입니다.</p>

          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            style={{ margin: "25px 0" }}
          />

          {selectedFile && (
            <p style={{ marginBottom: "20px" }}>
              선택된 파일: {selectedFile.name}
            </p>
          )}

          <Button onClick={handleUpload}>업로드하기</Button>
        </section>
      </main>
    </div>
  );
}

export default UploadPage;
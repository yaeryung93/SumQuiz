const SCREENS = [
  { id: 1, name: "홈", nav: "home" },
  { id: 2, name: "업로드 화면", nav: "upload" },
  { id: 3, name: "AI 로딩 화면", nav: "upload" },
  { id: 4, name: "AI 요약 화면", nav: "upload" },
  { id: 5, name: "퀴즈 시작", nav: "quiz" },
  { id: 6, name: "퀴즈 풀이", nav: "quiz" },
  { id: 7, name: "정답 및 해설", nav: "quiz" },
  { id: 8, name: "학습 분석 리포트", nav: "report" },
  { id: 9, name: "오답노트", nav: "report" },
  { id: 10, name: "이전 학습 기록", nav: "profile" },
  { id: 11, name: "새 학습 연결", nav: "profile" },
  { id: 12, name: "플래시카드", nav: "quiz" },
];

let current = 1;

const viewport = document.getElementById("screenViewport");
const screenNav = document.getElementById("screenNav");
const screenLbl = document.getElementById("screenLabel");
const bottomNav = document.getElementById("bottomNav");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

// 좌측 화면 목록 렌더
function buildSideNav() {
  screenNav.innerHTML = "";
  SCREENS.forEach((s) => {
    const btn = document.createElement("button");
    btn.innerHTML = `<span class="num">${s.id}</span><span>${s.name}</span>`;
    btn.dataset.id = s.id;
    btn.addEventListener("click", () => goTo(s.id));
    screenNav.appendChild(btn);
  });
}

function renderSideNavActive() {
  [...screenNav.children].forEach((btn) => {
    btn.classList.toggle("active", Number(btn.dataset.id) === current);
  });
}

function renderBottomNavActive() {
  const meta = SCREENS.find((s) => s.id === current);
  [...bottomNav.children].forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.icon === meta.nav);
  });
}

function renderScreen() {
  const tpl = document.getElementById(`tpl-${current}`);
  viewport.innerHTML = "";
  viewport.appendChild(tpl.content.cloneNode(true));
  viewport.scrollTop = 0;

  const meta = SCREENS.find((s) => s.id === current);
  screenLbl.textContent = `${current} / ${SCREENS.length} · ${meta.name}`;

  renderSideNavActive();
  renderBottomNavActive();
  wireInteractions();
}

function goTo(id) {
  current = ((id - 1 + SCREENS.length) % SCREENS.length) + 1;
  renderScreen();
}

prevBtn.addEventListener("click", () => goTo(current - 1));
nextBtn.addEventListener("click", () => goTo(current + 1));

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") goTo(current + 1);
  if (e.key === "ArrowLeft") goTo(current - 1);
});

bottomNav.addEventListener("click", (e) => {
  const btn = e.target.closest(".nav-item");
  if (!btn) return;
  const target = SCREENS.find((s) => s.nav === btn.dataset.icon);
  if (target) goTo(target.id);
});

// 화면별 내부 인터랙션 (버튼 선택, 카드 뒤집기 등)
function wireInteractions() {
  // 화면 넘김 버튼(다음 문제/시작/보기 등)은 전체 흐름을 따라 다음 화면으로 이동
  viewport.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", () => goTo(current + 1));
  });

  // pill / opt-btn 토글 (단일 선택 그룹)
  viewport.querySelectorAll(".tab-pill-row, .option-row").forEach((group) => {
    group.addEventListener("click", (e) => {
      const target = e.target.closest("button");
      if (!target) return;
      [...group.children].forEach((c) => c.classList.remove("active"));
      target.classList.add("active");
    });
  });

  // 퀴즈 풀이: 답 선택 (단일 선택, 화면 전환 없음)
  viewport.querySelectorAll(".answer-opt").forEach((opt) => {
    opt.addEventListener("click", () => {
      viewport
        .querySelectorAll(".answer-opt")
        .forEach((o) => o.classList.remove("selected"));
      opt.classList.add("selected");
    });
  });

  // 플래시카드 뒤집기
  const flashcard = viewport.querySelector("#flashcard");
  if (flashcard) {
    flashcard.addEventListener("click", () =>
      flashcard.classList.toggle("flipped"),
    );
  }
  // 플래시카드 이전/다음 버튼은 카드 뒤집기/화면 전환을 막고 카운터만 갱신(간단 데모)
  viewport.querySelectorAll(".nav-circle").forEach((btn) => {
    btn.addEventListener("click", (e) => e.stopPropagation());
  });
}

buildSideNav();
renderScreen();

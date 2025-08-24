// --- 多言語対応機能 ---

// 1. 各言語の翻訳テキストを準備
const translations = {
    // 英語
    en: {
        "nav-logo": "IROHA. Genou",
        "hero-title": "Toward a new global society.",
        "hero-subtitle": "Aiming to bring joy to the world.",
        "hero-button": "Learn More",
        "games-title": "Content title to be published",
        "game1-title": "Genshin Impact",
        "game1-desc": "Explore an open world freely and enjoy exhilarating battles using the elements.",
        "game2-title": "Honkai: Star Rail",
        "game2-desc": "Embark on a grand adventure across the galaxy. Journey through the stars with unique companions.",
        "game3-title": "Zenless Zone Zero",
        "game3-desc": "Live a double life in a disaster-stricken city. Its high-speed action is captivating.",
        "game4-title": "Minecraft",
        "game4-desc": "Explore the infinite possibilities of creativity and survival in a world made of blocks.",
        "game-link": "Official Site",
        "profile-title": "All social IDs are @aruiroha0718.",
        "profile-desc": "My goal is to build global relationships with more people around the world through a variety of content, and I will continue to publish a lot of content."
    },
    // 日本語
    ja: {
        "nav-logo": "幻櫻いろは",
        "hero-title": "新たなグローバル社会へ。",
        "hero-subtitle": "世界中に喜びを届けることを目指して。",
        "hero-button": "更に詳しく",
        "games-title": "公開予定のコンテンツ",
        "game1-title": "原神",
        "game1-desc": "オープンワールドを自由に探索し、元素を操る爽快なバトルを楽しもう。",
        "game2-title": "崩壊：スターレイル",
        "game2-desc": "銀河を巡る壮大な冒険へ。個性的な仲間たちと共に星々を駆け抜けよう。",
        "game3-title": "ゼンレスゾーンゼロ",
        "game3-desc": "災害に見舞われた都市で二重生活を。ハイスピードなアクションが魅力。",
        "game4-title": "マインクラフト",
        "game4-desc": "ブロックで構成された世界で、創造とサバイバルの無限の可能性を探求しよう。",
        "game-link": "公式サイトへ",
        "profile-title": "全てのSNS IDは @aruiroha0718 です。",
        "profile-desc": "様々なコンテンツを通じて、より多くの世界中の人々とグローバルな関係を築くことを目標とし、これからもたくさんのコンテンツを公開していきます。"
    },
    // 韓国語
    ko: {
        "nav-logo": "겐오 이로하",
        "hero-title": "새로운 글로벌 사회를 향하여.",
        "hero-subtitle": "세상에 즐거움을 선사하는 것을 목표로.",
        "hero-button": "더 알아보기",
        "games-title": "공개 예정 콘텐츠",
        "game1-title": "원신",
        "game1-desc": "오픈 월드를 자유롭게 탐험하고 원소를 이용한 상쾌한 전투를 즐겨보세요.",
        "game2-title": "붕괴: 스타레일",
        "game2-desc": "은하계를 가로지르는 장대한 모험을 떠나보세요. 개성 넘치는 동료들과 함께 별들을 누비세요.",
        "game3-title": "젠레스 존 제로",
        "game3-desc": "재해로 무너진 도시에서 이중생활을. 하이스피드 액션이 매력적입니다.",
        "game4-title": "마인크래프트",
        "game4-desc": "블록으로 이루어진 세계에서 창의와 생존의 무한한 가능성을 탐험하세요.",
        "game-link": "공식 사이트",
        "profile-title": "모든 소셜 ID는 @aruiroha0718 입니다.",
        "profile-desc": "다양한 콘텐츠를 통해 더 많은 세계인들과 글로벌한 관계를 구축하는 것을 목표로, 앞으로도 많은 콘텐츠를 공개할 예정입니다."
    }
};

// 2. ページが読み込まれたときに言語を設定する処理
document.addEventListener('DOMContentLoaded', () => {
    const userLang = navigator.language.slice(0, 2);
    const langData = translations[userLang] || translations.en;
    const elements = document.querySelectorAll('[data-key]');
    elements.forEach(element => {
        const key = element.getAttribute('data-key');
        if (langData[key]) {
            element.textContent = langData[key];
        }
    });
});


// --- スクロールアニメーション ---
const targets = document.querySelectorAll('.fade-in-target');
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
});
targets.forEach(target => {
    observer.observe(target);
});


// --- スムーズスクロール ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

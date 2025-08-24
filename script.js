// --- 多言語対応機能 ---
const translations = {
    en: {
        "nav-logo": "IROHA. Genou", "nav-social": "Social Media", "hero-title": "Toward a new global society.", "hero-subtitle": "Aiming to bring joy to the world.", "hero-button": "Learn More",
        "games-title": "Content title to be published",
        "game1-title": "Genshin Impact", "game2-title": "Honkai: Star Rail", "game3-title": "Zenless Zone Zero", "game4-title": "Minecraft",
        "game5-title": "Wuthering Waves", // NEW
        "game6-title": "Neverness To Everness", // NEW
        "profile-title": "All social IDs are @aruiroha0718.", "profile-desc": "My goal is to build global relationships..."
    },
    ja: {
        "nav-logo": "幻櫻いろは", "nav-social": "ソーシャルメディア", "hero-title": "新たなグローバル社会へ。", "hero-subtitle": "世界中に喜びを届けることを目指して。", "hero-button": "更に詳しく",
        "games-title": "公開予定のコンテンツ",
        "game1-title": "原神", "game2-title": "崩壊：スターレイル", "game3-title": "ゼンレスゾーンゼロ", "game4-title": "マインクラフト",
        "game5-title": "鳴潮 (Wuthering Waves)", // NEW
        "game6-title": "ネヴァネス・トゥ・エヴァネス", // NEW
        "profile-title": "全てのSNS IDは @aruiroha0718 です。", "profile-desc": "様々なコンテンツを通じて..."
    },
    ko: {
        "nav-logo": "겐오 이로하", "nav-social": "소셜 미디어", "hero-title": "새로운 글로벌 사회를 향하여.", "hero-subtitle": "세상에 즐거움을 선사하는 것을 목표로.", "hero-button": "더 알아보기",
        "games-title": "공개 예정 콘텐츠",
        "game1-title": "원신", "game2-title": "붕괴: 스타레일", "game3-title": "젠레스 존 제로", "game4-title": "마인크래프트",
        "game5-title": "명조: 워더링 웨이브", // NEW
        "game6-title": "네버니스 투 에버니스", // NEW
        "profile-title": "모든 소셜 ID는 @aruiroha0718 입니다.", "profile-desc": "다양한 콘텐츠를 통해..."
    }
};

document.addEventListener('DOMContentLoaded', () => { /* ... (言語設定処理は変更なし) ... */ });

// --- スクロールアニメーション ---
const targets = document.querySelectorAll('.fade-in-target');
const observer = new IntersectionObserver((entries, observer) => { /* ... (変更なし) ... */ });
targets.forEach(target => { observer.observe(target); });

// --- スムーズスクロール & コンテンツ表示/自動非表示 ---
let hideTimer; // タイマーを管理する変数を宣言
const learnMoreButton = document.querySelector('a[href="#games-section"]');

learnMoreButton.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
        // もしタイマーが作動中なら、それをキャンセルする
        clearTimeout(hideTimer);

        // 1. 対象のセクションを表示する
        targetElement.classList.remove('hidden');

        // 2. 表示したセクションへスムーズにスクロールする
        targetElement.scrollIntoView({
            behavior: 'smooth'
        });

        // 3. 【NEW】15秒後にセクションを再び非表示にするタイマーを設定
        hideTimer = setTimeout(() => {
            targetElement.classList.add('hidden');
        }, 15000); // 15000ミリ秒 = 15秒
    }
});

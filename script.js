// --- 多言語対応機能 ---
const translations = {
    // ... (翻訳データは変更なしのため省略)
};
document.addEventListener('DOMContentLoaded', () => { /* ... (言語設定処理も変更なし) */ });


// --- スクロールアニメーション ---
const targets = document.querySelectorAll('.fade-in-target');
const observer = new IntersectionObserver((entries, observer) => { /* ... (変更なし) */ });
targets.forEach(target => { observer.observe(target); });


// --- スムーズスクロール & コンテンツ表示 ---
// "Learn More"ボタン（hrefが#で始まるリンク）に適用
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            // 1. 対象のセクションを表示する
            targetElement.classList.remove('hidden');

            // 2. 表示したセクションへスムーズにスクロールする
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});


// --- 【NEW】モーダル機能 ---
const modal = document.getElementById('modal');
const modalCloseButton = document.getElementById('modal-close-button');
const socialCards = document.querySelectorAll('.social-card');

// 各SNSカードにクリックイベントを設定
socialCards.forEach(card => {
    card.addEventListener('click', () => {
        // カードから情報を取得
        const platform = card.dataset.platform;
        const url = card.dataset.url;

        // モーダルの内容を更新
        document.getElementById('modal-platform-name').textContent = platform;
        const modalUrlElement = document.getElementById('modal-url');
        modalUrlElement.href = url;
        modalUrlElement.textContent = url;

        // モーダルを表示
        modal.classList.add('visible');
    });
});

// モーダルを閉じる関数
function closeModal() {
    modal.classList.remove('visible');
}

// 閉じるボタンがクリックされたらモーダルを閉じる
modalCloseButton.addEventListener('click', closeModal);

// 背景のオーバーレイがクリックされたらモーダルを閉じる
modal.addEventListener('click', (e) => {
    // クリックされたのが背景（modal-overlay自身）の場合のみ閉じる
    if (e.target === modal) {
        closeModal();
    }
});

// script.js

document.addEventListener('DOMContentLoaded', () => {
    // ページ上のすべての .link-card要素を取得します
    const cards = document.querySelectorAll('.link-card');

    // 取得した各カードに対して処理を追加します
    cards.forEach(card => {
        // カードがクリックされたときの処理
        card.addEventListener('click', (event) => {
            // 例外：Messengerカードのボタンなど、特定の内部要素がクリックされた場合は何もしない
            if (event.target.closest('#messenger-info-content')) {
                return;
            }
            // クリックされたカードの "active" クラスを切り替えます
            card.classList.toggle('active');
        });
    });

    // --- Messengerカードの特別な処理 ---
    const messengerCard = document.getElementById('messenger-card');
    const messengerDoneBtn = document.getElementById('messenger-done-btn');
    const messengerInitialView = document.getElementById('messenger-initial-view');
    const messengerDetails = document.getElementById('messenger-details');

    // Messengerカードは最初から開いた状態にします
    if (messengerCard) {
        messengerCard.classList.add('active');
    }
    
    // "Done"ボタンがクリックされた時の処理
    if (messengerDoneBtn) {
        messengerDoneBtn.addEventListener('click', (event) => {
            event.stopPropagation(); // カードが閉じてしまうのを防ぐ
            messengerInitialView.style.display = 'none';
            messengerDetails.style.display = 'block';
        });
    }
});

// アニメーションを適用したい要素をすべて取得
const targets = document.querySelectorAll('.fade-in-target');

// 要素が画面内に入ったかどうかを判定するIntersection Observerを作成
const observer = new IntersectionObserver((entries, observer) => {
    // 監視している各要素に対して処理を実行
    entries.forEach(entry => {
        // isIntersectingプロパティがtrueなら、要素が画面内に入ったと判断
        if (entry.isIntersecting) {
            // visibleクラスを追加してアニメーションを発火
            entry.target.classList.add('visible');
            // 一度表示されたら、その要素の監視を停止してパフォーマンスを向上
            observer.unobserve(entry.target);
        }
    });
});

// 取得したすべての要素に対して監視を開始
targets.forEach(target => {
    observer.observe(target);
});

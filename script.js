/* 基本的なスタイルリセットとフォント設定 */
body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    background-color: #fff;
    color: #1d1d1f;
    -webkit-font-smoothing: antialiased;
}

a {
    text-decoration: none;
    color: #06c;
}

/* ヘッダー */
header {
    background-color: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(20px);
    padding: 0 20px;
    position: sticky;
    top: 0;
    z-index: 100;
}

header nav ul {
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
    height: 44px;
    gap: 16px;
}

header nav ul li a {
    color: #1d1d1f;
    font-size: 12px;
}

.nav-logo {
    font-weight: bold;
    font-size: 16px;
}

/* メインコンテンツ */
main {
    text-align: center;
}

/* ヒーローセクション */
.hero {
    padding: 100px 20px;
}

.hero h1 {
    font-size: 56px;
    margin-bottom: 10px;
}

.hero h2 {
    font-size: 28px;
    font-weight: 400;
    margin-bottom: 30px;
}

/* ボタンの共通スタイル */
.button {
    background-color: #0071e3;
    color: #fff;
    padding: 12px 22px;
    border-radius: 980px;
    font-size: 17px;
    display: inline-block;
    transition: filter 0.3s ease;
}

.button:hover {
    filter: brightness(1.15);
}

/* ゲームグリッドセクション */
.games-grid {
    padding: 60px 20px;
    background-color: #f5f5f7;
}

.games-grid .section-title {
    font-size: 40px;
    margin-bottom: 40px;
}

.grid-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    max-width: 1000px;
    margin: 0 auto;
}

.game-card {
    background-color: #fff;
    border-radius: 18px;
    padding: 30px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.game-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.game-card img {
    max-width: 100%;
    border-radius: 10px;
    margin-bottom: 20px;
}

.game-card h3 {
    font-size: 24px;
    margin-bottom: 10px;
}

.game-card p {
    color: #6e6e73;
    font-size: 16px;
    line-height: 1.5;
    margin-bottom: 20px;
}

/* 自己紹介セクション */
.profile-section {
    background-color: #000;
    color: #fff;
    padding: 80px 20px;
}

.profile-section h2 {
    font-size: 40px;
    color: #f5f5f7;
}

.profile-section p {
    color: #a1a1a6;
    max-width: 600px;
    margin: 0 auto;
    font-size: 18px;
    line-height: 1.6;
}

/* アニメーションとユーティリティ */
.fade-in-target {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.fade-in-target.visible {
    opacity: 1;
    transform: translateY(0);
}

.hidden {
    display: none;
}

/* スマホ表示の調整 */
@media (max-width: 768px) {
    .grid-container {
        grid-template-columns: 1fr;
    }

    .games-grid .section-title,
    .profile-section h2 {
        font-size: 32px;
    }
}

/* フッター */
footer {
    background-color: #f5f5f7;
    padding: 40px 20px;
    text-align: center;
    font-size: 12px;
    color: #6e6e73;
}

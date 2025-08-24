/* 基本的なスタイルリセットとフォント設定 */
body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    background-color: #fff; /* ライトモードの背景色 */
    color: #1d1d1f; /* 基本的な文字色 */
    -webkit-font-smoothing: antialiased; /* 文字を滑らかに表示 */
}

a {
    text-decoration: none;
    color: #06c;
}

/* ヘッダー */
header {
    background-color: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(20px); /* すりガラス効果 */
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
}

header nav ul li {
    padding: 0 16px;
}

header nav ul li a {
    color: #1d1d1f;
    font-size: 12px;
}

/* メインコンテンツ */
main {
    text-align: center;
}

/* ヒーローセクション */
.hero {
    padding: 60px 20px;
}

.hero h1 {
    font-size: 56px;
    margin-bottom: 10px;
}

.hero h2 {
    font-size: 28px;
    font-weight: 400;
    margin-bottom: 20px;
}

.hero .cta-links a {
    margin: 0 10px;
    font-size: 17px;
}

.hero .button {
    background-color: #0071e3;
    color: #fff;
    padding: 12px 22px;
    border-radius: 980px; /* 角丸 */
}

.hero img {
    max-width: 100%;
    margin-top: 40px;
}

/* フッター */
footer {
    background-color: #f5f5f7;
    padding: 40px 20px;
    text-align: center;
    font-size: 12px;
    color: #6e6e73;
}

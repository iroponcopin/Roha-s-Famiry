document.addEventListener('DOMContentLoaded', () => {
    const profileAvatar = document.getElementById('profileAvatar');
    const linksSection = document.getElementById('linksSection');
    const linkButtons = document.querySelectorAll('.link-button');

    const infoOverlay = document.getElementById('infoOverlay');
    const closeInfoOverlayButton = document.getElementById('closeInfoOverlay');
    const infoTitle = document.getElementById('infoTitle');
    const infoHandle = document.getElementById('infoHandle');
    const infoQrCodeImage = document.getElementById('infoQrCodeImage');
    const infoUrl = document.getElementById('infoUrl');


    // 初期状態ではリンク項目を非表示
    linksSection.classList.remove('active');

    // プロフィールアバターのクリックでリンク項目を表示/非表示 (下伸びモーションを保持)
    profileAvatar.addEventListener('click', () => {
        linksSection.classList.toggle('active');
        // もし情報オーバーレイが表示中なら閉じる
        if (infoOverlay.classList.contains('active')) {
            infoOverlay.classList.remove('active');
        }
    });

    // 各リンクボタンのクリックイベント (新たな枠組みを表示)
    linkButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault(); // デフォルトのリンク動作を防止

            const linkId = button.dataset.linkId;
            const handle = button.dataset.infoHandle;
            const url = button.dataset.infoUrl;
            const qrImage = button.dataset.qrImage; // QR画像のパス

            // 情報をセット
            infoTitle.textContent = button.querySelector('.button-text').textContent; // ボタンのテキストをタイトルに
            infoHandle.textContent = handle;
            infoUrl.href = url;
            infoUrl.textContent = url.replace(/(^\w+:|^)\/\//, ''); // URLからプロトコルを削除して表示

            if (qrImage) {
                infoQrCodeImage.src = qrImage;
                infoQrCodeImage.style.display = 'block'; // 画像を表示
            } else {
                infoQrCodeImage.style.display = 'none'; // 画像を非表示
                infoQrCodeImage.src = ''; // srcもクリア
            }

            // オーバーレイを表示
            infoOverlay.classList.add('active');
        });
    });

    // オーバーレイの閉じるボタン
    closeInfoOverlayButton.addEventListener('click', () => {
        infoOverlay.classList.remove('active');
    });

    // プロフィールアバターの初期アニメーション
    const profilePictureWrapper = document.querySelector('.profile-image-wrapper');
    profilePictureWrapper.style.transform = 'scale(0.8)';
    profilePictureWrapper.style.opacity = '0';
    setTimeout(() => {
        profilePictureWrapper.style.transition = 'transform 0.5s ease-out, opacity 0.5s ease-out';
        profilePictureWrapper.style.transform = 'scale(1)';
        profilePictureWrapper.style.opacity = '1';
    }, 200);

    // 背景グラデーションのパララックス効果 (以前の機能を引き継ぎ)
    const backgroundGradient = document.querySelector('.background-gradient');
    document.body.addEventListener('mousemove', (e) => {
        const xOffset = (e.clientX / window.innerWidth - 0.5) * 20;
        const yOffset = (e.clientY / window.innerHeight - 0.5) * 20;
        backgroundGradient.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    });
});

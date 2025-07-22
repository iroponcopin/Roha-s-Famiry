document.addEventListener('DOMContentLoaded', () => {
    const profileAvatar = document.getElementById('profileAvatar');
    const linksSection = document.getElementById('linksSection');
    const linkButtons = document.querySelectorAll('.link-button');

    const infoOverlay = document.getElementById('infoOverlay');
    const closeInfoOverlayButton = document.getElementById('closeInfoOverlay');
    const infoTitle = document.getElementById('infoTitle');
    const infoDetails = document.getElementById('infoDetails'); // 新しく追加

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
            const title = button.querySelector('.button-text').textContent;
            infoTitle.textContent = title; // ボタンのテキストをタイトルに設定

            // infoDetails の中身をクリア
            infoDetails.innerHTML = '';

            // 各項目に応じた情報を infoDetails に追加
            if (linkId === 'contact') {
                const email = button.dataset.infoEmail;
                const phone1 = button.dataset.infoPhone1;
                const phone2 = button.dataset.infoPhone2;
                const phone3 = button.dataset.infoPhone3;
                const phone4 = button.dataset.infoPhone4;

                if (email) infoDetails.innerHTML += `<p><a href="mailto:${email}">${email}</a></p>`;
                if (phone1) infoDetails.innerHTML += `<p><a href="tel:${phone1.replace(/\s|-|\(|\)/g, '')}">${phone1}</a></p>`;
                if (phone2) infoDetails.innerHTML += `<p><a href="tel:${phone2.replace(/\s|-|\(|\)/g, '')}">${phone2}</a></p>`;
                if (phone3) infoDetails.innerHTML += `<p><a href="tel:${phone3.replace(/\s|-|\(|\)/g, '')}">${phone3}</a></p>`;
                if (phone4) infoDetails.innerHTML += `<p><a href="tel:${phone4.replace(/\s|-|\(|\)/g, '')}">${phone4}</a></p>`;
            } else {
                const handle = button.dataset.infoHandle;
                const url = button.dataset.infoUrl;
                const qrImage = button.dataset.qrImage; // QR画像のパス

                if (handle) infoDetails.innerHTML += `<p>${handle}</p>`;
                if (url) infoDetails.innerHTML += `<p>Official Site: <a href="${url}" target="_blank">${url.replace(/(^\w+:|^)\/\//, '')}</a></p>`;
                
                // TelegramとMessengerのみQRコード画像を表示
                if (qrImage && (linkId === 'telegram' || linkId === 'messenger')) {
                    const img = document.createElement('img');
                    img.src = qrImage;
                    img.alt = `${linkId} QR Code`;
                    img.classList.add('info-qr-code-image');
                    infoDetails.appendChild(img);
                }
            }
            
            // オーバーレイを表示
            infoOverlay.classList.add('active');
        });
    });

    // オーバーレイの閉じるボタン
    closeInfoOverlayButton.addEventListener('click', () => {
        infoOverlay.classList.remove('active');
    });

    // プロフィールアバターの初期アニメーション (画像が削除されたため、エフェクトのみ残す)
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

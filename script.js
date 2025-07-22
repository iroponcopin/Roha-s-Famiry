document.addEventListener('DOMContentLoaded', () => {
    const profileAvatar = document.getElementById('profileAvatar');
    const linksSection = document.getElementById('linksSection');
    const linkButtons = document.querySelectorAll('.link-button');

    // 初期状態ではリンク項目を非表示
    linksSection.classList.remove('active');

    // プロフィールアバターのクリックでリンク項目を表示/非表示
    profileAvatar.addEventListener('click', () => {
        linksSection.classList.toggle('active');
        // 他の展開されている項目があれば閉じる
        linkButtons.forEach(button => {
            if (button.classList.contains('expanded')) {
                button.classList.remove('expanded');
                // 情報を削除
                const infoContent = button.querySelector('.info-content');
                if (infoContent) {
                    infoContent.remove();
                }
            }
        });
    });

    // 各リンクボタンのクリックイベント
    linkButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault(); // デフォルトのリンク動作を防止

            const isExpanded = button.classList.contains('expanded');

            // クリックされたボタン以外の、展開されているボタンを全て閉じる
            linkButtons.forEach(btn => {
                if (btn !== button && btn.classList.contains('expanded')) {
                    btn.classList.remove('expanded');
                    // 情報を削除
                    const infoContent = btn.querySelector('.info-content');
                    if (infoContent) {
                        infoContent.remove();
                    }
                }
            });

            if (!isExpanded) {
                // ボタンを展開し、情報を追加
                button.classList.add('expanded');
                appendInfoContent(button);
            } else {
                // ボタンを折りたたみ、情報を削除
                button.classList.remove('expanded');
                const infoContent = button.querySelector('.info-content');
                if (infoContent) {
                    infoContent.remove();
                }
            }
        });
    });

    // 情報を動的に追加する関数
    function appendInfoContent(button) {
        const infoUrl = button.dataset.infoUrl;
        const qrImage = button.dataset.qrImage;
        const linkId = button.dataset.linkId;

        const infoContent = document.createElement('div');
        infoContent.classList.add('info-content');

        let contentHTML = `<p>Official Site: <a href="${infoUrl}" target="_blank">${infoUrl.replace(/(^\w+:|^)\/\//, '')}</a></p>`;

        if (qrImage && linkId === 'telegram') { // TelegramのみQR画像を表示
            contentHTML += `<img src="${qrImage}" alt="${linkId} QR Code" class="qr-code-image">`;
        }

        infoContent.innerHTML = contentHTML;

        // ボタンの最後に情報を追加
        button.appendChild(infoContent);

        // 少し遅延させてopacityとmax-heightのアニメーションを開始
        setTimeout(() => {
            infoContent.style.opacity = '1';
            infoContent.style.maxHeight = infoContent.scrollHeight + 'px'; // コンテンツの高さに合わせてmaxHeightを設定
        }, 10);
    }


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

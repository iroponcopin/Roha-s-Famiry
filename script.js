document.addEventListener('DOMContentLoaded', () => {
    const profileAvatar = document.getElementById('profileAvatar');
    const linksSection = document.getElementById('linksSection');
    const defaultLinks = document.getElementById('defaultLinks');
    const secretLinks = document.getElementById('secretLinks');
    const allLinkButtons = document.querySelectorAll('.link-button'); // すべてのリンクボタン

    const infoOverlay = document.getElementById('infoOverlay');
    const closeInfoOverlayButton = document.getElementById('closeInfoOverlay');
    const infoTitle = document.getElementById('infoTitle');
    const infoDetails = document.getElementById('infoDetails');

    const passwordOverlay = document.getElementById('passwordOverlay');
    const closePasswordOverlayButton = document.getElementById('closePasswordOverlay');
    const passwordInput = document.getElementById('passwordInput');
    const passwordSubmit = document.getElementById('passwordSubmit');
    const passwordError = document.getElementById('passwordError');

    const CORRECT_PASSWORD = "0204"; // 設定するパスワード

    let isSecretLinksShown = false; // シークレットリンクが表示されているかどうかのフラグ

    // 初期状態ではリンク項目を非表示
    linksSection.classList.remove('active');
    secretLinks.classList.add('hidden'); // シークレットリンクは初期状態で隠す

    // プロフィールアバターのダブルクリックでパスワード入力表示/リンク切り替え
    profileAvatar.addEventListener('dblclick', () => {
        // 現在表示されているリンクを非表示にする
        linksSection.classList.remove('active');
        // もし情報オーバーレイが表示中なら閉じる
        if (infoOverlay.classList.contains('active')) {
            infoOverlay.classList.remove('active');
        }

        if (isSecretLinksShown) {
            // シークレットリンクが表示中の場合、通常リンクに戻す
            defaultLinks.classList.remove('hidden');
            defaultLinks.classList.add('visible');
            secretLinks.classList.add('hidden');
            secretLinks.classList.remove('visible');
            isSecretLinksShown = false;
        } else {
            // 通常リンクが表示中の場合、パスワード入力を求める
            passwordOverlay.classList.add('active');
            passwordInput.value = ''; // 入力欄をクリア
            passwordError.classList.remove('show'); // エラーメッセージを隠す
            passwordInput.focus(); // 入力欄にフォーカス
        }
    });

    // パスワード入力オーバーレイの閉じるボタン
    closePasswordOverlayButton.addEventListener('click', () => {
        passwordOverlay.classList.remove('active');
    });

    // パスワード入力時の処理
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            passwordSubmit.click(); // EnterキーでSubmitボタンをクリック
        }
    });

    passwordSubmit.addEventListener('click', () => {
        if (passwordInput.value === CORRECT_PASSWORD) {
            passwordOverlay.classList.remove('active'); // パスワードオーバーレイを閉じる
            defaultLinks.classList.remove('visible');
            defaultLinks.classList.add('hidden'); // 通常リンクを隠す
            secretLinks.classList.remove('hidden');
            secretLinks.classList.add('visible'); // シークレットリンクを表示

            linksSection.classList.add('active'); // リンクセクション全体を表示
            isSecretLinksShown = true;
        } else {
            passwordError.textContent = "Incorrect password. Please try again.";
            passwordError.classList.add('show');
            passwordInput.value = ''; // 入力クリア
        }
    });


    // 各リンクボタンのクリックイベント (新たな枠組みを表示)
    // defaultLinks と secretLinks の両方にあるリンクボタンに適用
    allLinkButtons.forEach(button => {
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
                // 通常のSNSリンクの場合
                const handle = button.dataset.infoHandle;
                const url = button.href; // href属性から直接URLを取得
                
                if (handle) infoDetails.innerHTML += `<p>${handle}</p>`;
                // Official Site URLはContact以外の全ての項目に表示
                if (url && url !== '#') { // #の場合は表示しない
                    infoDetails.innerHTML += `<p>Official Site: <a href="${url}" target="_blank">${url.replace(/(^\w+:|^)\/\//, '')}</a></p>`;
                }
                
                // TelegramとMessengerのみQRコード画像を表示
                const qrImage = button.dataset.qrImage;
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

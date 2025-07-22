// ヘルパー関数: モバイルデバイスかどうかを判定
function isMobileDevice() {
    // 768pxをモバイルとPCのブレークポイントとする
    return window.innerWidth <= 768;
}

document.addEventListener('DOMContentLoaded', () => {
    const profileAvatar = document.getElementById('profileAvatar');
    const linksSection = document.getElementById('linksSection');
    const defaultLinksPC = document.getElementById('defaultLinksPC');
    const secretLinksPC = document.getElementById('secretLinksPC');
    const mobileLinks = document.getElementById('mobileLinks');
    const fileButton = document.getElementById('fileButton');
    const fileGridLinks = document.getElementById('fileGridLinks');
    const allLinkButtons = document.querySelectorAll('.link-button');

    const infoOverlay = document.getElementById('infoOverlay');
    const closeInfoOverlayButton = document.getElementById('closeInfoOverlay');
    const infoTitle = document.getElementById('infoTitle');
    const infoDetails = document.getElementById('infoDetails');

    const passwordOverlay = document.getElementById('passwordOverlay');
    const closePasswordOverlayButton = document.getElementById('closePasswordOverlay');
    const passwordInput = document.getElementById('passwordInput');
    const passwordSubmit = document.getElementById('passwordSubmit');
    const passwordError = document.getElementById('passwordError');

    const addressOverlay = document.getElementById('addressOverlay');
    const closeAddressOverlayButton = document.getElementById('closeAddressOverlay');

    const addToHomeScreenOverlay = document.getElementById('addToHomeScreenOverlay'); // 新規追加
    const closeAddToHomeScreenOverlayButton = document.getElementById('closeAddToHomeScreenOverlay'); // 新規追加

    const bottomButtonsContainerPC = document.getElementById('bottomButtonsContainerPC');
    const secretButtonPC = document.getElementById('secretButtonPC');
    const addressButtonPC = document.getElementById('addressButtonPC');
    const settingsButtonPC = document.getElementById('settingsButtonPC'); // PC版設定ボタン

    // モバイル版のリンクとして機能するボタン
    const mobileSecretButton = document.getElementById('mobileSecretButton');
    const mobileAddressButton = document.getElementById('mobileAddressButton');
    const mobileSettingsButton = document.getElementById('mobileSettingsButton'); // モバイル版設定ボタン

    const CORRECT_PASSWORD = "0204";

    let isSecretLinksShown = false;
    let isFileGridShown = false; // モバイル版のファイルグリッドが表示されているかどうかのフラグ

    // ヘルパー関数: オーバーレイの表示/非表示を切り替える
    function toggleOverlay(overlayElement, show) {
        if (show) {
            overlayElement.classList.add('active');
            // オーバーレイ表示中は本体のスクロールを無効化
            document.body.style.overflow = 'hidden';
        } else {
            overlayElement.classList.remove('active');
            // 全てのオーバーレイが閉じたら本体のスクロールを有効化
            if (!infoOverlay.classList.contains('active') &&
                !passwordOverlay.classList.contains('active') &&
                !addressOverlay.classList.contains('active') &&
                !addToHomeScreenOverlay.classList.contains('active')) {
                document.body.style.overflow = '';
            }
        }
    }

    // ヘルパー関数: 他の全てのオーバーレイを閉じる
    function closeAllOverlays() {
        toggleOverlay(infoOverlay, false);
        toggleOverlay(passwordOverlay, false);
        toggleOverlay(addressOverlay, false);
        toggleOverlay(addToHomeScreenOverlay, false); // 新規追加
    }

    // 初期状態の表示設定（PC/モバイルで分岐）
    function initializeLinksDisplay() {
        linksSection.classList.remove('active');
        closeAllOverlays();

        if (isMobileDevice()) {
            defaultLinksPC.classList.add('hidden');
            secretLinksPC.classList.add('hidden');
            mobileLinks.classList.remove('hidden'); // モバイル版の初期項目を表示
            mobileLinks.classList.add('visible');
            fileGridLinks.classList.add('hidden'); // グリッドは初期状態で隠す
            fileGridLinks.classList.remove('visible'); // visibleクラスも除去
            bottomButtonsContainerPC.classList.add('hidden'); // PC版のフッターボタンを隠す
        } else {
            defaultLinksPC.classList.remove('hidden'); // PC版の初期項目を表示
            defaultLinksPC.classList.add('visible');
            secretLinksPC.classList.add('hidden');
            secretLinksPC.classList.remove('visible'); // visibleクラスも除去
            mobileLinks.classList.add('hidden'); // モバイル版の初期項目を隠す
            fileGridLinks.classList.add('hidden'); // グリッドは初期状態で隠す
            fileGridLinks.classList.remove('visible'); // visibleクラスも除去
            bottomButtonsContainerPC.classList.remove('hidden'); // PC版のフッターボタンを表示
        }
        isSecretLinksShown = false;
        isFileGridShown = false;
    }

    // ページロード時とウィンドウサイズ変更時に初期表示を調整
    initializeLinksDisplay();
    window.addEventListener('resize', initializeLinksDisplay);


    // プロフィールアバターのクリックでリンク項目を表示/非表示
    profileAvatar.addEventListener('click', () => {
        linksSection.classList.toggle('active');
        // PC版のフッターボタン表示/非表示はPC時のみ制御
        if (!isMobileDevice()) {
            bottomButtonsContainerPC.classList.toggle('hidden');
        } else {
            // モバイル時はファイルグリッド表示をリセット
            if (isFileGridShown) {
                mobileLinks.classList.remove('hidden');
                mobileLinks.classList.add('visible');
                fileGridLinks.classList.add('hidden');
                fileGridLinks.classList.remove('visible');
                isFileGridShown = false;
            }
        }
        
        closeAllOverlays(); // 他の全てのオーバーレイを閉じる

        // リンクが閉じられた場合、シークレットリンクが表示中であれば通常リンクに戻す
        if (!linksSection.classList.contains('active') && isSecretLinksShown) {
            if (isMobileDevice()) {
                mobileLinks.classList.remove('hidden');
                mobileLinks.classList.add('visible');
                // シークレットリンクはPC版の要素なのでモバイルでは常に隠す
                secretLinksPC.classList.add('hidden'); 
                secretLinksPC.classList.remove('visible'); 
            } else {
                defaultLinksPC.classList.remove('hidden');
                defaultLinksPC.classList.add('visible');
                secretLinksPC.classList.add('hidden');
                secretLinksPC.classList.remove('visible');
            }
            isSecretLinksShown = false;
        }
    });

    // 各リンクボタンのクリックイベント (PC/モバイル共通のinfoOverlay表示)
    allLinkButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // 特殊な処理を持つボタンはここでフィルタリング
            if (button.id === 'fileButton' || 
                button.id === 'mobileSecretButton' || 
                button.id === 'mobileAddressButton' || 
                button.id === 'mobileSettingsButton' ||
                button.id === 'secretButtonPC' || // PC版フッターボタン
                button.id === 'addressButtonPC' || // PC版フッターボタン
                button.id === 'settingsButtonPC' // PC版設定ボタン
            ) {
                return; 
            }

            e.preventDefault(); // デフォルトのリンク動作を防止

            closeAllOverlays(); // 他の全てのオーバーレイを閉じる

            const linkId = button.dataset.linkId;
            const title = button.querySelector('.button-text').textContent;
            infoTitle.textContent = title; // ボタンのテキストをタイトルに設定

            infoDetails.innerHTML = ''; // infoDetails の中身をクリア

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
                const url = button.href;
                
                if (handle) infoDetails.innerHTML += `<p>${handle}</p>`;
                
                if (url && url !== '#' && url !== window.location.href) {
                    infoDetails.innerHTML += `<p>Official Site: <a href="${url}" target="_blank">${url.replace(/(^\w+:|^)\/\//, '')}</a></p>`;
                }
                
                const qrImage = button.dataset.qrImage;
                if (qrImage && (linkId === 'telegram' || linkId === 'messenger')) {
                    const img = document.createElement('img');
                    img.src = qrImage;
                    img.alt = `${linkId} QR Code`;
                    img.classList.add('info-qr-code-image');
                    infoDetails.appendChild(img);
                }
            }
            
            toggleOverlay(infoOverlay, true); // オーバーレイを表示
        });
    });

    // オーバーレイの閉じるボタン
    closeInfoOverlayButton.addEventListener('click', () => {
        toggleOverlay(infoOverlay, false);
    });


    // === PC版の画面下部ボタンの機能 ===
    // PC版ボタンは isMobileDevice() を使ってイベントリスナーを登録
    if (!isMobileDevice()) {
        secretButtonPC.addEventListener('click', () => {
            closeAllOverlays();
            toggleOverlay(passwordOverlay, true);
            passwordInput.value = '';
            passwordError.classList.remove('show');
            passwordInput.focus();
        });

        addressButtonPC.addEventListener('click', () => {
            closeAllOverlays();
            toggleOverlay(addressOverlay, true);
        });

        settingsButtonPC.addEventListener('click', () => {
            closeAllOverlays();
            // Settingボタンで「Add to Home Screen」オーバーレイを表示
            toggleOverlay(addToHomeScreenOverlay, true);
        });
    }


    // === モバイル版の特殊項目ボタンの機能 ===
    // 「Socials」ファイルボタン
    fileButton.addEventListener('click', (e) => {
        e.preventDefault();
        closeAllOverlays();

        if (isMobileDevice()) {
            // ファイルボタンがクリックされたら、通常項目を隠し、グリッドを表示
            mobileLinks.classList.remove('visible');
            mobileLinks.classList.add('hidden');
            fileGridLinks.classList.remove('hidden');
            fileGridLinks.classList.add('visible');
            isFileGridShown = true;
        }
    });

    // モバイル版の「Secret」ボタン
    mobileSecretButton.addEventListener('click', (e) => {
        e.preventDefault();
        closeAllOverlays();
        toggleOverlay(passwordOverlay, true);
        passwordInput.value = '';
        passwordError.classList.remove('show');
        passwordInput.focus();
    });

    // モバイル版の「Location」ボタン
    mobileAddressButton.addEventListener('click', (e) => {
        e.preventDefault();
        closeAllOverlays();
        toggleOverlay(addressOverlay, true);
    });

    // モバイル版の「Settings」ボタン
    mobileSettingsButton.addEventListener('click', (e) => {
        e.preventDefault();
        closeAllOverlays();
        // Settingボタンで「Add to Home Screen」オーバーレイを表示
        toggleOverlay(addToHomeScreenOverlay, true);
    });


    // オーバーレイの閉じるボタン（共通）
    closeAddressOverlayButton.addEventListener('click', () => {
        toggleOverlay(addressOverlay, false);
    });

    closePasswordOverlayButton.addEventListener('click', () => {
        toggleOverlay(passwordOverlay, false);
    });

    closeAddToHomeScreenOverlayButton.addEventListener('click', () => { // 新規追加
        toggleOverlay(addToHomeScreenOverlay, false);
    });

    // パスワード入力時の処理
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            passwordSubmit.click();
        }
    });

    passwordSubmit.addEventListener('click', () => {
        if (passwordInput.value === CORRECT_PASSWORD) {
            toggleOverlay(passwordOverlay, false);

            if (isMobileDevice()) {
                // モバイル版ではデフォルトリンクグループを隠し、シークレットリンクグループを表示
                mobileLinks.classList.remove('visible');
                mobileLinks.classList.add('hidden');
                // モバイル版ではPC版のシークレットリンクグループを再利用
                secretLinksPC.classList.remove('hidden');
                secretLinksPC.classList.add('visible');
                linksSection.classList.add('active'); // 親のセクションは開いたまま
            } else {
                defaultLinksPC.classList.remove('visible');
                defaultLinksPC.classList.add('hidden');
                secretLinksPC.classList.remove('hidden');
                secretLinksPC.classList.add('visible');
                linksSection.classList.add('active');
            }
            isSecretLinksShown = true;
        } else {
            passwordError.textContent = "Incorrect password. Please try again.";
            passwordError.classList.add('show');
            passwordInput.value = '';
        }
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

    // 背景グラデーションのパララックス効果
    const backgroundGradient = document.querySelector('.background-gradient');
    document.body.addEventListener('mousemove', (e) => {
        const xOffset = (e.clientX / window.innerWidth - 0.5) * 20;
        const yOffset = (e.clientY / window.innerHeight - 0.5) * 20;
        backgroundGradient.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    });
});

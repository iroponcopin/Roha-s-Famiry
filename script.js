// ヘルパー関数: モバイルデバイスかどうかを判定
function isMobileDevice() {
    // 768pxをモバイルとPCのブレークポイントとする
    return window.innerWidth <= 768;
}

document.addEventListener('DOMContentLoaded', () => {
    const profileAvatar = document.getElementById('profileAvatar');
    const linksSection = document.getElementById('linksSection');
    const defaultLinksPC = document.getElementById('defaultLinksPC');
    const secretLinksPC = document.getElementById('secretLinksPC'); // PC用シークレットリンク群

    const mobileLinks = document.getElementById('mobileLinks'); // モバイル版の初期リンク群（Socials, Contact, Secret, Location, Settings）
    const fileButton = document.getElementById('fileButton'); // モバイル版の「Socials」ボタン
    const fileGridLinks = document.getElementById('fileGridLinks'); // モバイル版のファイル内グリッド
    const secretLinksMobile = document.getElementById('secretLinksMobile'); // モバイル版のSecret展開後のリンク群

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

    const addressOverlay = document.getElementById('addressOverlay');
    const closeAddressOverlayButton = document.getElementById('closeAddressOverlay');

    const addToHomeScreenOverlay = document.getElementById('addToHomeScreenOverlay');
    const closeAddToHomeScreenOverlayButton = document.getElementById('closeAddToHomeScreenOverlay');

    // PC版フッターボタン (PCのみ存在)
    const bottomButtonsContainerPC = document.getElementById('bottomButtonsContainerPC');
    const secretButtonPC = document.getElementById('secretButtonPC');
    const addressButtonPC = document.getElementById('addressButtonPC');
    const settingsButtonPC = document.getElementById('settingsButtonPC');

    // モバイル版のLinkTree項目になったボタン
    const mobileSecretButton = document.getElementById('mobileSecretButton');
    const mobileAddressButton = document.getElementById('mobileAddressButton');
    const mobileSettingsButton = document.getElementById('mobileSettingsButton');

    // モバイル版の戻るボタン
    const backToFileLinksButton = document.getElementById('backToFileLinks');
    const backToMobileMainLinksButton = document.getElementById('backToMobileMainLinks');


    const CORRECT_PASSWORD = "0204";

    let isSecretLinksShown = false; // PC/モバイル共通のシークレットリンク表示状態
    let isFileGridShown = false; // モバイル版のファイルグリッド表示状態
    let isMobileSecretActive = false; // モバイル版でパスワード入力後シークレットリンクが表示されている状態

    // ヘルパー関数: オーバーレイの表示/非表示を切り替える
    function toggleOverlay(overlayElement, show) {
        if (show) {
            overlayElement.classList.add('active');
            document.body.style.overflow = 'hidden'; // オーバーレイ表示中は本体のスクロールを無効化
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
        toggleOverlay(addToHomeScreenOverlay, false);
    }

    // リンクグループの表示を制御する共通関数
    function showLinksGroup(groupToShow) {
        const groups = [defaultLinksPC, secretLinksPC, mobileLinks, fileGridLinks, secretLinksMobile];
        groups.forEach(group => {
            if (group) { // groupが存在することを確認
                if (group === groupToShow) {
                    group.classList.remove('hidden');
                    group.classList.add('visible');
                } else {
                    group.classList.remove('visible');
                    group.classList.add('hidden');
                }
            }
        });
    }

    // 初期状態の表示設定（PC/モバイルで分岐）
    function initializeLinksDisplay() {
        linksSection.classList.remove('active');
        closeAllOverlays();
        isSecretLinksShown = false;
        isFileGridShown = false;
        isMobileSecretActive = false;

        if (isMobileDevice()) {
            showLinksGroup(mobileLinks); // モバイル版の初期項目を表示
            if (bottomButtonsContainerPC) bottomButtonsContainerPC.classList.add('hidden'); // PC版のフッターボタンを隠す
        } else {
            showLinksGroup(defaultLinksPC); // PC版の初期項目を表示
            if (bottomButtonsContainerPC) bottomButtonsContainerPC.classList.remove('hidden'); // PC版のフッターボタンを表示
        }
    }

    // ページロード時とウィンドウサイズ変更時に初期表示を調整
    initializeLinksDisplay();
    window.addEventListener('resize', initializeLinksDisplay);


    // プロフィールアバターのクリックでリンク項目を表示/非表示
    profileAvatar.addEventListener('click', () => {
        linksSection.classList.toggle('active');
        if (!isMobileDevice() && bottomButtonsContainerPC) {
            bottomButtonsContainerPC.classList.toggle('hidden');
        } else if (isMobileDevice()) {
            // モバイル版の場合、開閉時に状態をリセット
            if (linksSection.classList.contains('active')) {
                // 開く場合
                showLinksGroup(mobileLinks);
                isSecretLinksShown = false;
                isFileGridShown = false;
                isMobileSecretActive = false;
            } else {
                // 閉じる場合、リンクグループの表示状態はそのまま（次に開いたときにinitializeLinksDisplayでリセットされる）
            }
        }
        
        closeAllOverlays(); // 他の全てのオーバーレイを閉じる
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
                button.id === 'settingsButtonPC' || // PC版設定ボタン
                button.classList.contains('back-button') // 戻るボタンもフィルタリング
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
    if (secretButtonPC) { // PC版のみ存在することを確認
        secretButtonPC.addEventListener('click', () => {
            closeAllOverlays();
            toggleOverlay(passwordOverlay, true);
            passwordInput.value = '';
            passwordError.classList.remove('show');
            passwordInput.focus();
        });
    }

    if (addressButtonPC) { // PC版のみ存在することを確認
        addressButtonPC.addEventListener('click', () => {
            closeAllOverlays();
            toggleOverlay(addressOverlay, true);
        });
    }

    if (settingsButtonPC) { // PC版のみ存在することを確認
        settingsButtonPC.addEventListener('click', () => {
            closeAllOverlays();
            toggleOverlay(addToHomeScreenOverlay, true); // Settingボタンで「Add to Home Screen」オーバーレイを表示
        });
    }


    // === モバイル版の特殊項目ボタンの機能 ===
    // 「Socials」ファイルボタン
    if (fileButton) {
        fileButton.addEventListener('click', (e) => {
            e.preventDefault();
            closeAllOverlays();
            if (isMobileDevice()) {
                showLinksGroup(fileGridLinks); // グリッドを表示
                isFileGridShown = true;
            }
        });
    }

    // モバイル版の「Secret」ボタン
    if (mobileSecretButton) {
        mobileSecretButton.addEventListener('click', (e) => {
            e.preventDefault();
            closeAllOverlays();
            toggleOverlay(passwordOverlay, true);
            passwordInput.value = '';
            passwordError.classList.remove('show');
            passwordInput.focus();
        });
    }

    // モバイル版の「Location」ボタン
    if (mobileAddressButton) {
        mobileAddressButton.addEventListener('click', (e) => {
            e.preventDefault();
            closeAllOverlays();
            toggleOverlay(addressOverlay, true);
        });
    }

    // モバイル版の「Settings」ボタン
    if (mobileSettingsButton) {
        mobileSettingsButton.addEventListener('click', (e) => {
            e.preventDefault();
            closeAllOverlays();
            toggleOverlay(addToHomeScreenOverlay, true); // Settingボタンで「Add to Home Screen」オーバーレイを表示
        });
    }

    // === モバイル版の戻るボタン機能 ===
    if (backToFileLinksButton) {
        backToFileLinksButton.addEventListener('click', () => {
            closeAllOverlays();
            showLinksGroup(mobileLinks); // Socials, Contactなどがあるメインに戻る
            isFileGridShown = false;
        });
    }

    if (backToMobileMainLinksButton) {
        backToMobileMainLinksButton.addEventListener('click', () => {
            closeAllOverlays();
            showLinksGroup(mobileLinks); // Socials, Contactなどがあるメインに戻る
            isMobileSecretActive = false;
        });
    }


    // オーバーレイの閉じるボタン（共通）
    closeAddressOverlayButton.addEventListener('click', () => {
        toggleOverlay(addressOverlay, false);
    });

    closePasswordOverlayButton.addEventListener('click', () => {
        toggleOverlay(passwordOverlay, false);
    });

    closeAddToHomeScreenOverlayButton.addEventListener('click', () => {
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
                showLinksGroup(secretLinksMobile); // モバイル版のシークレットリンクを表示
                isMobileSecretActive = true;
            } else {
                showLinksGroup(secretLinksPC); // PC版のシークレットリンクを表示
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

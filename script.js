// YouTube IFrame Player API ready
let player;
function onYouTubeIframeAPIReady() {
    // プレイヤーが作成されるのはMusic Playerオーバーレイが開かれた時
}

// ヘルパー関数: モバイルデバイスかどうかを判定
function isMobileDevice() {
    return window.innerWidth <= 768;
}

document.addEventListener('DOMContentLoaded', () => {
    const profileAvatar = document.getElementById('profileAvatar');
    const linksSection = document.getElementById('linksSection');

    const defaultLinksPC = document.getElementById('defaultLinksPC');
    const secretLinksPC = document.getElementById('secretLinksPC');
    // const pcToggleButtonContainer = document.getElementById('pcToggleButtonContainer'); // 削除
    // const pcToggleLeftButton = document.getElementById('pcToggleLeft'); // 削除
    // const pcToggleRightButton = document.getElementById('pcToggleRight'); // 削除

    const mobileLinks = document.getElementById('mobileLinks');
    const fileButton = document.getElementById('fileButton');
    const fileGridLinks = document.getElementById('fileGridLinks');
    const secretLinksMobile = document.getElementById('secretLinksMobile');
    const mobileOptionButton = document.getElementById('mobileOptionButton');
    const optionGridLinksMobile = document.getElementById('optionGridLinksMobile');

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

    const addToHomeScreenOverlay = document.getElementById('addToHomeScreenOverlay');
    const closeAddToHomeScreenOverlayButton = document.getElementById('closeAddToHomeScreenOverlay');

    const musicPlayerOverlay = document.getElementById('musicPlayerOverlay'); // Music Player Overlay
    const closeMusicPlayerOverlayButton = document.getElementById('closeMusicPlayerOverlay');
    const togglePlaybackButton = document.getElementById('togglePlaybackButton');
    const audioResponseDiv = document.getElementById('audioResponse');

    // PC版フッターボタン
    const bottomButtonsContainerPC = document.getElementById('bottomButtonsContainerPC');
    const homeButtonPC = document.getElementById('homeButtonPC'); // Homeボタン
    const secretButtonPC = document.getElementById('secretButtonPC');
    const addressButtonPC = document.getElementById('addressButtonPC');
    const musicButtonPC = document.getElementById('musicButtonPC'); // Musicボタン
    const settingsButtonPC = document.getElementById('settingsButtonPC');

    // モバイル版のLinkTree項目になったボタン
    const mobileSecretButton = document.getElementById('mobileSecretButton');
    // const mobileAddressButton = document.getElementById('mobileAddressButton'); // 削除
    // const mobileSettingsButton = document.getElementById('mobileSettingsButton'); // 削除

    // モバイル版の戻るボタン
    const backToFileLinksButton = document.getElementById('backToFileLinks');
    const backToMobileMainLinksButton = document.getElementById('backToMobileMainLinks');
    const backToMobileSecretLinksButton = document.getElementById('backToMobileSecretLinks');


    const CORRECT_PASSWORD = "0204";
    const YOUTUBE_VIDEO_ID = '3rxTZ-mZ9O4'; // YouTube動画ID

    let isSecretLinksShown = false; // PC/モバイル共通のシークレットリンク表示状態（一度パスワードが入力されたか）
    let currentPCLinksView = 'default'; // 'default' or 'secret' (PC版のみ)
    let youtubePlayerInstance; // YouTube Playerインスタンス


    // ヘルパー関数: オーバーレイの表示/非表示を切り替える
    function toggleOverlay(overlayElement, show) {
        if (show) {
            overlayElement.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            overlayElement.classList.remove('active');
            if (!infoOverlay.classList.contains('active') &&
                !passwordOverlay.classList.contains('active') &&
                !addressOverlay.classList.contains('active') &&
                !addToHomeScreenOverlay.classList.contains('active') &&
                !musicPlayerOverlay.classList.contains('active')) { // Music Player Overlayも追加
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
        toggleOverlay(musicPlayerOverlay, false); // Music Player Overlayも追加
        if (youtubePlayerInstance && typeof youtubePlayerInstance.pauseVideo === 'function') {
            youtubePlayerInstance.pauseVideo(); // オーバーレイを閉じたら動画を一時停止
        }
    }

    // リンクグループの表示を制御する共通関数
    function showLinksGroup(groupToShow) {
        const groups = [defaultLinksPC, secretLinksPC, mobileLinks, fileGridLinks, secretLinksMobile, optionGridLinksMobile];
        groups.forEach(group => {
            if (group) {
                if (group === groupToShow) {
                    group.classList.remove('hidden');
                    group.classList.add('visible');
                } else {
                    group.classList.remove('visible');
                    group.classList.add('hidden');
                }
            }
        });
        // PC版の切り替えボタンの表示/非表示
        if (!isMobileDevice() && pcToggleButtonContainer) { // PC版のみ
            if (groupToShow === secretLinksPC) {
                pcToggleButtonContainer.classList.remove('hidden');
                pcToggleButtonContainer.classList.add('visible');
            } else {
                pcToggleButtonContainer.classList.remove('visible');
                pcToggleButtonContainer.classList.add('hidden');
            }
        }
    }

    // 初期状態の表示設定（PC/モバイルで分岐）
    function initializeLinksDisplay() {
        linksSection.classList.remove('active'); // リンクセクション全体は非表示
        closeAllOverlays();
        isSecretLinksShown = false; // パスワード入力状態をリセット
        currentPCLinksView = 'default'; // PC版表示はデフォルトに戻す

        if (isMobileDevice()) {
            showLinksGroup(mobileLinks); // モバイル版の初期項目を表示
            if (bottomButtonsContainerPC) bottomButtonsContainerPC.classList.add('hidden'); // PC版のフッターボタンを隠す
            // if (pcToggleButtonContainer) pcToggleButtonContainer.classList.add('hidden'); // PC版切り替えボタンを隠す
        } else {
            showLinksGroup(defaultLinksPC); // PC版の初期項目を表示
            if (bottomButtonsContainerPC) bottomButtonsContainerPC.classList.remove('hidden'); // PC版のフッターボタンを表示
            // if (pcToggleButtonContainer) pcToggleButtonContainer.classList.add('hidden'); // PC版切り替えボタンを隠す
        }
    }

    // ページロード時とウィンドウサイズ変更時に初期表示を調整
    initializeLinksDisplay();
    window.addEventListener('resize', initializeLinksDisplay);


    // プロフィールアバターのクリックでリンク項目を表示/非表示
    profileAvatar.addEventListener('click', () => {
        linksSection.classList.toggle('active'); // LinkSection全体の表示/非表示をトグル
        
        // PC版のフッターボタン表示/非表示はPC時のみ制御
        if (!isMobileDevice() && bottomButtonsContainerPC) {
            bottomButtonsContainerPC.classList.toggle('hidden');
        } 

        // リンクが閉じられた場合、全てのリセットを行う
        if (!linksSection.classList.contains('active')) {
            initializeLinksDisplay(); // 全てのリンク表示状態を初期化
        }
        
        closeAllOverlays(); // 他の全てのオーバーレイを閉じる
    });

    // 各リンクボタンのクリックイベント (PC/モバイル共通のinfoOverlay表示)
    allLinkButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // 特殊な処理を持つボタンはここでフィルタリング
            if (button.id === 'fileButton' || 
                button.id === 'mobileSecretButton' || 
                // button.id === 'mobileAddressButton' || // 削除
                // button.id === 'mobileSettingsButton' || // 削除
                button.id === 'homeButtonPC' || // Homeボタン
                button.id === 'secretButtonPC' || // Secretボタン
                button.id === 'addressButtonPC' || // Addressボタン
                button.id === 'musicButtonPC' || // Musicボタン
                button.id === 'settingsButtonPC' || // Settingsボタン
                button.id === 'mobileOptionButton' || // モバイルOptionボタン
                button.classList.contains('back-button') // 戻るボタン
            ) {
                return; 
            }

            e.preventDefault(); // デフォルトのリンク動作を防止（URL遷移は情報オーバーレイ内で実行）

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
    if (homeButtonPC) {
        homeButtonPC.addEventListener('click', () => {
            closeAllOverlays();
            showLinksGroup(defaultLinksPC); // Homeボタンで通常項目を表示
            currentPCLinksView = 'default';
        });
    }

    if (secretButtonPC) {
        secretButtonPC.addEventListener('click', () => {
            closeAllOverlays();
            if (isSecretLinksShown) { // パスワードが一度入力済みの場合
                showLinksGroup(secretLinksPC); // 直接シークレット項目を表示
                currentPCLinksView = 'secret';
            } else {
                toggleOverlay(passwordOverlay, true); // パスワード入力を求める
                passwordInput.value = '';
                passwordError.classList.remove('show');
                passwordInput.focus();
            }
        });
    }

    if (addressButtonPC) {
        addressButtonPC.addEventListener('click', () => {
            closeAllOverlays();
            toggleOverlay(addressOverlay, true);
        });
    }

    if (musicButtonPC) { // Music Playerボタン
        musicButtonPC.addEventListener('click', () => {
            closeAllOverlays();
            toggleOverlay(musicPlayerOverlay, true);
            // YouTubeプレイヤーを初期化または再生開始
            if (!youtubePlayerInstance) {
                youtubePlayerInstance = new YT.Player('youtubePlayer', {
                    height: '200', // 適切な高さに調整
                    width: '100%',
                    videoId: YOUTUBE_VIDEO_ID,
                    playerVars: {
                        'autoplay': 0, // 自動再生しない
                        'controls': 1, // コントロールを表示
                        'rel': 0, // 関連動画を表示しない
                        'modestbranding': 1 // YouTubeロゴを控えめに
                    },
                    events: {
                        'onReady': (event) => {
                            // プレイヤーが準備できたらLLMレスポンスを生成
                            audioResponseDiv.textContent = "Generating audio response...";
                            // ここでLLM APIを呼び出す（例: Gemini API）
                            // 実際のLLM呼び出しは非同期処理になる
                            setTimeout(() => { // 擬似的なLLMレスポンス
                                audioResponseDiv.textContent = "Here's a chill track for your day!";
                            }, 1500);
                        },
                        'onStateChange': (event) => {
                            // プレイヤーの状態変化を監視
                            if (event.data == YT.PlayerState.PLAYING) {
                                togglePlaybackButton.textContent = "Pause";
                            } else {
                                togglePlaybackButton.textContent = "Play";
                            }
                        }
                    }
                });
            } else {
                // 既にプレイヤーが存在する場合は、状態をチェックして再生/一時停止
                if (youtubePlayerInstance.getPlayerState() === YT.PlayerState.PLAYING) {
                    youtubePlayerInstance.pauseVideo();
                } else {
                    youtubePlayerInstance.playVideo();
                }
            }
        });
    }

    if (togglePlaybackButton) {
        togglePlaybackButton.addEventListener('click', () => {
            if (youtubePlayerInstance) {
                if (youtubePlayerInstance.getPlayerState() === YT.PlayerState.PLAYING) {
                    youtubePlayerInstance.pauseVideo();
                } else {
                    youtubePlayerInstance.playVideo();
                }
            }
        });
    }

    if (closeMusicPlayerOverlayButton) {
        closeMusicPlayerOverlayButton.addEventListener('click', () => {
            toggleOverlay(musicPlayerOverlay, false);
            if (youtubePlayerInstance && typeof youtubePlayerInstance.pauseVideo === 'function') {
                youtubePlayerInstance.pauseVideo(); // オーバーレイを閉じたら動画を一時停止
            }
        });
    }


    if (settingsButtonPC) {
        settingsButtonPC.addEventListener('click', () => {
            closeAllOverlays();
            toggleOverlay(addToHomeScreenOverlay, true);
        });
    }


    // === モバイル版の特殊項目ボタンの機能 ===
    // 「Socials」ファイルボタン
    if (fileButton) {
        fileButton.addEventListener('click', (e) => {
            e.preventDefault();
            closeAllOverlays();
            showLinksGroup(fileGridLinks); // グリッドを表示
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

    // モバイル版の「Option」ボタン (Secret展開後に表示)
    if (mobileOptionButton) {
        mobileOptionButton.addEventListener('click', (e) => {
            e.preventDefault();
            closeAllOverlays();
            showLinksGroup(optionGridLinksMobile); // Option内グリッドを表示
        });
    }


    // === モバイル版の戻るボタン機能 ===
    // Socialsグリッドからの戻るボタン
    if (backToFileLinksButton) {
        backToFileLinksButton.addEventListener('click', () => {
            closeAllOverlays();
            showLinksGroup(mobileLinks); // メイン項目に戻る
        });
    }

    // Secret展開後のリストからの戻るボタン
    if (backToMobileMainLinksButton) {
        backToMobileMainLinksButton.addEventListener('click', () => {
            closeAllOverlays();
            showLinksGroup(mobileLinks); // メイン項目に戻る
            isSecretLinksShown = false; // シークレット表示状態もリセット
        });
    }

    // Optionグリッドからの戻るボタン
    if (backToMobileSecretLinksButton) {
        backToMobileSecretLinksButton.addEventListener('click', () => {
            closeAllOverlays();
            showLinksGroup(secretLinksMobile); // OptionボタンがあるSecretリストに戻る
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
            isSecretLinksShown = true; // パスワード入力成功でシークレットアクセス権を付与

            if (isMobileDevice()) {
                showLinksGroup(secretLinksMobile); // モバイル版のOptionボタンがあるリストを表示
            } else {
                showLinksGroup(secretLinksPC); // PC版のシークレットリンクを表示
                // PC版の切り替えボタンはSecret表示時に自動で表示される
                currentPCLinksView = 'secret';
            }
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

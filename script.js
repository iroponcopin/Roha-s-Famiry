document.addEventListener('DOMContentLoaded', () => {
    const profileAvatar = document.getElementById('profileAvatar');
    const linksSection = document.getElementById('linksSection');
    const linkButtons = document.querySelectorAll('.link-button');

    // 初期状態ではリンク項目を非表示
    linksSection.classList.remove('active');

    // プロフィールアバターのクリックでリンク項目を表示/非表示 (下伸びモーションを保持)
    profileAvatar.addEventListener('click', () => {
        linksSection.classList.toggle('active');
        // 表示/非表示が切り替わる際に、もし横に伸びているボタンがあれば元に戻す
        linkButtons.forEach(button => {
            if (button.classList.contains('expanded-sideways')) {
                button.classList.remove('expanded-sideways');
            }
        });
    });

    // 各リンクボタンのクリックイベント (横に伸びるモーションを追加)
    linkButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // デフォルトのリンク動作はそのまま維持 (target="_blank" で別タブで開く)
            // e.preventDefault(); // これをコメントアウトして、リンクの動作を有効にする

            // クリックされたボタン以外の、横に伸びているボタンを全て元に戻す
            linkButtons.forEach(btn => {
                if (btn !== button && btn.classList.contains('expanded-sideways')) {
                    btn.classList.remove('expanded-sideways');
                }
            });

            // クリックされたボタンの横伸び/元に戻すをトグル
            button.classList.toggle('expanded-sideways');

            // もしボタンが伸びている間は、リンクを開くのを少し遅らせる、またはクリックを無効にするなどの考慮が必要
            // 今回はシンプルに、アニメーションと同時にリンクが開かれる動作になります。
            // アニメーション完了後にリンクを開きたい場合は、e.preventDefault() を有効にして
            // setTimeout で window.open(button.href, '_blank') を実行するなどの工夫が必要です。
        });
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

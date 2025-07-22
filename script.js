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
            }
        });
    });

    // 各リンクボタンのクリックイベント
    linkButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault(); // デフォルトのリンク動作を防止

            // クリックされたボタン以外の、展開されているボタンを閉じる
            linkButtons.forEach(btn => {
                if (btn !== button && btn.classList.contains('expanded')) {
                    btn.classList.remove('expanded');
                }
            });

            // クリックされたボタンの展開/折りたたみ
            button.classList.toggle('expanded');
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

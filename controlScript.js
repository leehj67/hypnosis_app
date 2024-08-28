document.addEventListener('DOMContentLoaded', () => {
    const targetImage = document.getElementById('control-target-image');
    const savedImage = localStorage.getItem('selectedImage');
    const backgroundMusic = document.getElementById('background-music');
    
    // 백그라운드 음악을 한 번만 재생하도록 설정
    if (backgroundMusic.paused) {
        backgroundMusic.play().catch(error => console.log("자동 재생이 차단되었습니다:", error));
    }

    // 저장된 이미지가 있을 경우 불러오기
    if (savedImage) {
        targetImage.src = savedImage;
    } else {
        console.error("저장된 이미지를 찾을 수 없습니다.");
    }

    const affectionSlider = document.getElementById('affection-slider');
    const sensitivitySlider = document.getElementById('sensitivity-slider');
    const sexualSlider = document.getElementById('sexual-slider');
    const effectSound = document.getElementById('effect-sound2');
    const hearts = document.querySelectorAll('.heart-animation');

    // 호감도: 하트 애니메이션 속도 조절
    affectionSlider.addEventListener('input', () => {
        const speed = 6 - (affectionSlider.value / 20); // 기본 6초에서 슬라이더 값에 따라 감소
        hearts.forEach(heart => {
            heart.style.animationDuration = `${speed}s`;
        });
    });

    // 민감도: 이미지 크기 조절
    sensitivitySlider.addEventListener('input', () => {
        const scale = 1 + (sensitivitySlider.value / 100); // 1배에서 슬라이더 값에 따라 최대 2배로 확대
        targetImage.style.transform = `scale(${scale})`;
    });

    // 성감도: 백그라운드 음악 볼륨 조절
    sexualSlider.addEventListener('input', () => {
        const volume = sexualSlider.value / 100; // 0에서 100까지의 값을 0.0에서 1.0으로 변환
        backgroundMusic.volume = volume; // 볼륨 조절
    });

    // 슬라이더에 따른 효과음 및 흔들림 효과
    [affectionSlider, sensitivitySlider, sexualSlider].forEach(slider => {
        slider.addEventListener('input', () => {
            const value = parseInt(slider.value, 10);
            if ([30, 60, 90].includes(value)) {
                // 애니메이션 시작
                targetImage.classList.add('shakeAndGrow');
                effectSound.play().catch(error => console.error('효과음 재생 실패:', error));
                
                // 애니메이션 끝나고 클래스 제거
                setTimeout(() => {
                    targetImage.classList.remove('shakeAndGrow');
                }, 500); // 애니메이션 지속 시간과 맞추기
            }
        });
    });
});

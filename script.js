const initialScreen = document.getElementById('initial-screen');
const selectTargetText = document.getElementById('select-target-text');
const uploadScreen = document.getElementById('upload-screen');
const fileInput = document.getElementById('file-input');
const hypnosisScreen = document.getElementById('hypnosis-screen');
const targetImage = document.getElementById('target-image');
const hearts = document.querySelectorAll('.heart-animation');
const gaugeContainer = document.querySelector('.gauge-container');
const gaugeBar = document.querySelector('.gauge-bar');
const text = document.getElementById('text');
const hypnoMusic = document.getElementById('hypno-music');
const effectSounds = [
    document.getElementById('effect-sound1'),
    document.getElementById('effect-sound2')
];
let effectSoundIndex = 0;

function playNextEffectSound() {
    if (effectSounds[effectSoundIndex]) {
        effectSounds[effectSoundIndex].play();
        effectSounds[effectSoundIndex].addEventListener('ended', () => {
            effectSoundIndex = (effectSoundIndex + 1) % effectSounds.length;
            playNextEffectSound();
        }, { once: true });
    }
}

function startGauge() {
    gaugeContainer.style.visibility = 'visible'; // 게이지 컨테이너 보이기
    gaugeBar.style.width = '0%'; // 게이지 바를 빈 상태로 시작
    setTimeout(() => {
        gaugeBar.style.width = '100%'; // 게이지 바를 차오르게 함
    }, 100); // 약간의 지연 후 시작

    hypnoMusic.play().catch(error => {
        console.error('Failed to play hypno music:', error);
    });

    setTimeout(() => {
        text.textContent = '최면완료!';
        gaugeContainer.style.visibility = 'hidden'; // 게이지 컨테이너 숨기기
        hypnoMusic.pause();
        hypnoMusic.currentTime = 0;
        playNextEffectSound();
        
        createControlButtons(); // 최면 완료 시 버튼 생성 함수 호출
    }, 20000);
}

function createControlButtons() {
    const buttonsContainer = document.createElement('div');
    buttonsContainer.id = 'buttons-container';
    buttonsContainer.style.display = 'flex';
    buttonsContainer.style.gap = '20px';
    buttonsContainer.style.marginTop = '20px';

    const resetButton = document.createElement('button');
    resetButton.textContent = '최면 대상 재선정';
    resetButton.addEventListener('click', resetPage);

    const controlButton = document.createElement('button');
    controlButton.textContent = '대상 감도 조절';
    controlButton.addEventListener('click', () => {
        window.location.href = 'control.html';
    });

    buttonsContainer.appendChild(resetButton);
    buttonsContainer.appendChild(controlButton);

    // 최면 완료 메시지 아래에 버튼 컨테이너 추가
    text.parentNode.insertBefore(buttonsContainer, text.nextSibling);
}

function resetPage() {
    effectSounds.forEach(sound => {
        sound.pause();
        sound.currentTime = 0;
    });
    location.reload();
}

document.addEventListener('DOMContentLoaded', () => {
    selectTargetText.addEventListener('click', () => {
        initialScreen.classList.add('hidden');
        uploadScreen.classList.remove('hidden');
    });

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                targetImage.src = e.target.result;
                localStorage.setItem('selectedImage', e.target.result); // 이미지 저장
                uploadScreen.classList.add('hidden');
                hypnosisScreen.classList.remove('hidden');
                startGauge();
            };
            reader.readAsDataURL(file);
        }
    });

    hearts.forEach((heart, index) => {
        heart.style.animationDelay = `${index * 2}s`; // 각 하트 애니메이션의 시작 시간 지연
    });
});

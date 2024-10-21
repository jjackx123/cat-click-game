let timeLeft = 10; // 遊戲時間
let clickCount = 0; // 點擊次數
let timer; // 計時器
let bestScore = localStorage.getItem("bestScore") || 0; // 取得已保存的最高分，若無則預設為 0
let catImageToggle = true; // 用於切換貓咪圖片

const timeDisplay = document.getElementById("time");
const catImage = document.getElementById("catImage");
const startButton = document.getElementById("startButton");
const clickCountDisplay = document.getElementById("clickCount");
const bestScoreDisplay = document.getElementById("bestScore"); // 顯示最高分數
const downloadButton = document.getElementById("downloadButton");
const catSound = document.getElementById("catSound"); // 音效元素

// 初始顯示最高分數
bestScoreDisplay.textContent = bestScore;

// 在遊戲開始之前，禁用圖片的點擊事件
catImage.style.pointerEvents = "none"; // 禁用圖片點擊

function startGame() {
    clickCount = 0; // 重置點擊次數
    clickCountDisplay.textContent = clickCount;
    timeLeft = 10; // 重置時間
    timeDisplay.textContent = timeLeft;
    catImage.style.pointerEvents = "auto"; // 啟用貓咪圖片點擊
    startButton.disabled = true; // 禁用開始按鈕
    downloadButton.disabled = true; // 禁用下載按鈕

    // 每秒減少時間
    timer = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    clearInterval(timer); // 停止計時
    catImage.style.pointerEvents = "none"; // 禁用點擊貓咪
    startButton.disabled = false; // 啟用開始按鈕
    downloadButton.disabled = false; // 啟用下載按鈕

    // 檢查並更新最高分數
    if (clickCount > bestScore) {
        bestScore = clickCount;
        bestScoreDisplay.textContent = bestScore;
        localStorage.setItem("bestScore", bestScore); // 將最高分數存到 LocalStorage
        alert(`遊戲結束！恭喜你創下新紀錄：${clickCount} 次！`);
    } else {
        alert(`遊戲結束！你的總點擊次數是：${clickCount}`);
    }
}

// 點擊下載按鈕生成分數文件
downloadButton.addEventListener("click", () => {
    const data = `你的總點擊次數是：${clickCount}\n最高分數：${bestScore}`;
    const blob = new Blob([data], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cat_click_game_score.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
});

// 點擊貓咪圖片時切換圖片並播放音效
catImage.addEventListener("mousedown", () => {
    clickCount++;
    clickCountDisplay.textContent = clickCount;

    // 切換到第二張圖片並播放音效
    catImage.src = "cat2.png";
    catSound.play(); // 播放音效
});

// 放開鼠標時切換回第一張圖片並停止音效
catImage.addEventListener("mouseup", () => {
    catImage.src = "cat1.png"; // 切換回第一張圖片
    catSound.pause(); // 停止音效
    catSound.currentTime = 0; // 重置音效播放時間
});

startButton.addEventListener("click", startGame);

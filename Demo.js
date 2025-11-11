// Biến lưu trữ kết quả đúng
let correctAnswer;

// Biến lưu trữ phép toán (+ hoặc -)
let operation;

/**
 * Hàm tạo bài toán mới.
 */
function generateProblem() {
    // 1. Tạo ngẫu nhiên hai số (từ 1 đến 20)
    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = Math.floor(Math.random() * 20) + 1;
    
    // 2. Chọn ngẫu nhiên phép toán (+ hoặc -)
    operation = Math.random() < 0.5 ? '+' : '-';

    let problemString;
    
    // Đảm bảo phép trừ không ra số âm (chỉ để demo đơn giản)
    if (operation === '-' && num1 < num2) {
        // Hoán đổi vị trí để số lớn trừ số bé
        problemString = `${num2} - ${num1} = ?`;
        correctAnswer = num2 - num1;
    } else if (operation === '-') {
        problemString = `${num1} - ${num2} = ?`;
        correctAnswer = num1 - num2;
    } else { // Phép cộng
        problemString = `${num1} + ${num2} = ?`;
        correctAnswer = num1 + num2;
    }

    // Hiển thị bài toán trên giao diện
    document.getElementById('problem').textContent = problemString;
    
    // Xóa kết quả và ô input cũ
    document.getElementById('result').textContent = '';
    document.getElementById('answer-input').value = '';
    document.getElementById('answer-input').focus(); // Đặt focus vào ô nhập
}

/**
 * Hàm kiểm tra câu trả lời của người dùng.
 */
function checkAnswer() {
    // Lấy giá trị từ ô input
    const userAnswer = parseInt(document.getElementById('answer-input').value);
    const resultElement = document.getElementById('result');

    // Kiểm tra xem người dùng đã nhập số chưa
    if (isNaN(userAnswer)) {
        resultElement.textContent = 'Vui lòng nhập một số!';
        resultElement.className = 'incorrect';
        return;
    }

    // So sánh với kết quả đúng
    if (userAnswer === correctAnswer) {
        resultElement.textContent = '✅ Chính xác! Tuyệt vời!';
        resultElement.className = 'correct';
        
        // Tạo bài toán mới sau một giây
        setTimeout(generateProblem, 1000); 
    } else {
        resultElement.textContent = `❌ Sai rồi! Đáp án đúng là ${correctAnswer}.`;
        resultElement.className = 'incorrect';
        
        // Vẫn giữ bài toán, chỉ xóa input để người dùng thử lại
        document.getElementById('answer-input').value = ''; 
        document.getElementById('answer-input').focus();
    }
}

// Bắt đầu ứng dụng khi trang web được tải
document.addEventListener('DOMContentLoaded', () => {
    generateProblem(); // Tạo bài toán đầu tiên

    // Gắn sự kiện cho nút "Kiểm Tra"
    document.getElementById('submit-btn').addEventListener('click', checkAnswer);
    
    // Gắn sự kiện "Enter" để kiểm tra (từ ô input)
    document.getElementById('answer-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkAnswer();
        }
    });
});
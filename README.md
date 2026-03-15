# Mental Math Game - Trò Chơi Tính Nhẩm

Chào mừng bạn đến với **Mental Math Game**, một ứng dụng web đơn giản giúp bạn rèn luyện khả năng tính nhẩm với giao diện hiện đại và bắt mắt.

## Cách khởi động

Để bắt đầu chơi, bạn chỉ cần làm theo các bước sau:

1. Tải toàn bộ mã nguồn về máy tính.
2. Mở file `index.html` bằng bất kỳ trình duyệt web nào (Chrome, Firefox, Edge, v.v.).
3. Nhấn nút **"Bắt đầu ngay"** để bắt đầu thử thách!

## Chức năng

Mã nguồn được tổ chức thành 3 phần chính:

### 1. Giao diện (HTML/CSS)

- **`index.html`**: Định nghĩa cấu trúc của trò chơi, bao gồm màn hình bắt đầu và màn hình chơi game.
- **`styles.css`**: Cung cấp giao diện "Glassmorphism" hiện đại với nền tối, các khối mờ ảo và hiệu ứng chuyển động mượt mà.

### 2. Logic trò chơi (JavaScript)

- **Tạo phép tính ngẫu nhiên**: Hệ thống tự động tạo ra các phép tính dựa trên quy tắc:
  - **Cộng/Trừ**: 2 số từ 1-4 chữ số.
  - **Nhân**: 2 số từ 1-3 chữ số (tránh nhân hai số 3 chữ số để giữ độ khó vừa phải).
  - **Chia**: Đảm bảo số bị chia (2-5 chữ số) chia hết cho số chia (1-2 chữ số).
- **Phản hồi người dùng**:
  - Nếu trả lời đúng: Hiển thị thông báo thành công và tự động chuyển câu hỏi sau 2 giây.
  - Nếu trả lời sai: Hiển thị đáp án đúng và yêu cầu người dùng nhấn nút "Tiếp" để tiếp tục.
- **Không giới hạn**: Trò chơi diễn ra vô tận cho đến khi người dùng chọn dừng lại.

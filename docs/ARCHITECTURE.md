# Kiến trúc StudyFlow

## Lựa chọn công nghệ

HTML, CSS và JavaScript ES modules. Không có runtime dependency, không dùng CDN, không cần bundler. Node.js chỉ dùng cho server phát triển, kiểm thử và sao chép bản build. GitHub Pages phục vụ nội dung tĩnh; không chạy C++ hoặc backend. Nếu cần backend C++ trong tương lai, phải triển khai ở dịch vụ khác rồi kết nối qua API.

## Luồng xử lý

1. `load()` đọc khóa `studyflow:data:v1` và `validate()` kiểm tra dữ liệu.
2. `app.js` dựng giao diện theo hash: `#calendar`, `#subjects`, `#notes`, `#assessments`, `#settings`.
3. Các view chỉ tạo HTML; `ui.js` escape dữ liệu trước khi ghép HTML.
4. Khi lưu, sao chép state bằng `structuredClone`, kiểm tra bản mới, rồi ghi localStorage.
5. Chỉ sau khi ghi thành công mới đổi state hiển thị. Nếu hết dung lượng, bản đang lưu không bị thay bằng state chưa ghi được.
6. Export tạo Blob tải xuống; import đọc tối đa 5 MB, kiểm tra toàn bộ trước khi hỏi xác nhận thay thế.

## Schema phiên bản 1

```typescript
type Subject = {
  id: string; name: string;
  category: 'math' | 'code' | 'physical' | 'other';
  teacher: string; goal: string;
};
type StudyEvent = {
  id: string; subjectId: string; title: string;
  date: string; // YYYY-MM-DD
  start: string; end: string; // HH:mm
  location: string; detail: string;
  status: 'planned' | 'done' | 'missed';
};
type Note = {
  id: string; subjectId: string; title: string;
  date: string; body: string;
  links: { label: string; url: string }[];
};
type Assessment = {
  id: string; subjectId: string; date: string;
  understanding: number; practice: number; confidence: number; // 1..5
  reflection: string; nextStep: string;
};
type Data = {
  version: 1; subjects: Subject[]; events: StudyEvent[];
  notes: Note[]; assessments: Assessment[];
};
```

ID tạo bằng `crypto.randomUUID()`, được kiểm tra duy nhất trong toàn bộ dữ liệu. Xóa môn học cascade vào ba collection con. Các phiên học lặp là các bản ghi độc lập.

## Các quy tắc quan trọng

- Kiểm tra ngày thực tế, kể cả năm nhuận; thao tác ngày dùng giữa trưa theo giờ địa phương để tránh lùi ngày do chuyển UTC.
- Trùng giờ nếu cùng ngày và `a.start < b.end && b.start < a.end`; hai buổi nối tiếp không trùng.
- Chỉ cho URL HTTP/HTTPS, link mở tab mới với `noopener noreferrer`.
- Input người dùng luôn được escape, không hỗ trợ HTML trong ghi chú.
- File JSON nhập không được thực thi. Kiểm tra version, độ dài, số bản ghi, khóa ngoại, ID, thời gian và điểm số.
- Nếu dữ liệu lưu lỗi, không tự ghi đè. Người dùng có thể tải bản gốc, nhập backup hợp lệ hoặc xác nhận xóa.

## Mở rộng

Muốn thêm nhóm môn: sửa `categories` trong `model.js`. Form và màu tự lấy theo cấu hình này. Nếu đổi schema, bổ sung migration có version; tránh thay khóa lưu trữ khiến người dùng tưởng dữ liệu bị mất.

Để có đồng bộ thiết bị: thêm dịch vụ backend, xác thực và phân quyền cho từng người dùng. Không đặt khóa bí mật trong JavaScript phía trình duyệt. Chỉ thêm backend khi có nhu cầu; bản hiện tại được thiết kế chạy độc lập trên GitHub Pages.

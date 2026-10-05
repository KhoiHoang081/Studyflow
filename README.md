# StudyFlow — Quản lý học tập cá nhân

Ứng dụng web tiếng Việt giúp quản lý lịch học, môn học, ghi chú, liên kết tài liệu và lịch sử tự đánh giá. Chạy trên **GitHub Pages**, không cần backend, tài khoản hay API key.

> Dữ liệu lưu trong **localStorage của trình duyệt**, không lưu vào repository GitHub và không tự đồng bộ giữa các thiết bị. Hãy xuất bản sao lưu JSON định kỳ.

## Tính năng

- **Lịch tuần / tháng:** thêm, xem chi tiết, chỉnh sửa, xóa buổi học; về hôm nay; chuyển tuần/tháng; tìm kiếm và lọc theo môn.
- **Lịch lặp:** tạo 2, 4, 8 hoặc 16 buổi hàng tuần. Mỗi buổi độc lập, sửa/xóa riêng từng buổi.
- **Cảnh báo trùng giờ:** kiểm tra cả lịch của các môn khác; cho phép lưu nếu bạn xác nhận.
- **Theo dõi trạng thái:** sắp học, hoàn thành, đã bỏ lỡ.
- **Quản lý môn:** tên, nhóm, giảng viên, mục tiêu; xóa có xác nhận và dọn dữ liệu liên quan.
- **Màu theo đặc tính:** Toán học xanh dương, Lập trình tím, Thể chất xanh lá, Khác cam. Nhãn chữ đi cùng màu.
- **Ghi chú riêng từng môn:** nội dung nhiều dòng, ngày ghi, nhiều liên kết tài liệu.
- **Tự đánh giá:** hiểu bài, thực hành, tự tin theo thang 1–5; nhận xét và kế hoạch học tiếp; giữ lịch sử.
- **Sao lưu:** xuất/nhập JSON, kiểm tra cấu trúc, tham chiếu môn học, ngày giờ và URL trước khi thay dữ liệu.
- **Bảo vệ dữ liệu:** báo lỗi lưu, không tự ghi đè dữ liệu bị hỏng; có nút tải dữ liệu gốc để phục hồi.
- **Giao diện responsive:** dùng trên máy tính và điện thoại; bảng lịch cuộn ngang trên màn hình nhỏ.
- **Dữ liệu minh họa tùy chọn**, không tự trộn vào dữ liệu thật.
- **GitHub Actions:** kiểm thử và triển khai GitHub Pages; kiểm tra pull request.

## Chạy trên máy

Cài Node.js 20 trở lên (khuyên dùng Node.js 22), mở terminal trong thư mục có `package.json`:

```bash
npm start
```

Mở **http://localhost:4173**. Nhấn `Ctrl+C` để dừng.

**Không cần `npm install`**: dự án không có thư viện ngoài. Không mở bằng cách nhấp đúp `index.html`, vì trình duyệt có thể chặn ES modules trên `file://`.

Có thể dùng Python thay cho Node để chạy thử giao diện:

```bash
python -m http.server 4173
```

Cách Python chỉ phục vụ file; kiểm thử và đóng gói vẫn dùng Node.js.

## Đưa lên GitHub và chạy website

### 1. Tạo repository

Tạo repository mới tên `studyflow` trên GitHub. Chọn **Public** nếu dùng GitHub Pages với tài khoản GitHub Free. Để trống các lựa chọn tự tạo README, LICENSE và .gitignore vì dự án đã có sẵn.

### 2. Push mã nguồn

Giải nén, mở terminal **bên trong thư mục `studyflow`** chứa `README.md`, `package.json` và `index.html`:

```bash
git init
git add .
git commit -m "feat: build StudyFlow learning manager"
git branch -M main
git remote add origin https://github.com/KhoiHoang081/Studyflow.git
git push -u origin main
```

Nếu bạn đặt tên repository khác, đổi URL `origin` tương ứng. Đăng nhập GitHub bằng Git Credential Manager khi Git yêu cầu; không đặt token trong mã nguồn.

### 3. Bật GitHub Pages

1. Mở repository → **Settings → Pages**.
2. Trong **Build and deployment → Source**, chọn **GitHub Actions**.
3. Mở **Actions → Deploy StudyFlow to GitHub Pages → Run workflow**, chọn nhánh `main`, chạy.
4. Chờ workflow hoàn thành; mở URL ở bước deploy hoặc **Settings → Pages**.

Với repository `KhoiHoang081/Studyflow`, URL dự kiến là:

```text
https://khoihoang081.github.io/Studyflow/
```

Đây là URL dự kiến, chỉ hoạt động sau khi bạn tạo repository và triển khai thành công. Những lần push tiếp theo vào `main` sẽ tự chạy kiểm thử, build và deploy.

> Lần push đầu có thể chạy trước khi Pages được bật. Sau khi bật Pages, chạy lại workflow. Nếu repository thuộc tổ chức có hạn chế Actions/Pages, cần quyền phù hợp.

Hướng dẫn chính thức: [Cấu hình nguồn xuất bản](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) · [Workflow GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Bắt đầu sử dụng

1. Vào **Môn học → Tạo môn học**, điền tên, nhóm, mục tiêu và giảng viên nếu có.
2. Vào **Lịch học → Thêm buổi học**, chọn ngày, giờ và nội dung chi tiết.
3. Bấm thẻ buổi học để sửa, đánh dấu hoàn thành hoặc xóa.
4. Vào **Ghi chú & tài liệu → Tạo ghi chú** để ghi nội dung và dán link tài liệu.
5. Vào **Tự đánh giá → Viết đánh giá** để lưu nhận xét và kế hoạch.
6. Vào **Dữ liệu & hướng dẫn → Xuất bản sao lưu JSON** định kỳ.

Muốn khám phá nhanh: vào **Dữ liệu & hướng dẫn → Nạp dữ liệu minh họa**. Thao tác này thay thế dữ liệu hiện tại sau khi xác nhận nếu đã có dữ liệu.

### Gắn tài liệu

Upload file vào Google Drive, OneDrive hoặc nơi lưu trữ của bạn, lấy liên kết chia sẻ rồi nhập mỗi dòng theo dạng:

```text
Giáo trình Giải tích | https://example.com/giao-trinh.pdf
Bài tập tuần 1 | https://example.com/bai-tap
```

StudyFlow **lưu liên kết**, không upload nhị phân, không cấp quyền truy cập thay dịch vụ gốc. Chỉ chấp nhận HTTP/HTTPS. Nội dung ghi chú là văn bản thuần, không chạy HTML hay JavaScript.

### Công thức tự đánh giá

```text
Điểm tổng hợp = round((Hiểu bài + Thực hành + Tự tin) / 15 × 100)
80–100%: Nắm vững
60–79%: Đang tiến bộ
Dưới 60%: Cần ôn tập
```

Thang 1–5 nên điểm tối thiểu là 20%. Đây là chỉ số tự nhận xét, không phải điểm thi/GPA, không phải AI đánh giá. Thẻ môn học hiển thị đánh giá có ngày mới nhất; cùng ngày thì lần lưu gần nhất được ưu tiên.

## Cấu trúc thư mục

| Đường dẫn | Trách nhiệm |
|---|---|
| `index.html` | Điểm vào ứng dụng |
| `src/app.js` | Điều phối trạng thái, điều hướng, CRUD và sự kiện |
| `src/core/model.js` | Mô hình, kiểm tra dữ liệu, ngày giờ, điểm số, dữ liệu minh họa |
| `src/core/storage.js` | Đọc/ghi localStorage và xuất JSON |
| `src/components/ui.js` | Thành phần biểu mẫu, modal, escaping văn bản |
| `src/views/calendar.js` | Lịch tuần/tháng, tìm kiếm, lọc |
| `src/views/subjects.js` | Danh sách và tiến độ tự đánh giá môn |
| `src/views/notebook.js` | Ghi chú, tài liệu, lịch sử đánh giá |
| `src/views/settings.js` | Sao lưu, khôi phục, hướng dẫn |
| `src/styles/app.css` | Giao diện và responsive |
| `assets/` | Biểu tượng ứng dụng |
| `scripts/` | Server phát triển và build tĩnh |
| `tests/` | Kiểm thử tính đúng đắn của nghiệp vụ |
| `docs/` | Kiến trúc, kiểm thử, xử lý sự cố, ảnh giao diện |
| `.github/workflows/` | CI và triển khai Pages |
| `dist/` | Bản build được tạo tự động, không commit |

## Kiểm tra và build

```bash
npm test
npm run build
```

Build chỉ sao chép tài nguyên cần chạy vào `dist/`; không đưa README, tests hoặc dữ liệu học tập vào bản triển khai. Tất cả đường dẫn tài nguyên tương đối nên chạy được dưới `/studyflow/` hoặc một tên repository khác.

## Giới hạn cần biết

- Không đăng nhập, không đồng bộ đám mây, không chia sẻ lịch đa người dùng.
- Dữ liệu tách theo origin, hồ sơ trình duyệt và thiết bị. Đổi địa chỉ website hoặc đổi trình duyệt cần xuất/nhập JSON. Hai bản StudyFlow trên cùng origin dùng chung khóa lưu trữ.
- Xóa dữ liệu trình duyệt hoặc dùng chế độ riêng tư có thể làm mất dữ liệu. Dung lượng localStorage bị giới hạn theo trình duyệt.
- Không có thông báo nền, tích hợp Google Calendar hay lịch thi tự động.
- Buổi học nằm trong cùng một ngày; giờ kết thúc phải sau giờ bắt đầu. Không hỗ trợ buổi qua nửa đêm.
- Ngày giờ theo lịch địa phương, không tự chuyển múi giờ. Nên nhập tối đa vài nghìn bản ghi cho ứng dụng cá nhân.
- Nhiều tab được cập nhật khi có thay đổi lưu trữ; đây không phải hệ thống cộng tác có kiểm soát xung đột.
- Xóa là vĩnh viễn trong ứng dụng; khôi phục bằng bản sao lưu đã xuất trước đó.

Xem [Kiến trúc](docs/ARCHITECTURE.md), [Kiểm thử](docs/TESTING.md), [Xử lý sự cố](docs/TROUBLESHOOTING.md), [Đóng góp](CONTRIBUTING.md).

## Giấy phép

MIT — xem [LICENSE](LICENSE).

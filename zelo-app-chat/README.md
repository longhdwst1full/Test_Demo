 
 
 
## Deploy

- Yêu cầu: có cài Docker
- File nginx.conf: dòng 23 sửa lại thành tên miền của mình.
- Folder ssl: cung cấp key để chứng thực ssl tên miền.
- File docker-compose.yml: cung cấp env cho mấy cái để trống. 
- Chạy lệnh: docker-compose up -d
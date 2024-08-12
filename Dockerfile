# Sử dụng Node.js image từ Docker Hub
FROM node:18

# Thiết lập thư mục làm việc
WORKDIR /usr/src/app

# Sao chép package.json và package-lock.json
COPY package*.json ./

# Cài đặt các phụ thuộc
RUN npm install

# Sao chép toàn bộ mã nguồn
COPY . .

# Expose port 3000
EXPOSE 3000

# Chạy ứng dụng
CMD ["node", "index.js"]

const express = require("express");
const redis = require("redis");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Kết nối tới Redis server
const client = redis.createClient({
  host: "redis",
  port: 6379,
});

client.on("connect", () => {
  console.log("Đã kết nối đến Redis server");
});

client.on("error", (err) => {
  console.log("Lỗi Redis: " + err);
});

app.use(bodyParser.json());

// Tạo một mục mới
app.post("/item", (req, res) => {
  const { id, value } = req.body;
  client.set(id, value, (err, reply) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send("Mục đã được thêm: " + reply);
    }
  });
});

// Đọc một mục
app.get("/item/:id", (req, res) => {
  const id = req.params.id;
  client.get(id, (err, reply) => {
    if (err) {
      res.status(500).send(err);
    } else if (reply) {
      res.send("Giá trị của " + id + ": " + reply);
    } else {
      res.status(404).send("Mục không tồn tại");
    }
  });
});

// Cập nhật một mục
app.put("/item/:id", (req, res) => {
  const id = req.params.id;
  const { value } = req.body;
  client.set(id, value, (err, reply) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send("Mục đã được cập nhật: " + reply);
    }
  });
});

// Xóa một mục
app.delete("/item/:id", (req, res) => {
  const id = req.params.id;
  client.del(id, (err, reply) => {
    if (err) {
      res.status(500).send(err);
    } else if (reply) {
      res.send("Mục đã được xóa: " + reply);
    } else {
      res.status(404).send("Mục không tồn tại");
    }
  });
});

app.listen(port, () => {
  console.log(`Ứng dụng đang chạy tại http://localhost:${port}`);
});

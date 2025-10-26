import bcrypt from "bcryptjs";

(async () => {
  const plain = process.argv[2] || "password123";
  const hash = bcrypt.hashSync(plain, 10);
  console.log(hash);
})();

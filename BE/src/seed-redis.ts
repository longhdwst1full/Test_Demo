import bcryptjs from "bcryptjs";
import * as cache from "./cache";
import dotenv from "dotenv";

dotenv.config();

async function seed() {
  try {
    console.log("\n🌱 Seeding Redis with users and products...\n");

    // Seed users
    const users = [
      { username: "alice", password: "password123" },
      { username: "bob", password: "secret456" },
      { username: "charlie", password: "test789" },
    ];

    console.log("📝 Seeding Users:");
    for (const user of users) {
      const hashedPassword = bcryptjs.hashSync(user.password, 10);

      // Store user info
      await cache.set(
        `user:${user.username}`,
        JSON.stringify({ username: user.username, id: user.username }),
        3600 // 1 hour TTL
      );

      // Store hashed password
      await cache.set(
        `password:${user.username}`,
        hashedPassword,
        3600 // 1 hour TTL
      );

      console.log(`  ✓ ${user.username} / ${user.password}`);
    }

    // Seed products
    console.log("\n🛍️  Seeding Products:");
    const products = [
      { id: 1, name: "Laptop", price: 999.99, stock: 10 },
      { id: 2, name: "Mouse", price: 29.99, stock: 50 },
      { id: 3, name: "Keyboard", price: 79.99, stock: 25 },
      { id: 4, name: "Monitor", price: 299.99, stock: 8 },
      { id: 5, name: "Headphones", price: 149.99, stock: 30 },
    ];

    for (const product of products) {
      // Cache each product individually
      await cache.set(
        `product:${product.id}`,
        JSON.stringify(product),
        600 // 10 minutes TTL
      );
      console.log(
        `  ✓ Product ${product.id}: ${product.name} - $${product.price}`
      );
    }

    // Cache products list
    await cache.set("products:list", JSON.stringify(products), 300); // 5 minutes TTL
    console.log(`  ✓ Products list cached`);

    // Initialize metrics
    console.log("\n📊 Initializing Metrics:");
    await cache.set("metrics:login_cache_hits", "0", 86400);
    await cache.set("metrics:login_cache_misses", "0", 86400);
    await cache.set("metrics:products_cache_hits", "0", 86400);
    await cache.set("metrics:products_cache_misses", "0", 86400);
    console.log(`  ✓ Metrics initialized`);

    console.log("\n✅ Seed completed successfully!\n");
    console.log("🚀 Ready to test:");
    console.log(
      "  - Login with: alice/password123, bob/secret456, charlie/test789"
    );
    console.log("  - Visit http://localhost:3000 to use the web interface\n");

    process.exit(0);
  } catch (err) {
    console.error("❌ Seed error:", err);
    process.exit(1);
  }
}

seed();

import * as cheerio from "cheerio";
import axios from "axios";
import fs from "fs";
import express from "express";

const getHTML = async (url) => {
  const { data: html } = await axios.get(url);
  return html;
};

const scrapeJobs = async () => {
  const html = await getHTML("https://123job.vn/tuyen-dung");
  const $ = cheerio.load(html);
  const data = [];

  $(".job__list-item").each((_, el) => {
    const job = $(el).find(".job__list-item-title a").text().trim();
    const company = $(el).find(".job__list-item-company span").text().trim();
    const address = $(el).find(".job__list-item-info .address").text().trim();
    const salary = $(el).find(".job__list-item-info .salary").text().trim();

    data.push({ job, company, address, salary });
  });

  return data;
};

const scrapePhone = async () => {
  const html = await getHTML("https://www.thegioididong.com/dtdd");
  const $ = cheerio.load(html);
  const data = [];

  $("li.item").each((_, el) => {
    const img = $(el).find("div.item-img img").attr("src");
    const product__name = $(el).find("h3").text();
    const price = $(el).find("a").find("strong.price").text().trim();

    data.push({ img, product__name, price });
  });

  return data;
};

const saveDataToFile = async (scrapeFunction, fileName) => {
  try {
    const data = await scrapeFunction();
    fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(`Error scraping data for ${fileName}:`, error);
  }
};

saveDataToFile(scrapeJobs, "data.json");
saveDataToFile(scrapePhone, "IPHONE.json");

const app = express();
const PORT = process.env.PORT || 3001;

app.get("/jobs", async (req, res) => {
  try {
    const data = await scrapeJobs();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error scraping jobs" });
  }
});

app.get("/dienthoai", async (req, res) => {
  try {
    const data = await scrapePhone();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error scraping phones" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

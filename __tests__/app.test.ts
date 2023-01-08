import request from "supertest";
import app from "../src/app";
import path from "path";

describe("App app.ts", () => {
  test("/hello path", async () => {
    const res = await request(app).get("/hello");
    expect(res.text).toEqual("Hello from Application");
  });
});

describe("Upload file", () => {
  test("/upload", async () => {
    const imagePath = path.resolve(__dirname, `test.jpg`);
    const res = await request(app).post("/upload").attach("images", imagePath);
    expect(res.text).toEqual("1 files queued");
  });
});

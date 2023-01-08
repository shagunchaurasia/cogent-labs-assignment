import request from "supertest";
import app from "../src/app";
import path from "path";
import fs from "fs";

describe("App /hello", () => {
  test("Hello get api", async () => {
    const response = await request(app).get("/hello");
    expect(response.statusCode).toBe(200);
    expect(response.text).toEqual("Hello from Application");
  });
});

describe("Upload file /upload", () => {
  test("Upload single file", async () => {
    const imagePath = path.resolve(__dirname, `test.jpg`);
    const response = await request(app)
      .post("/upload")
      .attach("images", imagePath);
    expect(response.statusCode).toBe(200);
    expect(response.text).toEqual("1 files queued");
  });
});

describe("No files attached /upload", () => {
  test("If no files are attached", async () => {
    const response = await request(app).post("/upload");
    expect(response.statusCode).toBe(400);
    expect(response.text).toBe("Files not attached. Please check the request");
  });
});

describe("Upload multiple files /upload", () => {
  test("Multiple Files are uploaded", async () => {
    const imagePath1 = path.resolve(__dirname, `test.jpg`);
    const imagePath2 = path.resolve(__dirname, `test.jpg`);
    const imagePath3 = path.resolve(__dirname, `test.jpg`);
    const imagePath4 = path.resolve(__dirname, `test.jpg`);
    const imagePath5 = path.resolve(__dirname, `test.jpg`);
    const imagePath6 = path.resolve(__dirname, `test.jpg`);
    const imagePath7 = path.resolve(__dirname, `test.jpg`);
    const imagePath8 = path.resolve(__dirname, `test.jpg`);
    const response = await request(app)
      .post("/upload")
      .attach("images", imagePath1)
      .attach("images", imagePath2)
      .attach("images", imagePath3)
      .attach("images", imagePath4)
      .attach("images", imagePath5)
      .attach("images", imagePath6)
      .attach("images", imagePath7)
      .attach("images", imagePath8);
    expect(response.statusCode).toBe(200);
    expect(response.text).toEqual("8 files queued");
  });
});

describe("Upload invalid files /upload", () => {
  test("Invalid file is uploaded", async () => {
    const invalidFile = path.resolve(__dirname, `invalid.txt`);
    const response = await request(app)
      .post("/upload")
      .attach("images", invalidFile);
    expect(response.statusCode).toBe(500);
    expect(response.text).toBe("File not uploaded. Please check the format");
  });
});

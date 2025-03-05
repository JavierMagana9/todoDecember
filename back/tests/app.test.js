const request = require("supertest");
const app = require("../../back/app");

describe("Smoke Test for app.js", () => {
  test("GET / should return 'Hello World!'", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.text).toBe("Hello World!");
  });
});
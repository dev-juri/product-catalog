const app = require("../../app");
const request = require("supertest");
const { disconnectDB, connectDB } = require("../../config/database");

describe("Application", () => {

  beforeAll(() => {
    connectDB();
  })

  afterAll(() => {
    disconnectDB();
  });
  
  it("should respond to GET", async () => {
    const response = await request(app).get("/");

    expect(response.status).toBe(404);
  });
});

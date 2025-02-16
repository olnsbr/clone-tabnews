import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
});

describe("POST /api/v1/migrations", () => {
  describe("Anonymous user", () => {
    describe("Running pending migrations", () => {
      test("for the first time", async () => {
        const response1 = await fetch("http://localhost:3000/api/v1/migrations", {
          method: "POST",
        });
        expect(response1.status).toBe(201);

        const responseBody = await response1.json();

        expect(Array.isArray(responseBody)).toBe(true);
        expect(responseBody.length).toBeGreaterThan(0);
      });
      test("for the second time", async () => {
        const response2 = await fetch("http://localhost:3000/api/v1/migrations", {
          method: "POST",
        });
        expect(response2.status).toBe(200);

        const responseBody2 = await response2.json();

        expect(Array.isArray(responseBody2)).toBe(true);
        expect(responseBody2.length).toBe(0);
      });
    })
  })
})

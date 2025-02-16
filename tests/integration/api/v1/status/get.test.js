import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("GET /api/v1/status", () => {
  describe("Anonymous user", () => {
    test("retriving current system status", async () => {
      const response = await fetch("http://localhost:3000/api/v1/status");
      expect(response.status).toBe(200);

      const body = await response.json();

      const parsedData = new Date(body.updated_at).toISOString();
      expect(body.updated_at).toEqual(parsedData);

      const dependencies = body.dependencies;
      const database = dependencies.database;

      expect(database.version).toEqual(16);
      expect(database.max_connections).toEqual(100);
      expect(database.opened_connections).toEqual(1);
    });
  });
});

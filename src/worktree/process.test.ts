import { describe, expect, it } from "bun:test";
import { spawnHeadlessAgent } from "./process.ts";

describe("spawnHeadlessAgent", () => {
	it("spawns a command and returns a valid PID", async () => {
		const proc = await spawnHeadlessAgent(["echo", "hello"], {
			cwd: process.cwd(),
			env: { ...(process.env as Record<string, string>) },
		});
		expect(typeof proc.pid).toBe("number");
		expect(proc.pid).toBeGreaterThan(0);
		expect(proc.stdout).toBeDefined();
		expect(proc.stdin).toBeDefined();
	});

	it("throws AgentError when argv is empty", async () => {
		await expect(spawnHeadlessAgent([], { cwd: process.cwd(), env: {} })).rejects.toThrow(
			"empty argv",
		);
	});
});

import { readFile } from "fs/promises"
import { join } from "path"
import { stringify, UserFlow } from "@puppeteer/replay"
import { Extension } from "."
import flow from "./fixtures/Example.json"

test("Extension", async () => {
  expect(
    await stringify(flow as UserFlow, { extension: new Extension() }),
  ).toBe(await readFile(join(__dirname, "fixtures/example.test.js"), "utf8"))
})

import { readFile } from "fs/promises"
import { join } from "path"
import {
  stringify,
  type Selector,
  type Step,
  type UserFlow,
} from "@puppeteer/replay"
import { Extension } from "."
import flow from "./fixtures/Example.json"
import { LineWriterImpl } from "./LineWriterImpl"

const extension = new Extension()
const selectors: Selector[] = [["aria/Test"], ["#test"]]

describe("Extension", () => {
  test("stringify", async () => {
    expect(await stringify(flow as UserFlow, { extension })).toBe(
      await readFile(join(__dirname, "fixtures/example.test.js"), "utf8"),
    )
  })

  describe("stringifyStep", () => {
    test.each<[Step, string]>([
      [
        {
          type: "click",
          selectors,
          offsetX: 0,
          offsetY: 0,
        },
        'await userEvent.click(screen.getByText("Test"))',
      ],
      [
        {
          type: "click",
          selectors,
          button: "secondary",
          offsetX: 0,
          offsetY: 0,
        },
        'await userEvent.click(screen.getByText("Test"), { buttons: 2 })',
      ],
      [
        {
          type: "navigate",
          url: "https://example.com/",
          assertedEvents: [
            {
              type: "navigation",
              url: "https://example.com/",
              title: "Example Domain",
            },
          ],
        },
        'expect(location.href).toBe("https://example.com/")\nexpect(document.title).toBe("Example Domain")',
      ],
      [
        {
          type: "waitForElement",
          selectors,
        },
        'await waitFor(() => screen.getByText("Test"))',
      ],
    ])("%p", async (step, expected) => {
      const writer = new LineWriterImpl("  ")
      await extension.stringifyStep(writer, step, { title: "", steps: [step] })
      expect(writer.toString()).toBe(expected)
    })
  })
})

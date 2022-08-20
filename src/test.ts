import { readFile } from "fs/promises"
import { join } from "path"
import {
  stringify,
  stringifyStep,
  type Selector,
  type Step,
  type UserFlow,
} from "@puppeteer/replay"
import { Extension } from "."
import flow from "./fixtures/Example.json"

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
          type: "change",
          selectors,
          value: "value",
        },
        'await userEvent.type(screen.getByText("Test"), "value")',
      ],
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
          type: "hover",
          selectors,
        },
        'await userEvent.hover(screen.getByText("Test"))',
      ],
      [
        {
          type: "doubleClick",
          selectors,
          offsetX: 0,
          offsetY: 0,
        },
        'await userEvent.dblClick(screen.getByText("Test"))',
      ],
      [
        {
          type: "keyDown",
          key: "Meta",
        },
        'await userEvent.keyboard("{Meta>}")',
      ],
      [
        {
          type: "keyUp",
          key: "Meta",
        },
        'await userEvent.keyboard("{/Meta}")',
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
      [
        {
          type: "waitForExpression",
          expression: "Promise.resolve()",
        },
        "await waitFor(() => Promise.resolve())",
      ],
    ])("%p", async (step, expected) => {
      expect(await stringifyStep(step, { extension })).toBe(`${expected}\n`)
    })
  })
})

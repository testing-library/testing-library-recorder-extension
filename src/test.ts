import { readFile } from "fs/promises"
import { join } from "path"
import {
  stringify,
  stringifyStep,
  type Selector,
  type Step,
  type UserFlow,
} from "@puppeteer/replay"
import { Extension, RecorderPlugin, stringifySelector } from "."
import flow from "./fixtures/Example.json"

const extension = new Extension()
const selectors: Selector[] = [["aria/Test"], ["#test"]]

describe("Extension", () => {
  describe("stringify", () => {
    test("fixture", async () => {
      expect(await stringify(flow as UserFlow, { extension })).toBe(
        await readFile(join(__dirname, "fixtures/example.test.js"), "utf8"),
      )
    })

    test("multiple navigate steps", async () => {
      const mock = jest.spyOn(console, "log").mockImplementation()
      await stringify(
        {
          title: "Example",
          steps: [
            {
              type: "navigate",
              url: "https://example.com/",
            },
            {
              type: "navigate",
              url: "https://example.com/",
            },
          ],
        },
        { extension },
      )
      expect(mock).toHaveBeenCalledWith(
        "Warning: Testing Library does not currently handle more than one navigation step per test.",
      )
    })

    test("unsupported", async () => {
      const mock = jest.spyOn(console, "log").mockImplementation()
      await stringify(
        {
          title: "Example",
          steps: [
            {
              type: "customStep",
              name: "step",
              parameters: {},
            },
          ],
        },
        { extension },
      )
      expect(mock).toHaveBeenCalledWith(
        "Warning: Testing Library does not currently handle migrating steps of type: customStep. Please check the output to see how this might affect your test.",
      )
    })
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
          type: "doubleClick",
          selectors,
          button: "secondary",
          offsetX: 0,
          offsetY: 0,
        },
        'await userEvent.dblClick(screen.getByText("Test"), { buttons: 2 })',
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
          type: "navigate",
          url: "https://example.com/",
          assertedEvents: [{ type: "navigation" }],
        },
        "",
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

describe("stringifySelector", () => {
  test("aria", () => {
    expect(stringifySelector("aria/Test")).toBe('screen.getByText("Test")')
  })

  test("selector", () => {
    expect(stringifySelector("p")).toBe('document.querySelector("p")')
  })
})

describe("RecorderPlugin", () => {
  test("stringify", async () => {
    expect(await new RecorderPlugin().stringify(flow as UserFlow)).toBe(
      await readFile(join(__dirname, "fixtures/example.test.js"), "utf8"),
    )
  })

  test("stringifyStep", async () => {
    expect(
      await new RecorderPlugin().stringifyStep(flow.steps[1] as Step),
    ).toBe('await waitFor(() => screen.getByText("More information..."))\n')
  })
})

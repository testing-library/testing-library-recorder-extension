import {
  stringify,
  StringifyExtension,
  type LineWriter,
  type NavigateStep,
  type Selector,
  type Step,
  type UserFlow,
} from "@puppeteer/replay"

export class Extension extends StringifyExtension {
  async beforeAllSteps(out: LineWriter, flow: UserFlow) {
    // Jest docblock
    out.appendLine("/**")
    const step = flow.steps.find((step) => step.type === "navigate") as
      | NavigateStep
      | undefined
    if (step) {
      out.appendLine(" * @jest-environment url")
      out.appendLine(` * @jest-environment-options { "url": "${step.url}" }`)
    } else {
      out.appendLine(" * @jest-environment jsdom")
    }
    out.appendLine(" */")

    // Imports
    out.appendLine(
      'const { screen, waitFor } = require("@testing-library/dom")',
    )
    out.appendLine('require("@testing-library/jest-dom")')

    out.appendLine("")

    // Test
    out.appendLine(`test(${JSON.stringify(flow.title)}, async () => {`)
    out.startBlock()
  }

  async afterAllSteps(out: LineWriter) {
    // Test
    out.endBlock()
    out.appendLine("})")
  }

  async stringifyStep(out: LineWriter, step: Step, flow: UserFlow) {
    switch (step.type) {
      case "click":
        out.appendLine(
          `userEvent.click(${stringifySelector(step.selectors[0])}")`,
        )
        break
      case "waitForElement":
        out.appendLine(
          `await waitFor(() => ${stringifySelector(step.selectors[0])})`,
        )
        break
      case "navigate":
        if (step === flow.steps.find((step) => step.type === "navigate")) {
          for (const { url, title } of step.assertedEvents ?? []) {
            if (url) {
              out.appendLine(`expect(location.href).toBe("${url}")`)
            }
            if (title) {
              out.appendLine(`expect(document.title).toBe("${title}")`)
            }
          }
        } else {
          console.log(
            "Warning: Testing Library does not currently handle more than one navigation step per test.",
          )
        }
        break
      default:
        console.log(
          `Warning: Testing Library does not currently handle migrating steps of type: ${step.type}. Please check the output to see how this might affect your test.`,
        )
    }
  }
}

function stringifySelector(selector: Selector) {
  const selectorString = Array.isArray(selector) ? selector[0] : selector

  if (selectorString.startsWith("aria/")) {
    return `screen.getByText("${selectorString.slice(5)}")`
  } else {
    return `document.querySelector("${selectorString}")`
  }
}

if (process.env.NODE_ENV !== "test") {
  class RecorderPlugin {
    stringify(recording: UserFlow) {
      return stringify(recording, { extension: new Extension() })
    }
  }

  chrome.devtools.recorder.registerRecorderExtensionPlugin(
    new RecorderPlugin(),
    "Testing Library",
    "application/javascript",
  )
}

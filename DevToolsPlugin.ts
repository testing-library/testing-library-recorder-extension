import { Step, UserFlow } from "@puppeteer/replay"

export class RecorderPlugin {
  async stringify(recording: UserFlow) {
    return JSON.stringify(recording, null, 2)
  }
  async stringifyStep(step: Step) {
    return JSON.stringify(step, null, 2)
  }
}

chrome.devtools.recorder.registerRecorderExtensionPlugin(
  new RecorderPlugin(),
  "Testing Library",
  "application/json",
)

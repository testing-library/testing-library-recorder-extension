import { stringify, type UserFlow } from "@puppeteer/replay"

class RecorderPlugin {
  stringify(recording: UserFlow) {
    return stringify(recording)
  }
}

chrome.devtools.recorder.registerRecorderExtensionPlugin(
  new RecorderPlugin(),
  "Testing Library",
  "application/javascript",
)

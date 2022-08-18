import { stringify, StringifyExtension, type UserFlow } from "@puppeteer/replay"

export class Extension extends StringifyExtension {}

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

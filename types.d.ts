import { Step, UserFlow } from "@puppeteer/replay"

declare global {
  /** Use the chrome.devtools.recorder API to customize the Recorder panel in DevTools. */
  namespace chrome.devtools.recorder {
    /** A plugin interface that the Recorder panel invokes to customize the Recorder panel. */
    interface RecorderExtensionPlugin {
      /**
       * Converts a recording from the Recorder panel format into a string.
       * @param recording A recording of the user interaction with the page.
       */
      stringify(recording: UserFlow): Promise<string>

      /**
       * Converts a step of the recording from the Recorder panel format into a string.
       * @param step A step of the recording of a user interaction with the page.
       */
      stringifyStep(step: Step): Promise<string>
    }

    /**
     * Registers a Recorder extension plugin.
     * @param plugin An instance implementing the `RecorderExtensionPlugin` interface.
     * @param name The name of the plugin.
     * @param mediaType The media type of the string content that the plugin produces.
     */
    function registerRecorderExtensionPlugin(
      plugin: RecorderExtensionPlugin,
      name: string,
      mediaType: string,
    ): void
  }
}

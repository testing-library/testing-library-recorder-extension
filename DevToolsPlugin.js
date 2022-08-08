export class RecorderPlugin {
  async stringify(recording) {
    return JSON.stringify(recording, null, 2)
  }
  async stringifyStep(step) {
    return JSON.stringify(step, null, 2)
  }
}

chrome.devtools.recorder.registerRecorderExtensionPlugin(
  new RecorderPlugin(),
  /* name=*/ "Custom JSON",
  /* mediaType=*/ "application/json",
)

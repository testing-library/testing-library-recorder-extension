import RecorderPlugin from './RecorderPlugin'

chrome.devtools.recorder.registerRecorderExtensionPlugin(
  new RecorderPlugin(),
  'Testing Library',
  'application/javascript',
)

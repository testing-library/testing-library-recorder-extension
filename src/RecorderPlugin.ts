import {
  stringify,
  stringifyStep,
  type Step,
  type UserFlow,
} from '@puppeteer/replay'
import Extension from './Extension'

export default class RecorderPlugin
  implements chrome.devtools.recorder.RecorderExtensionPlugin
{
  stringify(recording: UserFlow) {
    return stringify(recording, {extension: new Extension()})
  }

  stringifyStep(step: Step) {
    return stringifyStep(step, {extension: new Extension()})
  }
}

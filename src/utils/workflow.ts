import { appendFile, mkdir } from 'fs';
import { stringify } from 'yaml';
import { Answer } from '../questions.js';
import { pushImagePreset } from '../preset/pushImage.js';

const workflowDir = './.github/workflows';

function createWorkflowContents(answer: Answer): string {
  return stringify(pushImagePreset(answer));
}

export function createWorkflowFile(answer: Answer) {
  mkdir(workflowDir, { recursive: true }, (err) => {
    if (err) throw err;
    appendFile(`${workflowDir}/${answer.fileName}`, createWorkflowContents(answer), (err) => {
      if (err) throw err;
      console.log('Saved!');
    });
  });
}

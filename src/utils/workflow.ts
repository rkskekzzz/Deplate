import { appendFile, mkdir } from 'fs';
import { stringify } from 'yaml';
import { Answer } from '../questions.js';
import { pushImagePreset } from '../preset/pushImage.js';

function createWorkflowContents(answer: Answer): string {
  return stringify(pushImagePreset(answer));
}

export function createWorkflowFile(answer: Answer) {
  mkdir('./.github/workflow', { recursive: true }, (err) => {
    if (err) throw err;
    ``;
    appendFile(`./.github/workflow/${answer.fileName}`, createWorkflowContents(answer), (err) => {
      if (err) throw err;
      console.log('Saved!');
    });
  });
}

import { appendFileSync, mkdirSync, existsSync } from 'fs';
import { stringify } from 'yaml';
import { Answer } from '../questions.js';
import { pullAction, pushAction } from '../preset/index.js';
import { messageTemplate } from './message.js';

const workflowDir = './.github/workflows';

export function createWorkflowFile(answer: Answer) {
  try {
    mkdirSync(workflowDir, { recursive: true });
    if (existsSync(`${workflowDir}/${answer.pushFileName}`)) {
      throw new Error('The push action file already exists');
    }
    appendFileSync(`${workflowDir}/${answer.pushFileName}`, stringify(pushAction(answer)));
    if (existsSync(`${workflowDir}/${answer.pullFileName}`)) {
      throw new Error('The pull action file already exists');
    }
    appendFileSync(`${workflowDir}/${answer.pullFileName}`, stringify(pullAction(answer)));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(messageTemplate({ message: error.message, type: 'ERROR' }));
    }
    return;
  }
  console.log(messageTemplate({ message: 'The workflow file was created successfully', type: 'SUCCESS' }));
}

import { appendFile, mkdir } from 'fs';
import { stringify } from 'yaml';
import { pushImagePreset } from '../preset/pushImage.js';
function createWorkflowContents(answer) {
    return stringify(pushImagePreset(answer));
}
export function createWorkflowFile(answer) {
    mkdir('./.github/workflow', { recursive: true }, (err) => {
        if (err)
            throw err;
        ``;
        appendFile(`./.github/workflow/${answer.fileName}`, createWorkflowContents(answer), (err) => {
            if (err)
                throw err;
            console.log('Saved!');
        });
    });
}

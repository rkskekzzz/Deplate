#! /usr/bin/env node

import { createWorkflowFile } from './utils/workflow.js';
import { openReadline, closeReadline, makeRetryAsyncQuestions, runAsyncQuestions } from './utils/console.js';
import { questions, defaultAnswer, updateAnswersFromQuestions } from './questions.js';

(async () => {
  const readlineInterface = openReadline();

  await runAsyncQuestions(makeRetryAsyncQuestions(readlineInterface, questions));
  createWorkflowFile(updateAnswersFromQuestions(defaultAnswer, questions));
  closeReadline(readlineInterface);
})();

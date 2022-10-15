import chalk from 'chalk';
import { WorkflowOption } from './type.js';
import { messageTemplate } from './utils/message.js';
/**
 * types
 */
export type WorkflowOptionKey = keyof WorkflowOption;

export type ValidateFunction = (input: string) => boolean;
export type Validate = {
  validateFunction: ValidateFunction;
  validateErrorMessage: string;
};

export type Question = {
  workflowOptionKey: WorkflowOptionKey;
  message: string;
  validate: Validate[];
  answer?: string;
};

export type Answer = {
  [key in WorkflowOptionKey]: string;
};

/**
 * functions
 */
export function updateAnswersFromQuestions(defaultAnswer: Answer, questions: Question[]): Answer {
  questions.forEach((question) => {
    defaultAnswer[question.workflowOptionKey] = question.answer ?? defaultAnswer[question.workflowOptionKey];
  });
  return defaultAnswer;
}

function validateFileName(input: string): boolean {
  return /^([a-zA-Z0-9_-]+)\.(yaml|yml)$/.test(input);
}

function validateFileNameSame(input: string, pushFileName: string): boolean {
  // check file name is same without suffix
  return input.split('.')[0] !== pushFileName.split('.')[0];
}

function validateActionName(input: string): boolean {
  return input === '' || /^[a-zA-Z0-9_-]+$/.test(input);
}

/**
 * constants
 */
export const questions: Question[] = [
  {
    workflowOptionKey: 'pushFileName',
    message: messageTemplate({
      message: `Enter the file name of the workflow file for ${chalk.blue('push Action')}`,
      type: 'INFO',
      isInline: true,
    }),
    validate: [
      {
        validateFunction: validateFileName,
        validateErrorMessage: messageTemplate({
          message: 'The file name must be in the format of "file-name.yaml"',
          type: 'ERROR',
        }),
      },
    ],
  },
  {
    workflowOptionKey: 'pushActionName',
    message: messageTemplate({
      message: `Enter the action name of the ${chalk.blue('push Action')}(optional)`,
      type: 'INFO',
      isInline: true,
    }),
    validate: [
      {
        validateFunction: validateActionName,
        validateErrorMessage: messageTemplate({ message: 'The action name format was incorrect', type: 'ERROR' }),
      },
    ],
  },
  {
    workflowOptionKey: 'pullFileName',
    message: messageTemplate({
      message: `Enter the file name of the workflow file for ${chalk.yellow('pull Action')}`,
      type: 'INFO',
      isInline: true,
    }),
    validate: [
      {
        validateFunction: validateFileName,
        validateErrorMessage: messageTemplate({
          message: 'The file name must be in the format of "file-name.yaml"',
          type: 'ERROR',
        }),
      },
      {
        validateFunction: (input) => {
          return validateFileNameSame(input, questions[0].answer ?? '');
        },
        validateErrorMessage: messageTemplate({
          message: 'The file name of the pull Action must be different from the push Action',
          type: 'ERROR',
        }),
      },
    ],
  },
  {
    workflowOptionKey: 'pullActionName',
    message: messageTemplate({
      message: `Enter the action name of the ${chalk.yellow('pull Action')}(optional)`,
      type: 'INFO',
      isInline: true,
    }),
    validate: [
      {
        validateFunction: validateActionName,
        validateErrorMessage: messageTemplate({ message: 'The action name format was incorrect', type: 'ERROR' }),
      },
    ],
  },
];

export const defaultAnswer: Answer = {
  pushFileName: 'push.yaml',
  pushActionName: 'Push Image',
  pullFileName: 'pull.yaml',
  pullActionName: 'Pull Image',
  'timeout-minutes': '60',
  matrix: '',
  // dockerUsername: '',
  // dockerPassword: '',
  // dockerRepository: '',
  // sshPrivateKey: '',
  // sshIpv4Address: '',
};

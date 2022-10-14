import { WorkflowOption } from './type.js';
import { ALL_PACKAGE_MANAGER, ALL_FRAMEWORK } from './type.js';
/**
 * types
 */
export type ValidateFunction = (input: string) => boolean;
export type WorkflowOptionKey = keyof WorkflowOption;
export type Question = {
  workflowOptionKey: WorkflowOptionKey;
  message: string;
  validate: ValidateFunction;
  errorMeessage: string;
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

function validatePackageName(input: string): boolean {
  const yamlFileNameRegex = /^([a-zA-Z0-9_-]+)\.(yaml|yml)$/;
  return yamlFileNameRegex.test(input);
}

function validatePackageManager(input: string): boolean {
  return ALL_PACKAGE_MANAGER.includes(input as any);
}

function validateFramework(input: string): boolean {
  return ALL_FRAMEWORK.includes(input as any);
}

/**
 * constants
 */
export const questions: Question[] = [
  {
    workflowOptionKey: 'fileName',
    message: '📝 Enter the file name of the workflow file : ',
    validate: validatePackageName,
    errorMeessage: 'File name must be in the format of "filename.yaml" or "filename.yml".',
  },
  {
    workflowOptionKey: 'packageManager',
    message: '📝 Enter the package manager : ',
    validate: validatePackageManager,
    errorMeessage: `Package manager must be one of ${ALL_PACKAGE_MANAGER.join(', ')}`,
  },
  {
    workflowOptionKey: 'framework',
    message: '📝 Enter the framework : ',
    validate: validateFramework,
    errorMeessage: `Framework must be one of ${ALL_FRAMEWORK.join(', ')}`,
  },
];

export const defaultAnswer: Answer = {
  fileName: 'main',
  packageManager: 'npm',
  framework: 'react',
  'timeout-minutes': '60',
  matrix: '',
  // dockerUsername: '',
  // dockerPassword: '',
  // dockerRepository: '',
  // sshPrivateKey: '',
  // sshIpv4Address: '',
};

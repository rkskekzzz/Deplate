import { ALL_PACKAGE_MANAGER, ALL_FRAMEWORK } from './type.js';
/**
 * functions
 */
export function updateAnswersFromQuestions(defaultAnswer, questions) {
    questions.forEach((question) => {
        var _a;
        defaultAnswer[question.workflowOptionKey] = (_a = question.answer) !== null && _a !== void 0 ? _a : defaultAnswer[question.workflowOptionKey];
    });
    return defaultAnswer;
}
function validatePackageName(input) {
    const yamlFileNameRegex = /^([a-zA-Z0-9_-]+)\.(yaml|yml)$/;
    return yamlFileNameRegex.test(input);
}
function validatePackageManager(input) {
    return ALL_PACKAGE_MANAGER.includes(input);
}
function validateFramework(input) {
    return ALL_FRAMEWORK.includes(input);
}
/**
 * constants
 */
export const questions = [
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
export const defaultAnswer = {
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

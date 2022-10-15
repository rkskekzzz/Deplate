import chalk from 'chalk';
import { messageTemplate } from './utils/message.js';
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
function validateFileName(input) {
    return /^([a-zA-Z0-9_-]+)\.(yaml|yml)$/.test(input);
}
function validateFileNameSame(input, pushFileName) {
    // check file name is same without suffix
    return input.split('.')[0] !== pushFileName.split('.')[0];
}
function validateActionName(input) {
    return input === '' || /^[a-zA-Z0-9_-]+$/.test(input);
}
/**
 * constants
 */
export const questions = [
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
                    var _a;
                    return validateFileNameSame(input, (_a = questions[0].answer) !== null && _a !== void 0 ? _a : '');
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
export const defaultAnswer = {
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

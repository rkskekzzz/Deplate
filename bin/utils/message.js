import chalk from 'chalk';
const space = ' ';
export function messageTemplate({ message, type, isInline, }) {
    if (isInline)
        message = message + ' : ';
    switch (type) {
        case 'INFO':
            return '💡' + space + message;
        case 'ERROR':
            return '🚫' + space + chalk.red(message);
        case 'SUCCESS':
            return '✅' + space + chalk.green(message);
        default:
            return message;
    }
}

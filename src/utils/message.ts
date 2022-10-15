import chalk from 'chalk';
import { MessageType } from '../type.js';

const space = ' ';

export function messageTemplate({
  message,
  type,
  isInline,
}: {
  message: string;
  type: MessageType;
  isInline?: boolean;
}): string {
  if (isInline) message = message + ' : ';
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

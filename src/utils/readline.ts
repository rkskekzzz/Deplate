import { createInterface, Interface as ReadlineInterface } from 'readline';
import { Question } from '../questions.js';
import { messageTemplate } from './message.js';

/**
 * types
 */
type AsyncQuestion<T> = () => Promise<T>;

/**
 * functions - util
 */
export async function retry<T>(promiseFunction: () => Promise<T>): Promise<T> {
  return promiseFunction().catch((error: Error) => {
    console.log(error.message);
    return retry(promiseFunction);
  });
}

/**
 * functions - readline
 */
export function openReadline(): ReadlineInterface {
  return createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

export function makeAsyncQuestion(readlineInterface: ReadlineInterface, question: Question): AsyncQuestion<string> {
  return () =>
    new Promise((resolve, reject) => {
      readlineInterface.question(question.message, (answer) => {
        for (const validate of question.validate) {
          if (!validate.validateFunction(answer)) {
            reject(new Error(validate.validateErrorMessage));
          }
        }
        question.answer = answer;
        resolve(answer);
      });
    });
}

export function makeAsyncQuestions(
  readlineInterface: ReadlineInterface,
  questions: Question[]
): AsyncQuestion<string>[] {
  return questions.map((question) => makeAsyncQuestion(readlineInterface, question));
}

export function makeRetryAsyncQuestion(
  readlineInterface: ReadlineInterface,
  question: Question
): AsyncQuestion<string> {
  return () => retry(makeAsyncQuestion(readlineInterface, question));
}

export function makeRetryAsyncQuestions(
  readlineInterface: ReadlineInterface,
  questions: Question[]
): AsyncQuestion<string>[] {
  return questions.map((question) => makeRetryAsyncQuestion(readlineInterface, question));
}

export async function runAsyncQuestions(questions: AsyncQuestion<string>[]) {
  for (const question of questions) {
    await question();
  }
}

export function closeReadline(readlineInterface: ReadlineInterface): void {
  readlineInterface.close();
}

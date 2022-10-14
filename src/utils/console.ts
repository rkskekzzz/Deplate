import { createInterface, Interface } from 'readline';
import { Question } from '../questions.js';

/**
 * types
 */
type AsyncQuestion<T> = () => Promise<T>;

/**
 * functions - util
 */
export async function retry<T>(promiseFunction: () => Promise<T>): Promise<T> {
  return promiseFunction().catch((error: Error) => {
    logError(error.message);
    return retry(promiseFunction);
  });
}

export function logError(errorMeessage: string): void {
  console.log('❗' + errorMeessage);
}

export function logSuccess(successMessage: string): void {
  console.log('✅' + successMessage);
}

/**
 * functions - readline
 */
export function openReadline(): Interface {
  return createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

export function makeAsyncQuestion(readlineInterface: Interface, question: Question): AsyncQuestion<string> {
  return () =>
    new Promise((resolve, reject) => {
      readlineInterface.question(question.message, (answer) => {
        if (!question.validate(answer)) {
          reject(new Error(question.errorMeessage));
        }
        question.answer = answer;
        resolve(answer);
      });
    });
}

export function makeAsyncQuestions(readlineInterface: Interface, questions: Question[]): AsyncQuestion<string>[] {
  return questions.map((question) => makeAsyncQuestion(readlineInterface, question));
}

export function makeRetryAsyncQuestion(readlineInterface: Interface, question: Question): AsyncQuestion<string> {
  return () => retry(makeAsyncQuestion(readlineInterface, question));
}

export function makeRetryAsyncQuestions(readlineInterface: Interface, questions: Question[]): AsyncQuestion<string>[] {
  return questions.map((question) => makeRetryAsyncQuestion(readlineInterface, question));
}

export async function runAsyncQuestions(questions: AsyncQuestion<string>[]) {
  for (const question of questions) {
    await question();
  }
}

export function closeReadline(readlineInterface: Interface): void {
  readlineInterface.close();
}

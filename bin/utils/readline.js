var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createInterface } from 'readline';
/**
 * functions - util
 */
export function retry(promiseFunction) {
    return __awaiter(this, void 0, void 0, function* () {
        return promiseFunction().catch((error) => {
            console.log(error.message);
            return retry(promiseFunction);
        });
    });
}
/**
 * functions - readline
 */
export function openReadline() {
    return createInterface({
        input: process.stdin,
        output: process.stdout,
    });
}
export function makeAsyncQuestion(readlineInterface, question) {
    return () => new Promise((resolve, reject) => {
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
export function makeAsyncQuestions(readlineInterface, questions) {
    return questions.map((question) => makeAsyncQuestion(readlineInterface, question));
}
export function makeRetryAsyncQuestion(readlineInterface, question) {
    return () => retry(makeAsyncQuestion(readlineInterface, question));
}
export function makeRetryAsyncQuestions(readlineInterface, questions) {
    return questions.map((question) => makeRetryAsyncQuestion(readlineInterface, question));
}
export function runAsyncQuestions(questions) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const question of questions) {
            yield question();
        }
    });
}
export function closeReadline(readlineInterface) {
    readlineInterface.close();
}

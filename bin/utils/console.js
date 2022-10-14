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
            logError(error.message);
            return retry(promiseFunction);
        });
    });
}
export function logError(errorMeessage) {
    console.log('❗' + errorMeessage);
}
export function logSuccess(successMessage) {
    console.log('✅' + successMessage);
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
            if (!question.validate(answer)) {
                reject(new Error(question.errorMeessage));
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

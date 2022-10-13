#! /usr/bin/env node
import { appendFile, mkdir } from 'fs';
mkdir('./dir/test', { recursive: true }, (err) => {
    if (err)
        throw err;
    appendFile('dir/test/test.txt', 'Hello world!', (err) => {
        if (err)
            throw err;
        console.log('Saved!');
    });
});

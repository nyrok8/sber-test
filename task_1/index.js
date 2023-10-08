import { encoded, translations } from './data.js'

const decode = (array) => {
    const exceptions = ['groupId', 'service', 'formatSize', 'ca'];
    const countIDs = {};

    array.forEach((obj) => {
        for (let prop in obj) {
            if (exceptions.includes(prop)) continue;

            if (translations.hasOwnProperty(obj[prop])) {
                countIDs[obj[prop]] = countIDs[obj[prop]] ? countIDs[obj[prop]] + 1 : 1;
                obj[prop] = translations[obj[prop]];
            }
        }
    });

    const unuqieIDs = [];
    for (let id in countIDs) {
        if (countIDs[id] === 1) unuqieIDs.push(id);
    }
    console.log(unuqieIDs);
}

decode(encoded);
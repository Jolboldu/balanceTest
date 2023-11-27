// Function for simulating sleep
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Task settings array
const tasks = [
    {
        name: 'Task A',
        interval: '0 */3 * * * *', // Every 3 minutes
        execute: async function () {
            await sleep(1000*120)
        }
    },
    {
        name: 'Task B',
        interval: '0 */3 * * * *', // Every 3 minutes
        execute: async function () {
            await sleep(1000*120)
        }
    },
    {
        name: 'Task C',
        interval: '0 */3 * * * *', // Every 3 minutes
        execute: async function () {
            await sleep(1000*120)
        }
    },
    {
        name: 'Task D',
        interval: '0 */3 * * * *', // Every 3 minutes
        execute: async function () {
            await sleep(1000*120)
        }
    },
    {
        name: 'Task D',
        interval: '0 */3 * * * *', // Every 3 minutes
        execute: async function () {
            await sleep(1000*120)
        }
    },
    {
        name: 'Task E',
        interval: '0 */3 * * * *', // Every 3 minutes
        execute: async function () {
            await sleep(1000*120)
        }
    },
    {
        name: 'Task F',
        interval: '0 */3 * * * *', // Every 3 minutes
        execute: async function () {
            await sleep(1000*120)
        }
    },    {
        name: 'Task G',
        interval: '0 */3 * * * *', // Every 3 minutes
        execute: async function () {
            await sleep(1000*120)
        }
    },    {
        name: 'Task H',
        interval: '0 */3 * * * *', // Every 3 minutes
        execute: async function () {
            await sleep(1000*120)
        }
    },    {
        name: 'Task I',
        interval: '0 */3 * * * *', // Every 3 minutes
        execute: async function () {
            await sleep(1000*120)
        }
    },
];

module.exports = {
    data: tasks
}

const { log } = console;
function proxiedLog(...args) {
    const line = (((new Error('log'))
        .stack.split('\n')[2] || '…')
        .match(/\(([^)]+)\)/) || [, 'not found'])[1];
    log.call(console, `${line}\n`, ...args);
}
// console.info = proxiedLog;
// console.log = proxiedLog;

// global.log = proxiedLog

function exLog() {
    global.log = proxiedLog
    return proxiedLog
}

module.exports = exLog
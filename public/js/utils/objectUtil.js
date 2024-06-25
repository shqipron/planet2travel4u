function isGlobalVariableInit(variable, timeout = 5000) {
    return new Promise((resolve, reject) => {

        function checkVariable() {
            if (typeof variable !== 'undefined') {
                clearInterval(checkInterval);
                resolve();
            }
        }

        const checkInterval = setInterval(checkVariable, 250);

        setTimeout(() => {
            if (typeof variable === 'undefined') {
                clearInterval(checkInterval);
                reject(new Error('Firebase failed to load within the expected time.'));
            }
        }, timeout);
    });
}

export { isGlobalVariableInit };
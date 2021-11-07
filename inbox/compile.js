const path = require('path');
const fs = require('fs');
const solc = require('solc');

/*   __dirname: constant defined by node that always gets set to the current working director so it will 
    take you from your root from the home directory of your computer all the way to the inbox folder   */
const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

/*   make it available to other files within the project   */
module.exports = solc.compile(source, 1).contracts[':Inbox'];
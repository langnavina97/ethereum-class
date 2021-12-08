import Web3 from 'web3';

let web3;

if(typeof window !== 'undefined' && typeof window !== 'undefined') {
    // We are in the browser and metamask is running.
    web3 = new Web3(window.web3.currentProvider);
} else {
    // We are on the server *OR* the user is not running metamask
    const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/v3/e1e1da44f01a444787dcaae0e533817d'
    );
    web3 = new Web3(provider);
    
}

export default web3;
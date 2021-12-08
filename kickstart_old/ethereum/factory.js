import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xC066fE82C88f9D88f5ba9eE1cA31403591BF46b5'
);

export default instance;
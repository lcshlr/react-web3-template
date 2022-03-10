import { ethers } from 'ethers';
import Greeter from '../artifacts/contracts/Greeter.sol/Greeter.json';
import { metamaskService } from './metamask.service';

export default class ContractService {
    async initContract() {
        const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
        await metamaskService.isMetamask(contractAddress);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        this.signer = provider.getSigner();
        this.contract = new ethers.Contract(contractAddress, Greeter.abi, this.signer);
    }

    isBlockchainAddress(address) {
        if (!address.startsWith('0x') || address.length !== 42) {
            throw new Error('Pleave give a correct address to add new administrator');
        }
    }
}
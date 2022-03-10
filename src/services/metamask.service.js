class MetamaskService {
    async getAccountSelected(){
        return (await window.ethereum?.request({ method: 'eth_requestAccounts' }))[0] ?? 'N/A';
    }

    async isMetamask(){
        if(!process.env.REACT_APP_CONTRACT_ADDRESS){
            throw new Error('Contract not found');
        }
        if(typeof window.ethereum === 'undefined'){
            throw new Error('Please install Metamask extension to use the app');
        }
        if(!(await window.ethereum._metamask.isUnlocked())){
            throw new Error('Unlock your Metamask to access full features');
        };
    }
}

export let metamaskService = new MetamaskService();
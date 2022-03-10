import ContractService from './contract.service';

class GreetingService extends ContractService {
    getGreeting() {
        return this.contract.greet();
    }

    async setGreeting(newGreeting) {
        const setgreeting = await this.contract.setGreeting(newGreeting);
        return setgreeting.wait();
    }
}

export let greetingService = new GreetingService();
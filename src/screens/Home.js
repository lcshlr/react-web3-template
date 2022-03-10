import React from 'react';
import { useEffect } from "react";
import { useStateIfMounted } from "use-state-if-mounted";
import FormGreeting from "../components/FormGreeting";
import { contractService } from '../services/contract.service';

export default function Home() {

    const [greeting, setGreeting] = useStateIfMounted('');

    async function init(){
        await contractService.initContract();
        setGreeting(await contractService.getGreeting());
    }

    useEffect(() => {
        init();
    });

    return (
        <div>
            <h1>Greeting value : {greeting}</h1>
            <FormGreeting setGreeting={setGreeting} />
        </div>
    );
}
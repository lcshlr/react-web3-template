import React, { useEffect } from 'react';
import { useStateIfMounted } from "use-state-if-mounted";
import FormGreeting from "../components/FormGreeting";
import { greetingService } from "../services/greeting.service";

export default function Home() {

    const [greeting, setGreeting] = useStateIfMounted('');

    async function init() {
        await greetingService.initContract();
        setGreeting(await greetingService.getGreeting());
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
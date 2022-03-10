import { useEffect } from "react";
import { useStateIfMounted } from "use-state-if-mounted";
import { greetingService } from "../services/greeting.service"
import { toastPromise } from "../utils/HandlePromiseTransaction";
import { toastError } from "../utils/HandleResponse";

export default function FormGreeting({ setGreeting }) {

    const [newGreeting, setNewGreeting] = useStateIfMounted('');

    useEffect(() => {
        greetingService.initContract();
    }, []);

    function handleClick(e) {
        e.preventDefault();
        toastPromise(
            greetingService.setGreeting(newGreeting),
            "Set greeting is awaiting validation...",
            "Set greeting with success"
        ).then(() => {
            setGreeting(newGreeting);
            setNewGreeting('');
        })
            .catch((err) => toastError(err));
    }

    return <form onSubmit={handleClick}>
        <input type="text" value={newGreeting} onChange={(e) => setNewGreeting(e.target.value)} required placeholder="new greeting value..." />
        <button>Set greeting</button>
    </form>
}
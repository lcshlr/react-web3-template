import React, { useEffect } from "react";
import { useStateIfMounted } from "use-state-if-mounted";
import 'react-toastify/dist/ReactToastify.css';
import "./styles/loader.css"
import Home from "./screens/Home";
import { greetingService } from "./services/greeting.service";
import { getHandledError, toastError } from "./utils/HandleResponse";
import { ToastContainer } from "react-toastify";

function App() {

  const [isConnectMetaMask, setIsConnectMetaMask] = useStateIfMounted(true);
  const [loading, setLoading] = useStateIfMounted(false);

  function listenEvents() {
    window.ethereum.on("accountsChanged", async ([newAddress]) => {
      init();
    });
  }

  async function init() {
    try {
      setLoading(true);
      await greetingService.initContract();
      await greetingService.getGreeting();
    }
    catch (err) {
      if (err.toString().includes("unknown account")) {
        setIsConnectMetaMask(false);
      }
      else if (err.message && err.message.includes("Metamask")) {
        toastError(getHandledError(err));
      }
      else {
        toastError("Error : connection to contract failed. Please ensure you are on the good network and the contract exists");
      }
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    listenEvents();
    init();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function connectMetaMask() {
    try {
      setLoading(true);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      init();
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div>
        {loading ?
          <div className="loader">Loading...</div>
          :
          !isConnectMetaMask ?
            <button onClick={connectMetaMask} className='col-lg-2 btn btn-primary btn-lg'>Connect to Metamask</button>
            :
            <Home />
        }
      </div>
      <ToastContainer />
    </>
  );
}

export default App;

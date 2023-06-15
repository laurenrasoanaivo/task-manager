import { useEffect, useState } from 'react';
import Head from "next/head";
import { useRouter } from "next/router";

const calculateTimeDifference = (server: Date, client: Date): string => {
  const timeDifference = Math.abs(client.getTime() - server.getTime());
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
  
  return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
};

export default function Home() {
  const router = useRouter();
  const [clientTime, setClientTime] = useState<Date | null>(null);
  const [serverTime, setServerTime] = useState<Date | null>(null);
  const [timeDifference, setTimeDifference] = useState<string | null>(null);

  useEffect(() => {
    // Set client time
    const clientDateTime = new Date();
    setClientTime(clientDateTime);
  }, []);

  useEffect(() => {
    // Set server time
    const serverDateTime = new Date();
    setServerTime(serverDateTime);
  }, []);

  useEffect(() => {
    if (clientTime && serverTime) {
      const difference = calculateTimeDifference(serverTime, clientTime);
      setTimeDifference(difference);
    }
  }, [clientTime]);

  useEffect(() => {
    // Update time difference whenever the client time changes
    const updateTimeDifference = () => {
      const newClientTime = new Date();
      setClientTime(newClientTime);
    };

    // Listen for the "onfocus" event to detect when the window gains focus
    window.addEventListener("focus", updateTimeDifference);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("focus", updateTimeDifference);
    };
  }, []);

  const moveToTaskManager = () => {
    router.push("/tasks");
  }

  return (
    <>
      <Head>
        <title>Web 2 - Exam TD</title>
        <meta name="description" content="Just an exam" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>The easiest exam you will ever find</h1>
        <div>
          {/* Display client time (DD-MM-YYYY HH:mm) */}
          <p>
            Client time:{" "}
            <span className="clientTime">
              {clientTime?.toLocaleString()}
            </span>
          </p>

          {/* Display time difference between client and current time */}
          <p>
            Time diff:{" "}
            <span className="timeDifference">{timeDifference}</span>
          </p>
        </div>

        <div>
          <button onClick={moveToTaskManager}>Go to task manager</button>
        </div>
      </main>
    </>
  );
}

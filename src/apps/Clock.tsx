import { useEffect, useState } from "react";
import Window from "../components/Window";
import css from "../styles/apps/clock.module.css";

export default function ClockApp(props: { uuid: string; system?: boolean }) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  return (
    <>
      {!props.system && (
        <Window
          uuid={props.uuid}
          name="Clock"
          containerClassName={css.container}
        >
          <Clock setShowAdvanced={setShowAdvanced} />
        </Window>
      )}
      {props.system && (
        <Window
          uuid={props.uuid}
          name="Clock"
          containerClassName={css.container}
          resizeable={false}
          titleBar={false}
          moveable={false}
        >
          <Clock />
        </Window>
      )}
      {console.log(showAdvanced)}
      {showAdvanced && (
        <Window
          uuid={props.uuid}
          name="Clock"
          containerClassName={css.advancedContainer}
          resizeable={false}
          sizing={{
            min: {
              width: "700px",
              height: "125px",
            },
          }}
          titleBar={false}
        >
          <Advanced />
        </Window>
      )}
    </>
  );
}

function Clock(props: {
  setShowAdvanced?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [count, setCount] = useState(0);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const date = new Date();

    setDate(date);

    return () => {};
  }, [count]);

  useEffect(() => {
    const timer = setTimeout(() => setCount(count + 1), 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [count]);

  return (
    <>
      <span className={css.time}>{date.toLocaleTimeString()}</span>
      <span className={css.date}>{date.toLocaleDateString()}</span>
      {props.setShowAdvanced !== undefined && (
        <button
          onClick={() => {
            if (props.setShowAdvanced === undefined) return;
            props.setShowAdvanced((prev) => !prev);
          }}
        >
          Show More
        </button>
      )}
    </>
  );
}

function Advanced() {
  function copyTimeDate(type: string) {
    const eventDate = new Date();
    const jsonEventDate = eventDate.toJSON();

    if (type === "JSON") {
      navigator.clipboard.writeText(jsonEventDate);
    } else if (type === "UTC") {
      navigator.clipboard.writeText(new Date(jsonEventDate).toUTCString());
    } else if (type === "TS") {
      navigator.clipboard.writeText(new Date(jsonEventDate).toTimeString());
    } else if (type === "DS") {
      navigator.clipboard.writeText(new Date(jsonEventDate).toDateString());
    } else if (type === "S") {
      navigator.clipboard.writeText(new Date(jsonEventDate).toString());
    } else if (type === "LS") {
      navigator.clipboard.writeText(new Date(jsonEventDate).toLocaleString());
    } else if (type === "LTS") {
      navigator.clipboard.writeText(
        new Date(jsonEventDate).toLocaleTimeString()
      );
    } else if (type === "LDS") {
      navigator.clipboard.writeText(
        new Date(jsonEventDate).toLocaleDateString()
      );
    }
  }

  return (
    <>
      <button onClick={() => copyTimeDate("UTC")}>UTC</button>
      <button onClick={() => copyTimeDate("JSON")}>JSON</button>
      <button onClick={() => copyTimeDate("TS")}>Time String</button>
      <button onClick={() => copyTimeDate("DS")}>Date String</button>
      <button onClick={() => copyTimeDate("S")}>String</button>
      <button onClick={() => copyTimeDate("LS")}>Locale String</button>
      <button onClick={() => copyTimeDate("LTS")}>Locale Time String</button>
      <button onClick={() => copyTimeDate("LDS")}>Locale Date String</button>
    </>
  );
}

export function ClockAppIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
      <path d="M60 0C26.91 0 0 26.91 0 60s26.91 60 60 60 60-26.91 60-60S93.09 0 60 0zm0 8c28.766 0 52 23.234 52 52s-23.234 52-52 52S8 88.766 8 60 31.234 8 60 8z" />
      <path d="M56 20v40h.006a4 4.09 0 0 0 1.998 3.457l-.004.008 34.641 20 4-6.93L64 57.69V20h-8z" />
    </svg>
  );
}

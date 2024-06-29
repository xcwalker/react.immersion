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
          sizing={{min: {
            width: "700px",
            height: "125px"
          }}}
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
        <button onClick={() => props.setShowAdvanced((prev) => !prev)}>
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

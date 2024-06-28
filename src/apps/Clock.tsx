import { useEffect, useState } from "react";
import Window from "../components/Window";
import css from "../styles/apps/clock.module.css";

export default function ClockApp(props: { uuid: string; system?: boolean }) {
  return (
    <>
      {!props.system && (
        <Window
          uuid={props.uuid}
          name="Clock"
          containerClassName={css.container}
        >
          <Clock />
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
    </>
  );
}

function Clock() {
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
    </>
  );
}

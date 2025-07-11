import {
  Dispatch,
  Fragment,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import css from "../styles/components/taskbar.module.css";
import { runningAppsAtom } from "../App";
import { useAtom } from "jotai";
import { useSetAtom } from "jotai/react";
import ClockApp, { ClockAppIcon } from "../apps/Clock";

export default function Taskbar(props: {
  setStartOpen: Dispatch<SetStateAction<boolean>>;
  startOpen: boolean;
}) {
  const setRunningApps = useSetAtom(runningAppsAtom);
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
    <section id="taskbar" className={css.taskbar}>
      <div className={css.left}>
        <TaskbarItem
          onClick={() => {
            props.setStartOpen((prev) => !prev);
          }}
          name="Start"
          iconSVG={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4875 4875">
              <path d="M0 0h2311v2310H0zm2564 0h2311v2310H2564zM0 2564h2311v2311H0zm2564 0h2311v2311H2564"></path>
            </svg>
          }
          isOpen={false}
          isPin={false}
          isFocus={props.startOpen}
          isVisible={false}
        />
        <RunningApps setStartOpen={props.setStartOpen} />
      </div>
      <div className={css.right}>
        <TaskbarItem
          onClick={() => {
            // updating the list
            setRunningApps((prev) => {
              const uuid = "system-clock";
              const temp = [...prev];
              const index = temp.map((i) => i.uuid).indexOf(uuid);

              temp.map((item) => {
                item.isFocus = false;
              });

              if (index !== -1) {
                temp.splice(index, 1);
              } else {
                temp.push({
                  name: "Clock",
                  iconSVG: <ClockAppIcon />,
                  isPin: false,
                  isFocus: true,
                  isOpen: true,
                  isVisible: true,
                  app: <ClockApp uuid={uuid} system={true} />,
                  uuid: uuid,
                });
              }

              return temp;
            });
          }}
          name="Clock"
          iconSVG={
            <>
              <span className={css.time}>{date.toLocaleTimeString()}</span>
              <span className={css.date}>{date.toLocaleDateString()}</span>
            </>
          }
          isOpen={false}
          isPin={false}
          isFocus={false}
          isVisible={false}
          className={css.clock}
        />
        <TaskbarItem
          onClick={() => {
            // updating the list
            setRunningApps((prev) => {
              const temp = [...prev];
              const array: number[] = [];

              temp.map((item, index) => {
                item.isFocus = false;
                item.isVisible = false;
                if (item.uuid.startsWith("system-")) {
                  array.push(index);
                }
              });

              if (array.length > 0) {
                array.map((index) => {
                  temp.splice(index, 1);
                });
              }

              return temp;
            });
          }}
          name="Show Desktop"
          iconSVG={<></>}
          isOpen={false}
          isPin={false}
          isFocus={false}
          isVisible={false}
          className={css.hideAll}
        />
      </div>
    </section>
  );
}

function RunningApps(props: {
  setStartOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [runningApps, setRunningApps] = useAtom(runningAppsAtom);
  const filteredApps = runningApps.filter((a) => !a.uuid.startsWith("system-"));

  return (
    <ul className={css.runningApps}>
      {filteredApps &&
        filteredApps.length > 0 &&
        filteredApps.map((item, index) => {
          return (
            <Fragment key={index}>
              <TaskbarItem
                name={item.name}
                iconSVG={item.iconSVG}
                isOpen={item.isOpen}
                isPin={item.isPin}
                isFocus={item.isFocus}
                isVisible={item.isVisible}
                onClick={() => {
                  const newItem = { ...item };
                  newItem.isFocus = !item.isFocus;
                  newItem.isVisible = true;
                  if (!newItem.isOpen) newItem.isOpen = true;
                  setRunningApps((prev) => {
                    const array = [...prev];
                    array.map((item) => {
                      item.isFocus = false;
                    });

                    array[index] = newItem;

                    return array;
                  });
                  props.setStartOpen(false);
                }}
              />
            </Fragment>
          );
        })}
    </ul>
  );
}

function TaskbarItem(props: {
  onClick?: () => void;
  name: string;
  iconSVG: ReactNode;
  isOpen: boolean;
  isPin: boolean;
  isFocus: boolean;
  isVisible: boolean;
  className?: string;
}) {
  return (
    <button
      onClick={props.onClick}
      className={
        css.taskbarItem +
        (" pin" + props.isPin) +
        (" focus" + props.isFocus) +
        (props.className !== undefined ? " " + props.className : "")
      }
    >
      {props.iconSVG}
      <span className={css.name}>{props.name}</span>
      {props.isOpen && (
        <div className={css.isOpen + (" focus" + props.isFocus)} />
      )}
      {props.isPin && (
        <div className={css.isPin} />
      )}
    </button>
  );
}

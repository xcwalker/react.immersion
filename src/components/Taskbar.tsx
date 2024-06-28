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
import ClockApp from "../apps/Clock";

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

  //checks the clock
  function addLeadingZero(i: number) {
    let out: number | string = i;
    if (i < 10) {
      out = "0" + i;
    } // add zero in front of numbers < 10
    return i;
  }

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
                  iconSVG: (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15">
                      <g>
                        <path d="M1.5 1a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 1 0V2h1.5a.5.5 0 0 0 0-1zM11.5 1a.5.5 0 0 0 0 1H13v1.5a.5.5 0 0 0 1 0v-2a.5.5 0 0 0-.5-.5zM2 11.5a.5.5 0 0 0-1 0v2a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 0-1H2zM14 11.5a.5.5 0 0 0-1 0V13h-1.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 .5-.5z" />
                        <g fillRule="evenodd" clipRule="evenodd">
                          <path d="M7.854 2.146a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0 0 .708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0 0-.708zM8.793 4.5 7.5 5.793 6.207 4.5 7.5 3.207zM4.854 5.146a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0 0 .708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0 0-.708zM4.5 8.793 3.207 7.5 4.5 6.207 5.793 7.5zM10.854 5.146a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0 0 .708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0 0-.708zm.939 2.354L10.5 8.793 9.207 7.5 10.5 6.207zM9.854 10.146l-2-2a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0 0 .708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0 0-.708zM7.5 11.793 6.207 10.5 7.5 9.207 8.793 10.5z" />
                        </g>
                      </g>
                    </svg>
                  ),
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
                  var newItem = { ...item };
                  newItem.isFocus = !item.isFocus;
                  newItem.isVisible = true;
                  if (!newItem.isOpen) newItem.isOpen = true;
                  setRunningApps((prev) => {
                    var array = [...prev];
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

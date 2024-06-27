import { Dispatch, Fragment, ReactNode, SetStateAction } from "react";
import css from "../styles/components/taskbar.module.css";
import { runningAppsAtom } from "../App";
import { useAtom } from "jotai";

export default function Taskbar(props: {
  setStartOpen: Dispatch<SetStateAction<boolean>>;
  startOpen: boolean;
}) {
  return (
    <section id="taskbar" className={css.taskbar}>
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
    </section>
  );
}

function RunningApps(props: {
  setStartOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [runningApps, setRunningApps] =
    useAtom(runningAppsAtom);

  return (
    <ul className={css.runningApps}>
      {runningApps &&
        runningApps.length > 0 &&
        runningApps.map((item, index) => {
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
}) {
  return (
    <button
      onClick={props.onClick}
      className={
        css.taskbarItem + (" pin" + props.isPin) + (" focus" + props.isFocus)
      }
    >
      {props.iconSVG}
      <span className={css.name}>{props.name}</span>
      {props.isOpen && (
        <div className={css.isOpen + (" focus" + props.isFocus)} />
      )}
    </button>
  );
}

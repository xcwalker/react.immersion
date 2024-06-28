import {
  Dispatch,
  ElementType,
  Fragment,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import AboutApp from "../apps/About";
import { useSetAtom } from "jotai";
import { runningAppsAtom } from "../App";
import { v4 as uuidv4 } from "uuid";
import ClockApp from "../apps/Clock";
import css from "../styles/components/start.module.css";
import { runningAppType } from "../types";
import ExampleApp from "../apps/Example";
import ReactRadioApp from "../apps/ReactRadio";
import SettingsApp from "../apps/Settings";

export default function Start(props: {
  setStartOpen: Dispatch<SetStateAction<boolean>>;
  startOpen: boolean;
}) {
  const [viewAlphabet, setViewAlphabet] = useState(false);
  const sortedAppList = appList.sort((a, b) => a.name.localeCompare(b.name));
  const alpha = Array.from(Array(26)).map((_e, i) => i + 65);
  const alphabet = alpha.map((x) => String.fromCharCode(x));
  return (
    <>
      <div
        className={css.startBackground + " visible" + props.startOpen}
        onClick={() => {
          props.setStartOpen(false);
        }}
      />
      <section id="start" className={css.start + " visible" + props.startOpen}>
        <div className={css.container}>
          <ol className={css.list}>
            {viewAlphabet && (
              <div className={css.alphabetView}>
                {alphabet.map((item, index) => {
                  const filteredAppList = sortedAppList.filter((a) =>
                    a.name.toLowerCase().startsWith(item.toLowerCase())
                  );
                  return (
                    <Fragment key={index}>
                      {filteredAppList.length > 0 && (
                        <>
                          <button
                            onClick={() => {
                              document
                                .getElementById(
                                  "start-applist-" + item.toLowerCase()
                                )
                                ?.scrollIntoView();
                              setViewAlphabet(false);
                            }}
                          >
                            {item}
                          </button>
                        </>
                      )}
                      {filteredAppList.length === 0 && (
                        <>
                          <span
                            id={"start-applist-" + item.toLowerCase()}
                          >
                            {item}
                          </span>
                        </>
                      )}
                    </Fragment>
                  );
                })}
              </div>
            )}
            {alphabet.map((item, index) => {
              const filteredAppList = sortedAppList.filter((a) =>
                a.name.toLowerCase().startsWith(item.toLowerCase())
              );
              return (
                <Fragment key={index}>
                  {filteredAppList.length > 0 && (
                    <>
                      <button
                        id={"start-applist-" + item.toLowerCase()}
                        onClick={() => setViewAlphabet(true)}
                      >
                        {item}
                      </button>
                      {filteredAppList.map((item, index) => {
                        return (
                          <Fragment key={index}>
                            <StartApp
                              App={item.app}
                              item={item}
                              setStartOpen={props.setStartOpen}
                            />
                          </Fragment>
                        );
                      })}
                    </>
                  )}
                </Fragment>
              );
            })}
            {/* {sortedAppList.map((item, index) => {
              return (
                <Fragment key={index}>
                  <StartApp
                    App={item.app}
                    item={item}
                    setStartOpen={props.setStartOpen}
                  />
                </Fragment>
              );
            })} */}
          </ol>
          <ul className={css.tiles}>
            {appTiles.map((item, index) => {
              return (
                <Fragment key={index}>
                  <StartAppTile
                    App={item.app}
                    item={item}
                    setStartOpen={props.setStartOpen}
                  />
                </Fragment>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}

function StartApp(props: {
  App: ElementType;
  item: {
    name: string;
    iconSVG: ReactNode;
    isPin: boolean;
  };
  setStartOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const App = props.App;
  const setRunningApps = useSetAtom(runningAppsAtom);

  return (
    <button
      onClick={() => {
        var uuid = uuidv4();
        setRunningApps((prev) => {
          const array = [...prev];
          array.map((item) => {
            item.isFocus = false;
          });

          const newItem: runningAppType = {
            ...props.item,
            iconSVG: props.item.iconSVG as JSX.Element,
            isOpen: true,
            isFocus: true,
            isVisible: true,
            app: (<App uuid={uuid} />) as JSX.Element,
            uuid: uuid,
          };
          return [...array, newItem];
        });
        props.setStartOpen(false);
      }}
    >
      <div className={css.icon}>{props.item.iconSVG}</div>
      <span className={css.name}>{props.item.name}</span>
    </button>
  );
}

function StartAppTile(props: {
  App: ElementType;
  item: {
    name: string;
    iconSVG: ReactNode;
    isPin: boolean;
  };
  setStartOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const App = props.App;
  const setRunningApps = useSetAtom(runningAppsAtom);

  return (
    <button
      onClick={() => {
        var uuid = uuidv4();
        setRunningApps((prev) => {
          const array = [...prev];
          array.map((item) => {
            item.isFocus = false;
          });

          const newItem = {
            ...props.item,
            iconSVG: props.item.iconSVG as JSX.Element,
            isOpen: true,
            isFocus: true,
            isVisible: true,
            app: (<App uuid={uuid} />) as JSX.Element,
            uuid: uuid,
          };
          return [...array, newItem];
        });
        props.setStartOpen(false);
      }}
      className={css.large}
    >
      <div className={css.icon}>{props.item.iconSVG}</div>
      <span className={css.name}>{props.item.name}</span>
    </button>
  );
}

const appTiles = [
  {
    name: "About Immersion",
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
    app: AboutApp,
  },
  {
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
    app: ClockApp,
  },
];

const appList = [
  {
    name: "About Immersion",
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
    app: AboutApp,
  },
  {
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
    app: ClockApp,
  },
  {
    name: "Example App",
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
    app: ExampleApp,
  },
  {
    name: "ReactRadio",
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
    app: ReactRadioApp,
  },
  {
    name: "Settings",
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
    app: SettingsApp,
  },
];

[];

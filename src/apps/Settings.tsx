import { useState } from "react";
import Window from "../components/Window";
import css from "../styles/apps/settings.module.css";
import { useAtom } from "jotai";
import { settingsAtom } from "../App";

export default function SettingsApp(props: { uuid: string }) {
  const [page, setPage] = useState("titlebar");
  const [settings, setSettings] = useAtom(settingsAtom);

  function setSetting(setting: string, newValue: undefined | string) {
    setSettings((prev) => {
      const item = { ...prev };
      item[setting] = newValue;
      return item;
    });
  }

  function setBackgroundSetting(setting: string, newValue: string) {
    setSettings((prev) => {
      const item = { ...prev };
      item.background[setting] = newValue;
      return item;
    });
  }

  return (
    <Window
      uuid={props.uuid}
      name="Settings"
      titleBar={true}
      resizeable
      titleBarStyle="default"
      containerClassName={css.container}
      sizing={{
        base: {
          width: "1000px",
          height: "500px",
        },
        min: {
          width: "680px",
          height: "200px",
        },
      }}
    >
      <div className={css.sidebar}>
        {pages.map((item, index) => {
          return (
            <button
              key={index}
              onClick={() => setPage(item.name.toLowerCase())}
            >
              <div className={css.icon}>{item.icon}</div>
              <span className={css.name}>{item.name}</span>
            </button>
          );
        })}
      </div>
      <main className={css.main}>
        {page === "titlebar" && (
          <>
            <h2>TitleBar Settings</h2>

            <span>
              Force titleBarStyle:{" "}
              {settings.forceTitleBarStyle &&
                settings.forceTitleBarStyle.toString()}
              {!settings.forceTitleBarStyle && "undefined"}
            </span>
            <div className={css.buttonGroup}>
              <button
                onClick={() => setSetting("forceTitleBarStyle", undefined)}
              >
                Not Forced
              </button>
              <button
                onClick={() => setSetting("forceTitleBarStyle", "default")}
              >
                Force: Window
              </button>
              <button onClick={() => setSetting("forceTitleBarStyle", "mac")}>
                Force: macOS
              </button>
              <button onClick={() => setSetting("forceTitleBarStyle", "dex")}>
                Force: Dex
              </button>
            </div>
          </>
        )}
        {page === "wallpaper" && (
          <>
            <h2>Wallpaper Settings</h2>
            <span>
              Background Type:{" "}
              {settings.background.type && settings.background.type.toString()}
            </span>
            <div className={css.buttonGroup}>
              <button
                onClick={() => setBackgroundSetting("type", "solidColor")}
              >
                Solid Color
              </button>
              <button onClick={() => setBackgroundSetting("type", "image")}>
                Image
              </button>
              <button onClick={() => setBackgroundSetting("type", "iframe")}>
                Iframe (website)
              </button>
            </div>
            {settings.background.type === "solidColor" && (
              <>
                <input
                  type="color"
                  name=""
                  id=""
                  onChange={(e) => {
                    setBackgroundSetting("solidColor", e.currentTarget.value);
                  }}
                  value={settings.background.color}
                />
              </>
            )}
            {settings.background.type === "image" && (
              <>
                <input
                  type="url"
                  name=""
                  id=""
                  onChange={(e) => {
                    setBackgroundSetting("imageURL", e.currentTarget.value);
                  }}
                  value={settings.background.imageURL}
                />
              </>
            )}
            {settings.background.type === "iframe" && (
              <>
                <input
                  type="url"
                  name=""
                  id=""
                  onChange={(e) => {
                    setBackgroundSetting("iframeURL", e.currentTarget.value);
                  }}
                  value={settings.background.imageURL}
                />
              </>
            )}
          </>
        )}
        {page === "taskbar" && (
          <>
            <h2>Taskbar Settings</h2>

            <span>
              Taskbar Style: {settings.taskbar && settings.taskbar.toString()}
            </span>
            <div className={css.buttonGroup}>
              <button onClick={() => setSetting("taskbar", "default")}>
                Default
              </button>
              <button onClick={() => setSetting("taskbar", "floating")}>
                Floating
              </button>
            </div>
          </>
        )}
      </main>
    </Window>
  );
}

const pages = [
  {
    name: "TitleBar",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15">
        <g>
          <path d="M1.5 1a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 1 0V2h1.5a.5.5 0 0 0 0-1zM11.5 1a.5.5 0 0 0 0 1H13v1.5a.5.5 0 0 0 1 0v-2a.5.5 0 0 0-.5-.5zM2 11.5a.5.5 0 0 0-1 0v2a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 0-1H2zM14 11.5a.5.5 0 0 0-1 0V13h-1.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 .5-.5z" />
          <g fillRule="evenodd" clipRule="evenodd">
            <path d="M7.854 2.146a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0 0 .708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0 0-.708zM8.793 4.5 7.5 5.793 6.207 4.5 7.5 3.207zM4.854 5.146a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0 0 .708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0 0-.708zM4.5 8.793 3.207 7.5 4.5 6.207 5.793 7.5zM10.854 5.146a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0 0 .708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0 0-.708zm.939 2.354L10.5 8.793 9.207 7.5 10.5 6.207zM9.854 10.146l-2-2a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0 0 .708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0 0-.708zM7.5 11.793 6.207 10.5 7.5 9.207 8.793 10.5z" />
          </g>
        </g>
      </svg>
    ),
  },
  {
    name: "Wallpaper",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15">
        <g>
          <path d="M1.5 1a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 1 0V2h1.5a.5.5 0 0 0 0-1zM11.5 1a.5.5 0 0 0 0 1H13v1.5a.5.5 0 0 0 1 0v-2a.5.5 0 0 0-.5-.5zM2 11.5a.5.5 0 0 0-1 0v2a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 0-1H2zM14 11.5a.5.5 0 0 0-1 0V13h-1.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 .5-.5z" />
          <g fillRule="evenodd" clipRule="evenodd">
            <path d="M7.854 2.146a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0 0 .708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0 0-.708zM8.793 4.5 7.5 5.793 6.207 4.5 7.5 3.207zM4.854 5.146a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0 0 .708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0 0-.708zM4.5 8.793 3.207 7.5 4.5 6.207 5.793 7.5zM10.854 5.146a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0 0 .708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0 0-.708zm.939 2.354L10.5 8.793 9.207 7.5 10.5 6.207zM9.854 10.146l-2-2a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0 0 .708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0 0-.708zM7.5 11.793 6.207 10.5 7.5 9.207 8.793 10.5z" />
          </g>
        </g>
      </svg>
    ),
  },
  {
    name: "Taskbar",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15">
        <g>
          <path d="M1.5 1a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 1 0V2h1.5a.5.5 0 0 0 0-1zM11.5 1a.5.5 0 0 0 0 1H13v1.5a.5.5 0 0 0 1 0v-2a.5.5 0 0 0-.5-.5zM2 11.5a.5.5 0 0 0-1 0v2a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 0-1H2zM14 11.5a.5.5 0 0 0-1 0V13h-1.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 .5-.5z" />
          <g fillRule="evenodd" clipRule="evenodd">
            <path d="M7.854 2.146a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0 0 .708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0 0-.708zM8.793 4.5 7.5 5.793 6.207 4.5 7.5 3.207zM4.854 5.146a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0 0 .708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0 0-.708zM4.5 8.793 3.207 7.5 4.5 6.207 5.793 7.5zM10.854 5.146a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0 0 .708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0 0-.708zm.939 2.354L10.5 8.793 9.207 7.5 10.5 6.207zM9.854 10.146l-2-2a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0 0 .708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0 0-.708zM7.5 11.793 6.207 10.5 7.5 9.207 8.793 10.5z" />
          </g>
        </g>
      </svg>
    ),
  },
];

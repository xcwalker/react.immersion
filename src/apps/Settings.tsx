import { ReactNode, useState } from "react";
import Window from "../components/Window";
import css from "../styles/apps/settings.module.css";
import { useAtom } from "jotai";
import { settingsAtom } from "../App";
import GFIcon from "../components/GFIcon";

export default function SettingsApp(props: { uuid: string }) {
  const [page, setPage] = useState("titlebar");
  const [settings, setSettings] = useAtom(settingsAtom);
  const [dexPreviewState, setDexPreviewState] = useState(false);

  function setSetting(setting: string, newValue: unknown) {
    setSettings((prev) => {
      const item = { ...prev };

      // @ts-expect-error crappy but is easier than fixing types
      item[setting] = newValue;
      return item;
    });
  }

  function setSubSetting(main: string, setting: string, newValue: unknown) {
    setSettings((prev) => {
      const item = { ...prev };

      // @ts-expect-error crappy but is easier than fixing types
      item[main][setting] = newValue;
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
            <div className={css.buttonGroup}>
              <ButtonWithoutPreview
                onClick={() => setSetting("forceTitleBarStyle", undefined)}
                text="Not Forced"
                active={settings.forceTitleBarStyle === undefined}
                className={css.titleBarNotForced}
              />
              <ButtonWithPreview
                onClick={() => setSetting("forceTitleBarStyle", "default")}
                text="Force: Window"
                active={settings.forceTitleBarStyle === "default"}
              >
                <div className={css.previewWindow}>
                  <div className={css.titleBar + " " + css.default}>
                    <div className={css.button}>
                      <GFIcon className={css.icon}>close</GFIcon>
                    </div>
                    <div className={css.button}>
                      <GFIcon className={css.icon}>fullscreen</GFIcon>
                    </div>
                    <div className={css.button}>
                      <GFIcon className={css.icon}>remove</GFIcon>
                    </div>
                  </div>
                  <div className={css.container} />
                </div>
              </ButtonWithPreview>
              <ButtonWithPreview
                onClick={() => setSetting("forceTitleBarStyle", "mac")}
                text="Force: macOS"
                active={settings.forceTitleBarStyle === "mac"}
              >
                <div className={css.previewWindow}>
                  <div className={css.titleBar + " " + css.mac}>
                    <div className={css.button + " " + css.close}>
                      <GFIcon className={css.icon}>close</GFIcon>
                    </div>
                    <div className={css.button + " " + css.fullscreen}>
                      <GFIcon className={css.icon}>fullscreen</GFIcon>
                    </div>
                    <div className={css.button}>
                      <GFIcon className={css.icon}>remove</GFIcon>
                    </div>
                  </div>
                  <div className={css.container} />
                </div>
              </ButtonWithPreview>
              <ButtonWithPreview
                onClick={() => setSetting("forceTitleBarStyle", "dex")}
                text="Force: Dex"
                active={settings.forceTitleBarStyle === "dex"}
              >
                <div className={css.previewWindow + " " + css.dex}>
                  <div className={css.titleBar + " " + css.dex}>
                    <button
                      className={css.button}
                      onClick={() => setDexPreviewState(true)}
                    />
                    {dexPreviewState && (
                      <div className={css.group}>
                        <div className={css.button + " " + css.close}>
                          <GFIcon className={css.icon}>close</GFIcon>
                        </div>
                        <div className={css.button + " " + css.fullscreen}>
                          <GFIcon className={css.icon}>fullscreen</GFIcon>
                        </div>
                        <div className={css.button}>
                          <GFIcon className={css.icon}>remove</GFIcon>
                        </div>
                        <button
                          className={css.button + " " + css.default}
                          onClick={() => setDexPreviewState(false)}
                        >
                          <GFIcon className={css.icon}>unfold_less</GFIcon>
                        </button>
                      </div>
                    )}
                  </div>
                  <div className={css.container} />
                </div>
              </ButtonWithPreview>
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
                onClick={() =>
                  setSubSetting("background", "type", "solidColor")
                }
              >
                Solid Color
              </button>
              <button
                onClick={() => setSubSetting("background", "type", "image")}
              >
                Image
              </button>
              <button
                onClick={() => setSubSetting("background", "type", "iframe")}
              >
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
                    setSubSetting("background", "color", e.currentTarget.value);
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
                    setSubSetting(
                      "background",
                      "imageURL",
                      e.currentTarget.value
                    );
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
                    setSubSetting(
                      "background",
                      "iframeURL",
                      e.currentTarget.value
                    );
                  }}
                  value={settings.background.iframeURL}
                />
              </>
            )}
          </>
        )}
        {page === "taskbar" && (
          <>
            <h2>Taskbar Settings</h2>

            <span>
              Taskbar Style:{" "}
              {settings.taskbar.style && settings.taskbar.style.toString()}
            </span>
            <div className={css.buttonGroup}>
              <button
                onClick={() => setSubSetting("taskbar", "style", "default")}
              >
                Default
              </button>
              <button
                onClick={() => setSubSetting("taskbar", "style", "floating")}
              >
                Floating
              </button>
            </div>
          </>
        )}
      </main>
    </Window>
  );
}

function ButtonWithPreview(props: {
  onClick: () => void;
  children: ReactNode;
  text: string;
  active: boolean;
  className?: string;
}) {
  return (
    <button
      className={
        css.buttonWithPreview +
        (props.className ? " " + props.className : "") +
        (props.active ? " " + css.active : "")
      }
      onClick={props.onClick}
    >
      <div className={css.preview}>{props.children}</div>
      <span className={css.text}>{props.text}</span>
    </button>
  );
}

function ButtonWithoutPreview(props: {
  onClick: () => void;
  text: string;
  active: boolean;
  className?: string;
}) {
  return (
    <button
      className={css.buttonWithoutPreview + (props.className ? " " + props.className : "") + (props.active ? " " + css.active : "")}
      onClick={props.onClick}
    >
      <span className={css.text}>{props.text}</span>
    </button>
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

export function SettingsAppIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
      <path d="M81.247 3.688a8 8 0 0 0-7.973 3.931l-3.193 5.532c-2.21 3.826-7.57 6.302-11.977 6.504-2.327.106-5.986-2.692-8.195-6.518l-3.186-5.515a8 8 0 0 0-10.93-2.928l-11.591 6.693a8 8 0 0 0-2.928 10.928l3.154 5.463c2.21 3.826 2.221 9.054.514 11.984l-2.635 5.545-14.309.002a8 8 0 0 0-7.998 8v13.387a8 8 0 0 0 8 8h6.371c4.418 0 9.25 3.4 11.636 7.11 1.26 1.958.672 6.524-1.537 10.35l-3.193 5.532a8 8 0 0 0 2.927 10.93l11.594 6.691a8 8 0 0 0 10.928-2.928l3.193-5.53c2.21-3.827 7.57-6.304 11.977-6.505 2.327-.106 5.986 2.691 8.195 6.518l3.186 5.515a8 8 0 0 0 10.929 2.928l11.592-6.693a8 8 0 0 0 2.928-10.928l-3.155-5.463c-2.209-3.827-2.22-9.054-.513-11.984l2.656-5.547h14.287a8 8 0 0 0 7.998-8V53.305a8 8 0 0 0-8-8h-6.29c-4.419 0-9.245-3.405-11.623-7.12-1.282-2-.719-6.595 1.49-10.421l3.147-5.451a8 8 0 0 0-2.928-10.93L84.202 4.692a8 8 0 0 0-2.956-1.004zM60 31.638A28.362 28.362 0 0 1 88.361 60 28.362 28.362 0 0 1 60 88.361 28.362 28.362 0 0 1 31.64 60 28.362 28.362 0 0 1 60 31.64z" />
    </svg>
  );
}

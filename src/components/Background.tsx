import { useAtomValue } from "jotai";
import { settingsAtom } from "../App";
import css from "../styles/components/background.module.css";

export default function Background() {
  const settings = useAtomValue(settingsAtom);
  return (
    <section id="background">
      {settings.background.type === "solidColor" &&
        settings.background.color && (
          <div
            className={css.background}
            style={{ background: settings.background.color }}
          />
        )}
      {settings.background.type === "image" && settings.background.imageURL && (
        <img className={css.background} src={settings.background.imageURL} />
      )}
      {settings.background.type === "iframe" &&
        settings.background.iframeURL && (
          <iframe
            className={css.background}
            src={settings.background.iframeURL}
          />
        )}
      {!settings.background.color &&
        !settings.background.imageURL &&
        !settings.background.iframeURL && (
          <div
            className={css.background}
            style={{ background: "var(--background)" }}
          />
        )}
    </section>
  );
}

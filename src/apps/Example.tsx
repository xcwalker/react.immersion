import { useState } from "react";
import Window from "../components/Window";
import css from "../styles/apps/example.module.css";

export default function ExampleApp(props: { uuid: string }) {
  const [titleBarStyle, setTitleBarStyle] = useState("default");

  return (
    <Window
      uuid={props.uuid}
      name="Example App"
      titleBar={true}
      resizeable
      titleBarStyle={titleBarStyle}
      sizing={{
        base: { height: "190px", width: "440px" },
        min: { height: "150px", width: "410px" },
      }}
    >
      <div className="group">
        <h2>TitleBar Style</h2>
        <div className={css.buttonGroup}>
          <button onClick={() => setTitleBarStyle("default")}>Window</button>
          <button onClick={() => setTitleBarStyle("mac")}>macOS</button>
          <button onClick={() => setTitleBarStyle("dex")}>Dex</button>
        </div>
      </div>
    </Window>
  );
}

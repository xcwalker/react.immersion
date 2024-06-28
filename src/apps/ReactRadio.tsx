import Window from "../components/Window";
import css from "../styles/apps/reactradio.module.css";

export default function ReactRadioApp(props: { uuid: string }) {
  return (
    <Window
      uuid={props.uuid}
      name="ReactRadio"
      titleBar={true}
      resizeable
      titleBarStyle="dex"
      containerClassName={css.container}
      sizing={{ min: { width: "300px", height: "300px" } }}
    >
      <iframe src="https://mobile.reactradio.dev" className={css.iframe} />
    </Window>
  );
}

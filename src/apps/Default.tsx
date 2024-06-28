import Window from "../components/Window";

export default function DefaultApp(props: {uuid: string}) {
  return <Window uuid={props.uuid} name="About Immersion"  titleBar={true} resizeable={false} titleBarStyle="dex">{props.uuid}</Window>;
}

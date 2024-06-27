import Window from "../components/Window";

export default function AboutApp(props: {uuid: string}) {
  return <Window uuid={props.uuid} name="About Immersion"  titleBar={true} resizeable={false}>{props.uuid}</Window>;
}

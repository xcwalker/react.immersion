import Window from "../components/Window";

export default function ClockApp(props: {uuid: string}) {
  return <Window uuid={props.uuid} name="Clock">{props.uuid}</Window>;
}

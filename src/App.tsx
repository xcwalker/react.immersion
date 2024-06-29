import { Fragment, useState } from "react";
import Start from "./components/Start";
import Taskbar from "./components/Taskbar";
import AboutApp from "./apps/About";
import { atom, useAtomValue } from "jotai";
import { v4 as uuidv4 } from "uuid";
import Background from "./components/Background";

const testUuid = uuidv4();
export const runningAppsAtom = atom([
  {
    name: "testApp",
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
    isPin: true,
    isOpen: false,
    isFocus: false,
    isVisible: false,
    app: <AboutApp uuid={testUuid} />,
    uuid: testUuid,
  },
]);

export const settingsAtom = atom<{
  forceTitleBarStyle: undefined | string;
  background: {
    type: string;
    color?: string;
    imageURL?: string;
    iframeURL?: string;
  };
  taskbar: { style: string };
}>({
  forceTitleBarStyle: undefined,
  background: {
    type: "image",
    imageURL: "https://images.unsplash.com/photo-1461696114087-397271a7aedc",
  },
  taskbar: { style: "default" },
});

function App() {
  const [startOpen, setStartOpen] = useState<boolean>(false);
  const runningApps = useAtomValue(runningAppsAtom);

  return (
    <>
      <Background />
      <Taskbar setStartOpen={setStartOpen} startOpen={startOpen} />
      <Start startOpen={startOpen} setStartOpen={setStartOpen} />
      {runningApps &&
        runningApps.length > 0 &&
        runningApps.map((item, index) => {
          return <Fragment key={index}>{item.isOpen && item.app}</Fragment>;
        })}
    </>
  );
}

export default App;

document.querySelector("a")?.parentElement;

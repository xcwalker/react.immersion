import { Fragment, useState } from "react";
import Start from "./components/Start";
import Taskbar from "./components/Taskbar";
import AboutApp, { AboutAppIcon } from "./apps/About";
import { atom, useAtomValue } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { v4 as uuidv4 } from "uuid";
import Background from "./components/Background";

const testUuid = uuidv4();
export const runningAppsAtom = atom([
  {
    name: "testApp",
    iconSVG: <AboutAppIcon />,
    isPin: true,
    isOpen: false,
    isFocus: false,
    isVisible: false,
    app: <AboutApp uuid={testUuid} />,
    uuid: testUuid,
  },
]);

export const settingsAtom = atomWithStorage<{
  forceTitleBarStyle: undefined | string;
  background: {
    type: string;
    color?: string;
    imageURL?: string;
    iframeURL?: string;
  };
  taskbar: {
    style: string;
  };
}>("settings", {
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

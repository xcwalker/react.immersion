import React, { ReactNode, useEffect, useState } from "react";
import css from "../styles/components/window.module.css";
import { useAtom } from "jotai";
import { runningAppType } from "../types";
import { runningAppsAtom } from "../App";
import GFIcon from "./GFIcon";

export default function Window(props: {
  children: ReactNode;
  uuid: string;
  name: string;
  moveable?: boolean;
  fullscreenable?: boolean;
  titleBar?: boolean;
  resizeable?: boolean;
  startingSize?: { width: string; height: string };
}) {
  const [runningApps, setRunningApps] =
    useAtom(runningAppsAtom);
  const [fullscreen, setFullscreen] = useState(false);
  const [fullscreenPrevPos, setFullscreenPrevPos] = useState({
    x: "100px",
    y: "100px",
  });
  const [currentApp, setCurrentApp] = useState<runningAppType>();

  useEffect(() => {
    setCurrentApp(
      runningApps[runningApps.map((i) => i.uuid).indexOf(props.uuid)]
    );
  }, [runningApps]);

  function CloseWindow() {
    const temp = [...runningApps];

    if (currentApp?.isPin) {
      const item = temp[temp.map((i) => i.uuid).indexOf(props.uuid)];

      item.isOpen = false;
      item.isFocus = false;
      item.isVisible = false;
    } else {
      // removing the element using splice
      temp.splice(temp.map((i) => i.uuid).indexOf(props.uuid), 1);
    }

    // updating the list
    setRunningApps(temp);
  }

  function MinimizeWindow() {
    const temp = [...runningApps];

    const item = temp[temp.map((i) => i.uuid).indexOf(props.uuid)];

    item.isFocus = false;
    item.isVisible = false;

    // updating the list
    setRunningApps(temp);
  }

  function FocusWindow() {
    const temp = [...runningApps];

    temp.map((item) => {
      item.isFocus = false;
    });

    temp[temp.map((i) => i.uuid).indexOf(props.uuid)].isFocus = true;

    // updating the list
    setRunningApps(temp);
  }

  useEffect(() => {
    var windows = document.getElementsByClassName("draggable");

    for (let index = 0; index < windows.length; index++) {
      dragElement(windows[index] as HTMLElement);
    }

    function dragElement(element: HTMLElement) {
      var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
      if (element.firstElementChild) {
        const child = element.firstElementChild as HTMLElement;
        // if present, the header is where you move the DIV from:
        child.onmousedown = dragMouseDown;
        child.ontouchstart = dragTouchStart;
      }

      function dragTouchStart(e: TouchEvent) {
        // get the mouse cursor position at startup:
        pos3 = e.changedTouches[0].clientX;
        pos4 = e.changedTouches[0].clientY;

        document.ontouchend = closeDragElement;
        // call a function whenever the cursor moves:

        document.ontouchmove = elementDragTouch;
      }

      function elementDragTouch(e: TouchEvent) {
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.changedTouches[0].clientX;
        pos2 = pos4 - e.changedTouches[0].clientY;
        // set the element's new position:
        element.style.top =
          Math.max(
            0,
            Math.min(
              window.innerHeight - element.getBoundingClientRect().height - 64,
              element.offsetTop - pos2
            )
          ) + "px";
        element.style.left =
          Math.max(
            0,
            Math.min(
              window.innerWidth - element.getBoundingClientRect().width,
              element.offsetLeft - pos1
            )
          ) + "px";
        pos3 = e.changedTouches[0].clientX;
        pos4 = e.changedTouches[0].clientY;
      }

      function dragMouseDown(e: MouseEvent) {
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
      }

      function elementDrag(e: MouseEvent) {
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        // set the element's new position:
        element.style.top =
          Math.max(
            0,
            Math.min(
              window.innerHeight - element.getBoundingClientRect().height - 64,
              element.offsetTop - pos2
            )
          ) + "px";
        element.style.left =
          Math.max(
            0,
            Math.min(
              window.innerWidth - element.getBoundingClientRect().width,
              element.offsetLeft - pos1
            )
          ) + "px";
        pos3 = e.clientX;
        pos4 = e.clientY;
      }

      function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
        document.ontouchend = null;
        document.ontouchmove = null;
      }
    }
  }, [document.getElementsByClassName("draggable")]);

  return (
    <section
      className={
        css.window +
        (fullscreen
          ? " " + css.fullscreen
          : props.moveable === true || props.moveable === undefined
          ? " draggable"
          : "") +
        (currentApp?.isFocus ? " " + css.inFocus : "") +
        (currentApp?.isVisible ? "" : " " + css.notVisible)
      }
      id={props.uuid}
      style={
        {
          top:
            "calc(50% - (" +
            (props.startingSize ? props.startingSize?.height : "108px") +
            " / 2))",
          left:
            "calc(50% - (" +
            (props.startingSize ? props.startingSize?.width : "358px") +
            " / 2))",
        } as React.CSSProperties
      }
      onMouseDown={() => {
        FocusWindow();
      }}
    >
      {(props.titleBar === undefined || props.titleBar === true) && (
        <div className={css.toolbar}>
          <span className={css.title}>{props.name}</span>
          <div className={css.group}>
            <button
              onClick={() => {
                CloseWindow();
              }}
              className={css.close}
            >
              <GFIcon className={css.icon}>close</GFIcon>
            </button>
            {(props.fullscreenable === undefined ||
              props.fullscreenable === true) && (
              <button
                onClick={() => {
                  const element = document.getElementById(props.uuid);
                  if (element === null) return;
                  if (fullscreen) {
                    element.style.top = fullscreenPrevPos.y;

                    element.style.left = fullscreenPrevPos.x;
                  } else if (!fullscreen) {
                    setFullscreenPrevPos({
                      y: element.style.top,
                      x: element.style.left,
                    });
                  }
                  setFullscreen((prev) => !prev);
                }}
              >
                {fullscreen && (
                  <GFIcon className={css.icon}>fullscreen_exit</GFIcon>
                )}
                {!fullscreen && (
                  <GFIcon className={css.icon}>fullscreen</GFIcon>
                )}
              </button>
            )}
            <button
              onClick={() => {
                MinimizeWindow();
              }}
            >
              <GFIcon className={css.icon}>remove</GFIcon>
            </button>
          </div>
        </div>
      )}
      <div
        className={
          css.container +
          (props.resizeable === undefined || props.resizeable
            ? " " + css.resizeable
            : "")
        }
        style={{
          width: props.startingSize ? props.startingSize?.width : "358px",
          height: props.startingSize ? props.startingSize?.height : "108px",
        }}
      >
        {props.children}
      </div>
    </section>
  );
}

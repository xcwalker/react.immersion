export type runningAppsType = runningAppType[];

export type runningAppType = {
  name: string;
  iconSVG: JSX.Element;
  isPin: boolean;
  isOpen: boolean;
  isFocus: boolean;
  isVisible: boolean;
  app: JSX.Element;
  uuid: string;
};
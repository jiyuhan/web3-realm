import * as React from "react";
import { Button, useToasts } from "@geist-ui/react";
import * as Icon from "@geist-ui/react-icons";
// TODO: how dooo?
export const ToastPopup = ({ message, type, ...rest }) => {
  const [, setToast] = useToasts()
  const action = {
    name: "help",
    handler: () => alert("Help!"),
  }
  const onActionClick = () => setToast({text: message, actions: [action],})
  return <Button message={message} type={type} {...rest} />;
};

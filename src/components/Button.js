import React from "react";

import "components/Button.scss";

export default function Button(props) {
  let buttonClass = "button";
  // if confirm is passed as prop, then add CSS class styles to the confirm buttons

  if (props.confirm) {
    buttonClass += " button--confirm"
  }
  if (props.danger) {
    buttonClass += " button--danger"
  }


  return (
    <button
      className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  )
}

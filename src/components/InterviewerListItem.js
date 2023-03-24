import React from "react";

import "components/InterviewerListItem.scss"

export default function InterviewerListItem(props) {
  const { id, name, avatar, selected, setInterviewer } = props;
  const classNames = require('classnames');

  const interviewerClass = classNames('interviewers__item',
    { 'interviewers__item--selected': selected })

  function onClick() {
    setInterviewer(id)
  }

  function ifSelected(id) {
    if (selected) {
      return `${name}`
    }
  }

  return (
    <li className={interviewerClass} onClick={onClick}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {ifSelected(selected)}
    </li>
  )
}


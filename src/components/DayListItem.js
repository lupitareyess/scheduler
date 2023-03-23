import React from "react";

import "components/DayListItem.scss"


export default function DayListItem(props) {
  const { name, spots, setDay, selected } = props
  const classNames = require('classnames')

  const dayClass = classNames('day-list__item', { 'day-list__item--selected': selected, 'day-list__item--full': spots === 0 })



  return (
    <li className={dayClass}>
      <h2 className="text--regular" onClick={() => setDay(name
      )}>{name}</h2>
      <h3 className="text--light">{spots} spots remaining</h3>
    </li>
  );
}
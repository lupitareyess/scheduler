import React from "react";

import "components/DayListItem.scss"


export default function DayListItem(props) {
  const { name, spots, setDay, selected } = props
  const classNames = require('classnames')

  const dayClass = classNames('day-list__item', { 'day-list__item--selected': selected, 'day-list__item--full': spots === 0 })

  // could probably move this to helper function module
  function formatSpots(spots) {
    if (spots === 0) {
      return 'no spots remaining'
    }

    if (spots === 1) {
      return '1 spot remaining'
    }

    if (spots > 1) {
      return `${spots} spots remaining`
    }

  }

  return (
    <li className={dayClass} onClick={() => setDay(name
    )}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
}
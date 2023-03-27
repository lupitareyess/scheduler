export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.find(days => {
    return days.name === day
  });

  if (!filteredDay) {
    return []
  };

  const appointments = filteredDay.appointments.map((appointment) => {
    return state.appointments[appointment];
  })

  return appointments;
};
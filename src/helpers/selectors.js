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

export function getInterview(state, interview) {
  if (!interview) {
    return null
  }

  const filteredInterview = {
    interviewer: state.interviewers[interview.interviewer],
    student: interview.student
  }

  console.log("interview", filteredInterview)

  return filteredInterview;

}

export function getInterviewersForDay(state, day) {
  const filteredDay = state.days.find(days => {
    return days.name === day
  });

  if (!filteredDay) {
    return []
  };

  const interviewers = filteredDay.interviewers.map((interviewer) => {
    return state.interviewers[interviewer];
  })

  return interviewers;
};
/**
 * 
 * @param {string} state 
 * @param {string} day 
 * @returns An array of all the appointments for a specified day
 */
export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.find(days => {
    return days.name === day
  });

  if (!filteredDay) {
    return [];
  };

  const appointments = filteredDay.appointments.map((appointment) => {
    return state.appointments[appointment];
  })

  return appointments;
};

/**
 * 
 * @param {string} state 
 * @param {object} interview 
 * @returns An object containing the interviewer and student name for a specified interview
 */
export function getInterview(state, interview) {
  if (!interview) {
    return null;
  };

  const filteredInterview = {
    interviewer: state.interviewers[interview.interviewer],
    student: interview.student
  };

  return filteredInterview;
};

/**
 * 
 * @param {string} state 
 * @param {string} day 
 * @returns An array of all the interviewers for a specified day
 */
export function getInterviewersForDay(state, day) {
  const filteredDay = state.days.find(days => {
    return days.name === day
  });

  if (!filteredDay) {
    return []
  };

  const interviewers = filteredDay.interviewers.map((interviewer) => {
    return state.interviewers[interviewer];
  });

  return interviewers;
};


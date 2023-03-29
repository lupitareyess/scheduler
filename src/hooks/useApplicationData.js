import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    })
  }, [])

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = (day) => setState({ ...state, day });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = updateSpots(state, appointments)

    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then(() => {
        setState({ ...state, appointments, days })
      })
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = updateSpots(state, appointments)

    return axios
      .delete(`/api/appointments/${id}`, appointment)
      .then(() => {
        setState({ ...state, appointments, days })
      })
  }

  const updateSpots = function(state, appointments) {
    const dayObj = state.days.find(d => d.name === state.day)

    let spots = 0;
    for (const id of dayObj.appointments) {
      if (!appointments[id].interview) {
        spots++;
      }
    }

    const day = { ...dayObj, spots };
    return state.days.map(d => d.name === state.day ? day : d)
  };


  return { state, setDay, bookInterview, cancelInterview }
}


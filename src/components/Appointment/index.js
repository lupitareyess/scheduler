import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";


import "components/Appointment/styles.scss"


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING"
  const DELETING = "DELETING"
  const CONFIRM = "CONFIRM"
  const EDIT = "EDIT"
  const ERROR_SAVE = "ERROR_SAVE"
  const ERROR_DELETE = "ERROR_DELETE"

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY)

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    }
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => {
        transition(ERROR_SAVE, true)
      })
  }

  function destroy() {
    transition(DELETING, true);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => {
        console.log('catch hit')
        transition(ERROR_DELETE, true)
      })
  }

  function edit() {
    transition(EDIT)
  }
  console.log('mode', mode)


  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={edit}

        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
          bookInterview={props.bookInterview}
        />)}
      {mode === SAVING && (
        <Status
          message="Saving"
        />
      )}
      {mode === DELETING && (
        <Status
          message="Deleting" />
      )}
      {mode === CONFIRM && (
        < Confirm
          message="Are you sure you would like to delete?"
          onCancel={() => transition(SHOW)}
          onConfirm={destroy}
        />)}
      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={() => transition(SHOW)}
          onSave={save}
        />
      )}

      {mode === ERROR_SAVE && (
        <Error
          message="Could not save appointment, please try again"
          onClose={back}
        />
      )}

      {mode === ERROR_DELETE && (
        <Error
          message="Could not delete appointment, please try again"
          onClose={() => transition(SHOW)}
        />
      )}



    </article>
  )
}

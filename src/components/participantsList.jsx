import React, { useState, useRef } from 'react';
import { ParticipantStyled } from '.';
import { LOCATIONS, ROLES } from '../constants';

export const participantsList = (props) => {
  const { participants, updateParticipants } = props;
  const [editMode, setEditMode] = useState(false);
  const cancelEdit = () => {
    setEditMode(false);
  }
  const component = editMode
    ? <ParticipantsRead participants={participants} />
    : <ParticipantsEdit participants={participants} cancel={cancelEdit} save={updateParticipants} />;
  return (
    <>
      <component />
    </>
  );
}

export const ParticipantsRead = (props) => {
  const { participants } = props;
  return (
    <ul>
      {participants.map((participant, i) => {
        return <ParticipantStyled {...participant} />
      })}
    </ul>
  )
}

const getUpdatedParticipants = (participants, locationRefs, roleRefs, availabilityRefs) =>{
  return [];
}

export const ParticipantsEdit = (props) => {
  const { participants, cancel, save } = props;
  const locationRefs = Array.from({ length: participants.length }, () => useRef(null));
  const roleRefs = Array.from({ length: participants.length }, () => useRef(null));
  const availabilityRefs = Array.from({ length: participants.length }, () => useRef(null));

  const updatedParticipants = getUpdatedParticipants(participants, locationRefs, roleRefs, availabilityRefs);
  return (
    <>
      <ul>
        {participants.map((participant, i) => {
          return (
            <ParticipantEdit
              participant={participant}
              locationRef={locationRefs[i]}
              roleRef={roleRefs[i]}
              availabilityRef={availabilityRefs[i]}
            />
          )
        })}
      </ul>
      <button value="Annuler" onClick={() => cancel()}>Annuler</button>
      <button value="Sauvegarder" onClick={() => save(updatedParticipants)}>Sauvegarder</button>
    </>
  );

}

const ParticipantEdit = (props) => {
  const {
    participant,
    locationRef,
    roleRef,
    availabilityRef
  } = props;

  return (
    <li>
      <h3>{participant.name}</h3>
      <select value={participant.location} ref={locationRef}>
        <option value={LOCATIONS.Montreal}>Montreal</option>
        <option value={LOCATIONS.Quebec}>Quebec</option>
        <option value={LOCATIONS.Home}>Distance</option>
      </select>
      <select value={participant.role} ref={roleRef}>
        <option value={ROLES.FrontEnd}>Front-end</option>
        <option value={ROLES.BackEnd}>Back-end</option>
        <option value={ROLES.QA}>QA</option>
      </select>
      <input
        type="checkbox"
        checked={participant.available ? "true" : null}
        ref={availabilityRef}
      />
    </li>
  );
}

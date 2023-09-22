const _apiUrl = '/api/chore';

export const fetchChores = () => {
  return fetch(_apiUrl).then((res) => res.json());
};

export const fetchSingleChore = (id) => {
  return fetch(`${_apiUrl}/${id}`).then((res) => res.json());
};

export const fetchCreateNewChore = (chore) => {
  return fetch(_apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(chore),
  }).then((res) => res.json());
};

export const fetchDeleteChore = (id) => {
  return fetch(`${_apiUrl}/${id}`, {
    method: 'DELETE',
  });
};

export const fetchCompleteChore = (completion) => {
  const { choreId, userProfileId } = completion;
  return fetch(`${_apiUrl}/${choreId}/complete/?userId=${userProfileId}`, {
    method: "POST",
    headers: {"Content_Type": "application/json"}
  });
};

export const fetchAssignChore = (assignment) => {
  const { choreId, userProfileId } = assignment;
  return fetch(`${_apiUrl}/${choreId}/assign/?userId=${userProfileId}`, {
    method: "POST",
    headers: {"Content_Type": "application/json"}
  });
}

export const fetchUnassignChore = (Unassignment) => {
  const { choreId, userProfileId } = Unassignment;
  return fetch(`${_apiUrl}/${choreId}/unassign/?userId=${userProfileId}`, {
    method: "POST",
    headers: {"Content_Type": "application/json"}
  });
}

export const fetchUpdateChore = (updatedChore) => {
  return fetch(`${_apiUrl}/${updatedChore.id}`, {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(updatedChore)
  })
}

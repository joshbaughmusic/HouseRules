const _apiUrl = '/api/userprofile';

export const fetchUserProfiles = () => {
  return fetch(_apiUrl).then((res) => res.json());
};

export const fetchSingleUserProfile = (id) => {
  return fetch(`${_apiUrl}/${id}`).then((res) => res.json());
};

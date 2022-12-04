export const HandleDeleteCareer = (rowValues, setDeletedOrUpdated, deletedOrUpdated, jwt) => {
  fetch(`https://localhost:7172/api/Careers/${rowValues.id}`, {
    method: 'DELETE',
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  })
    .then((r) => {
      if (r.ok) {
        setDeletedOrUpdated(!deletedOrUpdated);
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

export const HandleUpdateCareer = (rowValues, setDeletedOrUpdated, deletedOrUpdated, jwt) => {
  const { id } = rowValues;
  const { col2, col3, col4, col5 } = rowValues.row;
  const updatedCareer = {
    name: col4,
    type: col2,
    abbreviation: col3,
    totalSubjets: col5,
  };
  fetch(`https://localhost:7172/api/Careers?careerId=${id}`, {
    method: 'PUT',
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify(updatedCareer),
  })
    .then((r) => {
      if (r.ok) {
        setDeletedOrUpdated(!deletedOrUpdated);
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

export const HandleDeleteSkill = (rowValues, setDeletedOrUpdated, deletedOrUpdated, jwt) => {
  console.log(rowValues);
  fetch(`https://localhost:7172/api/Skills/DeleteSkill`, {
    method: 'DELETE',
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({
      id: rowValues.id
    })
  })
    .then((r) => {
      if (r.ok) {
        setDeletedOrUpdated(!deletedOrUpdated);
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

export const ActivateDeactivateUser = (userId, activate, setDeletedOrUpdated, deletedOrUpdated, jwt) => {
  const updateRequest = {
    userId: userId,
    activate: activate,
  };
  fetch("https://localhost:7172/api/UsersInfo/ActivateDeactivateAccount", {
    method: 'PUT',
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify(updateRequest),
  })
    .then((r) => {
      if (r.ok) {
        setDeletedOrUpdated(!deletedOrUpdated);
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

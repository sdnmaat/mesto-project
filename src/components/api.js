const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-25',
    headers: {
      authorization: '04b0e9e8-342d-4e90-b217-f83f6dfac215',
      'Content-Type': 'application/json'
    }
  }

function onResponse (res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

export function addNewCard (name, link) {
    return fetch (`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then (onResponse)
  }

export function getInitialCards () {
    return fetch (`${config.baseUrl}/cards`, {
      headers: config.headers
    })
    .then (onResponse)
  }

export function getUserInfo () {
    return fetch (`${config.baseUrl}/users/me`, {
      headers: config.headers
    })
    .then (onResponse)
  }

export function deleteCardFromServer (idCard) {
    return fetch (`${config.baseUrl}/cards/${idCard}`,{
    method: 'DELETE',
    headers: config.headers
  })
  .then (onResponse)
  }

export function likeCard (idCard) {
    return fetch (`${config.baseUrl}/cards/likes/${idCard}`,{
        method: 'PUT',
        headers: config.headers
      })
      .then (onResponse)
  }

export function dislikeCard (idCard) {
    return fetch (`${config.baseUrl}/cards/likes/${idCard}`,{
        method: 'DELETE',
        headers: config.headers
      })
      .then (onResponse)
  }

export function changeProfile (name, info) {
    fetch(`${config.baseUrl}/users/me`, {
  method: 'PATCH',
  headers: config.headers,
  body: JSON.stringify({
    name: name,
    about: info
  })
})
  .then (onResponse)
}

export function changeAvatarServer (link) {
  fetch(`${config.baseUrl}/users/me/avatar `, {
  method: 'PATCH',
  headers: config.headers,
  body: JSON.stringify({
    avatar: link
  })
})
  .then (onResponse).catch((err) => {
    console.log(err);
  });
}
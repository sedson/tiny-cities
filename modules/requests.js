const BACKEND = 'http://localhost:3000/api/'

async function index() {
  const request = {
    method: 'GET',
    mode: 'cors',
  }
  const response = await fetch(BACKEND, request);
  return await response.json();
}


async function get(id) {
  const request = {
    method: 'GET',
    mode: 'cors',
  }
  const response = await fetch(BACKEND + id, request);
  console.log(response)
  if (! response.ok) console.log('oof')
  return await response.json();
}

async function post() {
  const request = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },

  }
  const response = await fetch(BACKEND, request);
  return await response.json();
}

async function put(id, data) {
  const request = {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: 'HI',
      cityData: data
    })

  }
  const response = await fetch(BACKEND + id, request);
  return await response.json();
}

async function del(id) {
  const request = {
    method: 'DELETE',
    mode: 'cors',
  }
  const response = await fetch(BACKEND + id, request);
  return await response.json();
}




export { index, get, post, put, del }

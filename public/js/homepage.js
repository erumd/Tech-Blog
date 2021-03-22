const newFormHandler = async (event) => {
  event.preventDefault();

  const postTitle = document.querySelector('#post-name').value.trim();
  const description = document.querySelector('#post-desc').value.trim();

  if (postTitle && description) {
    const response = await fetch(`/api/post`, {
      method: 'POST',
      body: JSON.stringify({ title, body }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/homepage');
    } else {
      alert('Failed to create post');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/post/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/homepage');
    } else {
      alert('Failed to delete post');
    }
  }
};

document
  .querySelector('.create-button')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.post-list')
  .addEventListener('click', delButtonHandler);

// _________________________________________________________OLD CODE BELOW

// const newFormHandler = async (event) => {
//   event.preventDefault();

//   const name = document.querySelector('#post-name').value.trim();
//   // const needed_funding = document.querySelector('#project-funding').value.trim();
//   const description = document.querySelector('#post-desc').value.trim();

//   if (name && needed_funding && description) {
//     const response = await fetch(`/api/post`, {
//       method: 'POST',
//       body: JSON.stringify({ title, body }),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     if (response.ok) {
//       document.location.replace('/homepage');
//     } else {
//       alert('Failed to create post');
//     }
//   }
// };

// const delButtonHandler = async (event) => {
//   if (event.target.hasAttribute('data-id')) {
//     const id = event.target.getAttribute('data-id');

//     const response = await fetch(`/api/post/${id}`, {
//       method: 'DELETE',
//     });

//     if (response.ok) {
//       document.location.replace('/homepage');
//     } else {
//       alert('Failed to delete post');
//     }
//   }
// };

// document
//   .querySelector('.new-post-form')
//   .addEventListener('submit', newFormHandler);

// document
//   .querySelector('.post-list')
//   .addEventListener('click', delButtonHandler);

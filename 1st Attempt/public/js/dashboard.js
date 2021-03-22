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

// adding update button on my own
const updateButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-class')) {
    const id = event.target.getAttribute('data-class');

    const response = await fetch(`/api/projects/${id}`, {
      method: 'PUT',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to update project');
    }
  }
};

document
  .querySelector('.create-button')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.post-list')
  .addEventListener('click', delButtonHandler);

document
  .querySelector('#update-button')
  .addEventListener('click', updateButtonHandler);

const fetchToken = async (e) => {
  e.preventDefault();
  const emailInput = document.querySelector('.email-input').value;
  const appInput = document.querySelector('.appName-input').value;

  const response = await fetch('/api/v1/authentication',
    {
      method: 'POST',
      email: emailInput,
      appName: appInput
    });
  const tokenObject = await response.json();
  const jwt = tokenObject.token;

  displayToken(jwt);
};

const displayToken = (jwt) => {
  const tokenHeading = document.querySelector('h2');
  const tokenText = document.querySelector('span');
  const token = document.querySelector('.token');
  tokenHeading.innerText = 'Your token is:';
  token.style.display = 'block';
  tokenText.innerText = jwt;
};

const button = document.querySelector('button');
button.addEventListener('click', fetchToken);
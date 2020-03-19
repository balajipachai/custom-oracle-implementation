const sendServer = async () => {
  const dataToSend = {
    message: document.getElementById('message').value,
  };
  const response = await fetch('http://localhost:8080/helloworld/change/message', {
    method: 'POST',
    body: JSON.stringify(dataToSend),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log('server response: ', response);
  alert('Message changed successfully');
};

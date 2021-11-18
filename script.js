function submit(){
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    console.log(
      {
        name: name,
        email: email,
        message: message
      }
    );
  }
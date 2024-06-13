//CORREGIDO!!!!!!!!

class Login {
  constructor() {  
    this.doLogin = this.doLogin.bind(this);
    this.doRegister = this.doRegister.bind(this);
    this.showRegister = this.showRegister.bind(this);

    const loginForm = document.querySelector('#login-form');
    loginForm.addEventListener('submit', this.doLogin);

    const registerForm = document.querySelector('#register-form');
    registerForm.addEventListener('submit', this.doRegister);

    const registerButton = document.querySelector('#register_button');
    registerButton.addEventListener('click', this.showRegister);  
    
    const volverButton = document.querySelector('#volver_button');
    volverButton.addEventListener('click', this.showLogin); 
 }

  doLogin(event) {
    event.preventDefault();
    const loginUsername = document.querySelector("#username").value;
    const loginPassword = document.querySelector("#password").value;
    
    //valida que los inputs no estén vacíos
    if (!loginUsername || !loginPassword) {
      alert('Por favor, complete todos los campos.');
      return;
    }
    

     //validar q el email sea válido
     if (!this.validateEmail(loginUsername)) {
      alert('Por favor, ingrese un correo electrónico válido.');
      return;
    }

    const key= "ProgramacionIII -AWI"; // Clave privada de encriptacion 
    const encryptedLoginUsername= CryptoJS.AES.encrypt(loginUsername, key).toString(); 
    const encryptedLoginPassword= CryptoJS.AES.encrypt(loginPassword, key).toString();



    const loginBody = { //arma un json con el user y password
      username: encryptedLoginUsername,   //las etiquetas tienen que coincidir con las esperadas en la función verifyIdentity de auth.js
      password: encryptedLoginPassword
    };

    const fetchOptions = {  //acá hace un post con user y passwords, con post pq es con seguridad
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
            },
      body: JSON.stringify(loginBody)
      };
        
      return fetch('/login/', fetchOptions) //hago un fetch al servidor con el user y password agarrados
      .then(response => {
        if (!response.ok) {
          return response.json().then(data => { throw new Error(data.message); });
        }
        return response.json();
      })
      .then(user => {
        alert('Bienvenido de nuevo!')
        window.location.href= '/'; // si fue exitoso, lo lleva a esa window
      })


      .catch(error => {
        alert('Ingreso inválido. Email o contraseña incorrectos.');
  
        const registerButton = document.querySelector('#register_button');
        console.log('Agregando clase highlighted al botón de registro');
        registerButton.classList.add('highlighted');
      });
  }

  validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }


 doRegister(event) {
    event.preventDefault();
    const registerUsername = document.querySelector("#reg-username").value;
    const registerPassword = document.querySelector("#reg-password").value;
    
    // Validar que el correo sea un correo válido
    if (!this.validateEmail(registerUsername)) {
      alert('Por favor, ingrese un correo electrónico válido.');
      return;
    } 
    
    // Validar que los campos no estén vacíos
    if (!registerUsername || !registerPassword) {
      alert('Por favor, complete todos los campos.');
      return;
    }

       

    //que la contra tenga por lo menos 7 caracteres
    if (registerPassword.length < 7) {
      alert('La contraseña debe tener al menos 7 caracteres.');
      return;
    }
    
    const key= "ProgramacionIII -AWI"; // Clave privada de encriptacion 
    const encryptedregisterUsername= CryptoJS.AES.encrypt(registerUsername, key).toString(); 
    const encryptedregisterPassword= CryptoJS.AES.encrypt(registerPassword, key).toString();

    //si se cumple con los requisitos anteriores, continuamos con el registro
    const registerBody = {
      username: encryptedregisterUsername,
      password: encryptedregisterPassword
        };

    const fetchOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
            },
      body: JSON.stringify(registerBody)
      };
        

    fetch('/register/', fetchOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al registrar usuario');
        }
        alert('Registrado con éxito!');
        window.location.href = 'login.html';
      return response.json();
    });
    }
  
    showRegister() {
      const container = document.querySelector("#register_section");
      container.classList.remove('register'); // Mostrar el formulario
      const registerButton = document.querySelector('.boton_registro');
      registerButton.classList.add('register'); // Ocultar el botón
      
      const loginContainer = document.querySelector(".contenedor");
      const loginForm = document.querySelector(".login-form");
    
      // Añadir clase de animación para desaparecer el formulario de login
      loginForm.classList.add('slide-out-left');
    
      setTimeout(() => {
        loginForm.classList.add('hidden');
        container.classList.remove('register'); // Corregir aquí
        container.classList.add('slide-in-right'); // Corregir aquí
        registerButton.classList.add('hidden');
        registerButton.classList.add('hidden-button');
      }, 500);
    }
    

    showLogin() {
      const container = document.querySelector("#register_section");
      container.classList.add('register'); // Ocultar el formulario
      const registerButton = document.querySelector('.boton_registro');
      registerButton.classList.remove('register'); // Mostrar el botón
      
      const loginContainer = document.querySelector(".contenedor");
      const loginForm = document.querySelector(".login-form");

      // Añadir clase de animación para desaparecer el formulario de registro
      loginForm.classList.remove('hidden');
      loginForm.classList.remove('slide-out-left');
      loginForm.classList.add('slide-in-right');

    

      setTimeout(() => { //ejecuta un código después de milisegundos 
        registerSection.classList.add('hidden');
        registerButton.classList.remove('hidden');
      }, 500);
    }
}
// Init app
new Login();
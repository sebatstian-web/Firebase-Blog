import {
  crearCuentaEmailPass,
  authEmailPass,
  cerrarSesion,
} from './auth/auth.js';
import navbar from './ui/nav.js';
import alerta from './ui/alerta.js';

(() => {
  document.addEventListener('DOMContentLoaded', app);

  // console.log('usuario', firebase.auth().currentUser);

  // Inicio de app
  function app() {
    // Observando si existe un usuario autenticado
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        navbar('auth', user.displayName); // Signin
        const cerrar = document.querySelector('#cerrar-sesion');

        cerrar.addEventListener('click', cerrarSesion);
      } else {
        navbar(); // Signout
        const ingresar = document.querySelector('#ingresar');
        const registrar = document.querySelector('#registrar');

        registrar.addEventListener('click', modalRegistrar);
        ingresar.addEventListener('click', modalIngresar);
      }
    });
  }

  // Modal de registro
  function modalRegistrar(e) {
    e.preventDefault();
    document.querySelector('#modal-registrar').classList.remove('hidden');

    const cancelarModal = document.querySelector('#cancelar-registrar');
    const form = document.querySelector('#form-registrar');

    const registro = (e) => {
      e.preventDefault();
      const formData = {
        email: document.querySelector('#email-registrar').value,
        password: document.querySelector('#password-registrar').value,
        nombre: document.querySelector('#nombre-registrar').value,
      };

      // Validación del formulario
      const errorForm = Object.values(formData).some((campo) => campo === '');

      if (errorForm) {
        return alerta('Completa todos los campos por favor.', 'error');
      } else if (formData.password.length < 6) {
        return alerta('La contraseña debe tener mínimo 6 carácteres.', 'error');
      } else {
        // Creando el registro
        crearCuentaEmailPass(
          formData.email,
          formData.password,
          formData.nombre
        );
      }
    };

    // Escuchando eventos dentro del formulario de registro
    form.addEventListener('submit', registro);
    cancelarModal.addEventListener('click', () => {
      document.querySelector('#modal-registrar').classList.add('hidden');
    });
  }

  // Modal de iniciar sesión
  function modalIngresar(e) {
    e.preventDefault();
    document.querySelector('#modal-ingresar').classList.remove('hidden');

    const cancelarModal = document.querySelector('#cancelar-ingresar');
    const form = document.querySelector('#form-ingresar');

    const ingresar = (e) => {
      e.preventDefault();
      const formData = {
        email: document.querySelector('#email-ingresar').value,
        password: document.querySelector('#password-ingresar').value,
      };

      const errorForm = Object.values(formData).some((campo) => campo === '');

      if (errorForm) {
        return alerta('Completa todos los campos por favor.', 'error');
      } else if (formData.password.length < 6) {
        return alerta('La contraseña debe tener mínimo 6 carácteres.', 'error');
      } else {
        // Iniciando sesión
        authEmailPass(formData.email, formData.password);
      }
    };

    form.addEventListener('submit', ingresar);
    cancelarModal.addEventListener('click', () => {
      document.querySelector('#modal-ingresar').classList.add('hidden');
    });
  }
})();
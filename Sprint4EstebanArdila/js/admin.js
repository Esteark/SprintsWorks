//obtenemos la información de los usuarios
let users = [];
let products = [];
let sesion = localStorage.getItem("sesionUser") || "false";

const Urlinfouser = " http://localhost:3000/users";
const UrlProducts = "http://localhost:3000/products/";

const getInfoUser = async () => {
  const result = await fetch(Urlinfouser);
  const data = await result.json();
  return data;
};

const getProducts = async () => {
  const response = await fetch(UrlProducts);
  const data = await response.json();
  return data;
};

const infoUserToLocal = async () => {
  users = await getInfoUser();
};

const productsFormManipulation = async () => {
  products = await getProducts();
};

document.addEventListener("DOMContentLoaded", () => {
  infoUserToLocal();
  productsFormManipulation();
});

//Capturo el formulario

const formLogin = document.getElementById("formLogin");
const txtinfouser = document.getElementById("txtinfouser");
const txtpass = document.getElementById("txtpass");
const lblErrorFormLogin = document.getElementById("lblErrorFormLogin");
const secadminproducts = document.getElementById("secadminproducts");

lblErrorFormLogin.style.visibility = "hidden";

const handleLogin = () => {
  users.forEach((user) => {
    if (txtinfouser.value == user.emailuser || txtinfouser == user.nomuser) {
      if (txtpass.value === user.pass) {
        lblErrorFormLogin.classList.remove("animate__fadeIn");
        lblErrorFormLogin.classList.add("animate__fadeOut");
        formLogin.classList.remove("animate__fadeIn");
        formLogin.classList.add("animate__fadeOut");
        setTimeout(() => {
          formLogin.classList.add("hidden");
          secadminproducts.classList.remove("hidden");
          secadminproducts.classList.add("animate__fadeOut");
          secadminproducts.classList.add("animate__fadeIn");
        });
        localStorage.setItem("sesionUser", "true");
      } else {
        lblErrorFormLogin.style.visibility = "visible";
        lblErrorFormLogin.classList.remove("animate__fadeOut");
        lblErrorFormLogin.classList.add("animate__fadeIn");
      }
    } else {
      lblErrorFormLogin.style.visibility = "visible";
      lblErrorFormLogin.classList.remove("animate__fadeOut");
      lblErrorFormLogin.classList.add("animate__fadeIn");
    }
  });
};

formLogin.addEventListener("submit", (e) => {
  e.preventDefault();
  handleLogin();
});

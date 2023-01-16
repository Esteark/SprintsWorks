//incialización de variables
let products = [];
let cantProduct = 0;
let ubicacion = "";

//Obtenemos la información del carrito
let carrito = JSON.parse(localStorage.getItem("CarTienda")) || [];

//Capturamos los elementos del modal
const SecModal = document.getElementById("SecModal");
const CardModal = document.getElementById("CardModal");

// Escondame el modal
SecModal.style.display = "none";
CardModal.style.display = "none";

//Funcion para llenar un array con todos los productos para no tener que llamar al servidor varias veces
const ProductsForManipulation = (data) => {
  products = data;
};

//funcion para llevar lo que hay en el carrito al local storage

const CarToLocal = (array) => {
  localStorage.setItem("CarTienda", JSON.stringify(array));
  localStorage.setItem("locationTienda", ubicacion);
};

//funcion para sumar todo lo que vale el carrito

const TotalPaid = () => {
  let total = 0;
  carrito.forEach((item) => {
    total += item.precio;
  });

  return total;
};

//funcion para formatear numeros pesos colombianos
const formatterPeso = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  minimumFractionDigits: 0,
});

//Para lanzar una notificación con un mensaje personalizado

const toasty = (mensaje) => {
  Toastify({
    text: `${mensaje}`,
    position: "left",
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    duration: 2000,
  }).showToast();
};

//Capturamos los elementos del modal=CardLocacion
const CardLocation = document.querySelector(".CardLocation");
const CardProduct = document.querySelector(".CardProduct");
const CardCarrito = document.querySelector(".CardCarrito");
const ThanksforBuy = document.querySelector(".ThanksforBuy");
const SecCarVacio = document.querySelector(".SecCarVacio");
const ContainerCar = document.querySelector(".ContainerCar");
const btncloseModal = document.getElementById("btncloseModal");
const btncloseModalProduct = document.getElementById("btncloseModalProduct");
const btnBuscar = document.getElementById("btnBuscar");
const text_datalist = document.getElementById("text_datalist");
const lblErrorModalLocation = document.getElementById("lblErrorModalLocation");
const locationCar = document.getElementById("locationCar");

const closeModal = () => {
  SecModal.classList.remove("animate__fadeIn");
  CardModal.classList.remove("animate__backInLeft");
  SecModal.classList.add("animate__fadeOut");
  CardModal.classList.add("animate__backOutRight");
  setTimeout(() => {
    SecModal.style.display = "none";
    CardModal.style.display = "none";
    CardCarrito.style.display = "none";
    ThanksforBuy.style.display = "none";
    hideModals();
  }, 1000);
};

const showModal = () => {
  SecModal.style.display = "block";
  SecModal.classList.remove("animate__fadeOut");
  SecModal.classList.add("animate__fadeIn");
  CardModal.style.display = "block";
  CardModal.classList.remove("animate__backOutRight");
  CardModal.classList.add("animate__backInLeft");
};

const hideModals = () => {
  CardLocation.style.display = "none";
  CardProduct.style.display = "none";
  CardCarrito.style.display = "none";
  ThanksforBuy.style.display = "none";
};

//eventos para botones de cerrado
btncloseModal.addEventListener("click", () => {
  hideModals();
  CardModal.classList.remove("StylesModalLocation");
  closeModal();
});
btncloseModalProduct.addEventListener("click", () => {
  hideModals();
  CardModal.classList.remove("StylesModalProduct");
  closeModal();
});

//capturo elementos de la navbar

const nav_location_user = document.getElementById("nav_location_user");
const text_location = document.getElementById("text_location");
const carNumberNav = document.getElementById("carNumberNav");

const obtainLocation = () => {
  text_location.textContent =
    localStorage.getItem("locationTienda") ||
    "¿Dónde quieres recibir tu pedido?";
  locationCar.textContent =
    localStorage.getItem("locationTienda") || "Ingresa una ubicación";
  ubicacion = localStorage.getItem("locationTienda") || "";
};
obtainLocation();

btnBuscar.addEventListener("click", () => {
  if (text_datalist.value.length != 0) {
    text_location.textContent = text_datalist.value;
    locationCar.textContent = text_datalist.value;
    ubicacion = text_datalist.value;
    lblErrorModalLocation.classList.remove("animate__fadeIn");
    lblErrorModalLocation.style.display = "none";
    text_datalist.value = "";
    closeModal();

    if (ubicacion.length != 0) {
      CarToLocal(carrito);
      toasty("Ubicación guardada correctamente");
    }
  } else {
    lblErrorModalLocation.style.display = "block";
    lblErrorModalLocation.classList.add("animate__fadeIn");
  }
});

//actualiceme la cantidad de productos que hay en el carrito para mostrarla en pantalla

const infocarrito = () => {
  carNumberNav.textContent = carrito.length;
};

//Evento que actualiza la cantidad de productos y el total a pagar por el usuario
const infopago = () => {
  btnPaidCar.querySelector("h4").textContent = carrito.length;
  btnPaidCar.querySelector("p").textContent = formatterPeso.format(TotalPaid());
};

infocarrito();

//eventos para la navbar

nav_location_user.addEventListener("click", () => {
  hideModals();
  modalLocation();
  CardModal.classList.add("StylesModalLocation");
  lblErrorModalLocation.style.display = "none";
  CardLocation.style.display = "block";
  showModal();
});

//Obtenemos la informacion de la Api para la locación
const urlLocation = "http://localhost:3000/location";

const getDataLocation = async () => {
  const response = await fetch(urlLocation);
  const data = await response.json();
  return data;
};

const modalLocation = async () => {
  let location = await getDataLocation();
  // Procedemos a llenar el data list
  const listLocationUser = document.getElementById("listLocationUser");
  const fragment = document.createDocumentFragment();
  //Llenamos la lista
  location.forEach((option) => {
    option.ciudades.forEach((ciudad) => {
      const option = document.createElement("option");
      option.textContent = ciudad;
      option.value = ciudad;
      fragment.appendChild(option);
    });
  });
  listLocationUser.appendChild(fragment);
};

// Información para el renderizado de  los productos en ofertas

//capturamos la seccion donde quedarán los productos
const Seccion_cardsOfer = document.getElementById("Seccion_cardsOfer");
const Seccion_cardPopular = document.getElementById("Seccion_cardPopular");
const Ses_cards_relacionados = document.querySelector(
  ".Ses_cards_relacionados"
);
const SecProductosCar = document.querySelector(".SecProductosCar");

//Eventos carrito
const btnCar = document.getElementById("btnCar");
const btncloseModalCar = document.getElementById("btncloseModalCar");
const btnCarVacioAgregar = document.getElementById("btnCarVacioAgregar");
const btnemptyCar = document.getElementById("btnemptyCar");
const btnPaidCar = document.querySelector(".btnPaidCar");

//Evento para adicionar o quitar productos del carrito en el modal

const ModalCar = (btn, op) => {
  let productfilter = products.filter((product) => product.id == btn.target.id);
  let preciofinal;
  if (productfilter[0].promotion == true) {
    preciofinal = productfilter[0].price - productfilter[0].price * 0.3;
  } else {
    preciofinal = productfilter[0].price;
  }

  if (btn.target.className == "btnMasCar") {
    carrito.forEach((item) => {
      if (item.id == btn.target.id) {
        item.cant += 1;
        item.precio += preciofinal;
      }
    });
  } else {
    carrito.forEach((item, index) => {
      if (item.id == btn.target.id) {
        if (item.cant > 1) {
          item.cant -= 1;
          item.precio -= preciofinal;
        } else {
          carrito.splice(index, 1);
        }
      }
    });
  }
  console.log(op);
  if (op == true) {
    if (carrito.length == 0) {
      CardLocation.classList.remove("StylesModalCar");
      hideModals();
      closeModal();
      ubicacion = "";
      toasty("El carrito esta vacío :(");
    }
    renderCar(carrito);
  } else {
    if (carrito.length == 0) {
      ShowHideMainContent();
      CardLocation.classList.remove("StylesModalCar");
      hideModals();
      closeModal();
      ubicacion = "";

      toasty("El carrito esta vacío :(");
    }
    infoPayForm.textContent = formatterPeso.format(TotalPaid());
    renderCarPaid(carrito);
  }

  CarToLocal(carrito);
  obtainLocation();
  infocarrito();
  infopago();
};

//evento para pagar los productos que hay en el carrito

const HideMainContent = () => {
  contMain.classList.add("animate__fadeOut");
  setTimeout(() => {
    contMain.classList.add("hidden");
  }, 1000);
  SecPagoCar.classList.remove("hidden");
  // document.body.style.overflow = "hidden";
};

const ShowHideMainContent = () => {
  console.log("aca estoy ocultado");
  contMain.classList.remove("hidden");
  contMain.classList.remove("animate__fadeOut");
  contMain.classList.add("animate__fadeIn");
  SecPagoCar.classList.add("hidden");
  document.body.style.overflow = "visible";
  document.body.classList.remove("hideScrollBar");
};

btnPaidCar.addEventListener("click", () => {
  if (ubicacion.length == 0) {
    toasty("Hola, ingresa una ubicación antes de continuar con el pago");
  } else {
    hideModals();
    CardModal.classList.remove("StylesModalCar");
    closeModal();
    HideMainContent();

    infoPayForm.textContent = formatterPeso.format(TotalPaid());
    renderCarPaid(carrito);
    funcionValidator();
  }
});

//evento para pintar el carrito

const renderCar = (car) => {
  SecProductosCar.innerHTML = "";
  car.forEach((product) => {
    let { url, precio, id, cant, nomprod } = product;
    SecProductosCar.innerHTML += `<figure class="CarProductToBuy">
                  <div style="background: url(${url});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;"> </div>
                  <div class="InfoproductCar">
                    <p>${nomprod}</p>
                    <h3>${formatterPeso.format(precio)}</h3>
                  </div>
                  <div class="InputCar">
                    <button id="${id}" class="btnMenosCar">-</button>
                    <h4>${cant + (knowCategory(id) == true ? " LB" : " U")}</h4>
                    <button id="${id}" class="btnMasCar">+</button>
                  </div>
                </figure>`;
  });
};

const SecProductosCarPaid = document.querySelector(".SecProductosCarPaid");
const iconBack = document.querySelector(".iconBack");
const infoPayForm = document.getElementById("infoPayForm");

const renderCarPaid = (car) => {
  SecProductosCarPaid.innerHTML = "";
  car.forEach((product) => {
    let { url, precio, id, cant, nomprod } = product;
    SecProductosCarPaid.innerHTML += `<figure class="CarProductToBuy">
                  <div style="background: url(${url});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;"> </div>
                  <div class="InfoproductCar">
                    <p>${nomprod}</p>
                    <h3>${formatterPeso.format(precio)}</h3>
                  </div>
                  <div class="InputCar">
                    <button id="${id}" class="btnMenosCar">-</button>
                    <h4>${cant + (knowCategory(id) == true ? " LB" : " U")}</h4>
                    <button id="${id}" class="btnMasCar">+</button>
                  </div>
                </figure>`;
  });
};

//evento para agregar o quitar productos del carrito en la sección de pago

SecProductosCarPaid.addEventListener("click", (e) => {
  ModalCar(e, false);
});

//Cierra la seccion de pago y regresa al menu principal

iconBack.addEventListener("click", () => {
  ShowHideMainContent();
});

SecProductosCar.addEventListener("click", (e) => {
  ModalCar(e, true);
});

// Evento para abrir el modal del carrito

btnCar.addEventListener("click", () => {
  hideModals();
  showModal();

  if (carrito.length == 0) {
    SecCarVacio.classList.remove("hidden");
    ContainerCar.classList.add("hidden");
  } else {
    SecCarVacio.classList.add("hidden");
    ContainerCar.classList.remove("hidden");
    infopago();
    renderCar(carrito);
  }
  CardModal.classList.add("StylesModalCar");
  CardCarrito.style.display = "block";
  document.body.classList.add("hideScrollBar");
});

// Eventos para cerrar el carrito

// con el boton de cerrado
btncloseModalCar.addEventListener("click", () => {
  CardModal.classList.remove("StylesModalCar");
  hideModals();
  closeModal();
  document.body.classList.remove("hideScrollBar");
});
//Conel bton de carro vacio
btnCarVacioAgregar.addEventListener("click", () => {
  CardModal.classList.remove("StylesModalCar");
  hideModals();
  closeModal();
  document.body.classList.remove("hideScrollBar");
});

// Evento para vaciar el carrito
btnemptyCar.addEventListener("click", () => {
  carrito = [];
  ubicacion = "";
  CarToLocal(carrito);
  obtainLocation();
  hideModals();
  CardModal.classList.remove("StylesModalCar");
  closeModal();
  infocarrito();
  toasty("No hay nada en el carrito :(");
  document.body.classList.remove("hideScrollBar");
});

//Obtenemos la informacion de la Api para los productos en oferta

const renderProductOfer = (data) => {
  Seccion_cardsOfer.innerHTML = "";
  let productosOfer = data.filter((product) => product.promotion == true);
  productosOfer.forEach((product) => {
    const { id, name, price, url } = product;
    Seccion_cardsOfer.innerHTML += ` <figure class="Card_Ofer ">
          <div class="oferLabel">
              <p>30% dto.</p>
            </div>
          <div class="img_cardOfer" style="background: url(${url});  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;">

          </div>
          <figcaption>
            <div class="prices_ofer">
              <h4>${formatterPeso.format(price - price * 0.3)}</h4>
              <h4>${formatterPeso.format(price)}</h4>
            </div>
            <p class="nomproduct">${name}</p>
            <button id="${id}">Agregar</button>
          </figcaption>
        </figure>`;
  });
};

//Renderizado del producto al cual hizo clic el usuario
const btnMenosProductModal = document.getElementById("btnMenosProductModal");
const btnMasProductModal = document.getElementById("btnMasProductModal");
const cantidadProductModal = document.getElementById("cantidadProductModal");
const lblerrorModalProduct = document.getElementById("lblerrorModalProduct");
const btnAgregarCardproduct = document.querySelector(".btnAgregarCardproduct");
cantProduct == 0 ? (lblerrorModalProduct.style.visibility = "visibile") : null;
let unidad;
let idproduct;

const knowCategory = (id) => {
  let arrayfilter = products.filter((item) => item.id == id);
  console.log();
  if (arrayfilter[0].category == "legumes") {
    return true;
  }

  return false;
};

const infoproductRender = async (id) => {
  let arrayCar = products.filter((product) => product.id == id);
  const imgProductModal = document.getElementById("imgProductModal");
  const nomProductModal = document.getElementById("nomProductModal");
  const priceProductModal = document.getElementById("priceProductModal");
  const Infoproduct_input_sec1 = document.querySelector(
    ".Infoproduct_input_sec1"
  );

  arrayCar.forEach((item) => {
    imgProductModal.src = item.url;
    nomProductModal.textContent = item.name;
    priceProductModal.textContent = formatterPeso.format(item.price);

    if (item.category == "legumes") {
      cantidadProductModal.textContent = "0 LB";
      Infoproduct_input_sec1.style.visibility = "visible";
    } else {
      cantidadProductModal.textContent = "0 U";
      Infoproduct_input_sec1.style.visibility = "hidden";
    }
  });
  unidad = knowCategory(id);
  cantProduct = 0;
};

//evento clic cuando se hace mas o menos

btnMasProductModal.addEventListener("click", () => {
  console.log(unidad);
  if (cantProduct >= 0 && cantProduct < 10) {
    cantidadProductModal.textContent = ` ${
      (cantProduct += 1) + (unidad ? " LB" : " U")
    } `;
  }
  if (cantProduct > 0) {
    lblerrorModalProduct.classList.add("animate__fadeOut");
    lblerrorModalProduct.classList.remove("animate__fadeInDown");
  }
});

btnMenosProductModal.addEventListener("click", () => {
  if (cantProduct > 0) {
    cantidadProductModal.textContent = ` ${
      (cantProduct -= 1) + (unidad ? " LB" : " U")
    } `;
  }
  if (cantProduct == 0) {
    lblerrorModalProduct.classList.remove("animate__fadeOut");
    lblerrorModalProduct.classList.add("animate__fadeInDown");
  }
});

//Evento clic para agregar productos al carrito
btnAgregarCardproduct.addEventListener("click", () => {
  let arrayfilter = products.filter((item) => item.id == idproduct);
  let price, img, nomproducto, promocion, preciofinal;

  arrayfilter.forEach((item) => {
    price = item.price;
    nomproducto = item.name;
    img = item.url;
    promocion = item.promotion;
  });

  preciofinal =
    promocion == true
      ? (price - price * 0.3) * cantProduct
      : price * cantProduct;

  const newprod = {
    url: img,
    precio: preciofinal,
    id: idproduct,
    cant: cantProduct,
    nomprod: nomproducto,
  };

  if (cantProduct > 0) {
    let buscarproduct = carrito.filter((item) => item.id == idproduct);
    if (buscarproduct.length > 0) {
      carrito.forEach((item) => {
        if (item.id == idproduct) {
          item.cant += cantProduct;
          item.precio += preciofinal;
        }
      });
      hideModals();
      CardModal.classList.remove("StylesModalProduct");
      closeModal();
      infocarrito();
      CarToLocal(carrito);
    } else {
      carrito.push(newprod);
      CarToLocal(carrito);
      hideModals();
      CardModal.classList.remove("StylesModalProduct");
      closeModal();
      infocarrito();
    }
    toasty("Producto agregado al carrito :)");
  }
});

//Evento clic en la seccion de ofertas

Seccion_cardsOfer.addEventListener("click", (e) => {
  hideModals();
  if (e.target.localName == "button") {
    idproduct = e.target.id;
    CardProduct.style.display = "block";
    infoproductRender(e.target.id);
    showModal();
    CardModal.classList.add("StylesModalProduct");
  }
  if (cantProduct == 0) {
    lblerrorModalProduct.classList.remove("animate__fadeOut");
    lblerrorModalProduct.classList.add("animate__fadeInDown");
  }
});

//Evento clic en la seccion de porductos populares
Seccion_cardPopular.addEventListener("click", (e) => {
  hideModals();
  if (e.target.localName == "button") {
    idproduct = e.target.id;
    CardProduct.style.display = "block";
    infoproductRender(e.target.id);
    showModal();
    CardModal.classList.add("StylesModalProduct");
  }
  if (cantProduct == 0) {
    lblerrorModalProduct.classList.remove("animate__fadeOut");
    lblerrorModalProduct.classList.add("animate__fadeInDown");
  }
});

//Evento clic en la seccion de productos relacionados
Ses_cards_relacionados.addEventListener("click", (e) => {
  if (e.target.localName == "button") {
    idproduct = e.target.id;
    infoproductRender(e.target.id);
  }
  if (cantProduct == 0) {
    lblerrorModalProduct.classList.remove("animate__fadeOut");
    lblerrorModalProduct.classList.add("animate__fadeInDown");
  }
});

const renderproductosPopu = async (data) => {
  Seccion_cardPopular.innerHTML = "";
  let productospopu = data.filter((product) => product.promotion == false);
  productospopu.forEach((product) => {
    const { id, name, price, url } = product;
    Seccion_cardPopular.innerHTML += ` <figure class="Card_Ofer ">
    <div class="oferLabel" style="visibility:hidden">
              <p>30% dto.</p>
            </div>
    
          <div class="img_cardOfer" style="background: url(${url});  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;">

          </div>
          <figcaption>
            <div class="prices_ofer">
              <h4 class="precio_popular">${formatterPeso.format(price)}</h4>
            </div>
            <p class="nomproduct">${name}</p>
            <button id="${id}">Agregar</button>
          </figcaption>
        </figure>`;
  });
};

const renderProductsRela = async (data) => {
  Ses_cards_relacionados.innerHTML = "";
  data.forEach((product) => {
    const { id, name, price, promotion, url } = product;
    Ses_cards_relacionados.innerHTML += `<figure class="CardRela" >
                  <div class="lblproductRela" style="visibility:${
                    promotion == true ? "visible" : "hidden"
                  }">
                    <p>30% dto.</p>
                  </div>
                  <div class="img_productRela" style="background: url(${url});background-size: contain;
    background-repeat: no-repeat;background-position:center"></div>
                  <figcaption>
                    <div class="text_prices_rela">
                      <h4>${formatterPeso.format(price)}</h4>
                      <h4 class="priceOfer" style="visibility:${
                        promotion == true ? "visible" : "hidden"
                      }">${formatterPeso.format(price - price * 0.3)}</h4>
                    </div>
                    <p>${name}</p>
                    <button id="${id}">Agregar</button>
                  </figcaption>
                </figure>`;
  });
};

const UrlProductos = "http://localhost:3000/products";

const getOfertas = async () => {
  const result = await fetch(UrlProductos);
  const data = await result.json();
  renderProductOfer(data);
  renderproductosPopu(data);
  renderProductsRela(data);
  ProductsForManipulation(data);
};

document.addEventListener("DOMContentLoaded", () => {
  getOfertas();
});

// Comienza javascript para el main
const SecPagoCar = document.querySelector(".SecPagoCar");
const contMain = document.querySelector(".contMain");

//capturamos el formulario

const form = document.querySelector("form");

//capturamos los input del formulario
const txtemail = document.getElementById("txtemail");
const txtnumberCard = document.getElementById("txtnumberCard");
const txtYear = document.getElementById("txtYear");
const txtCvc = document.getElementById("txtCvc");
const txtNomUser = document.getElementById("txtNomUser");
const btnPagarCarro = document.getElementById("btnPagarCarro");

//Capturamos los label de error
const lblerrorEmailForm = document.getElementById("lblerrorEmailForm");
const lblerrorCardForm = document.getElementById("lblerrorCardForm");
const lblerrorYearCvc = document.getElementById("lblerrorYearCvc");
const lblerrorNomUser = document.getElementById("lblerrorNomUser");

let email, card, year, cvc, nomuser;

//funcion validadora

const funcionValidator = () => {
  email = VerificadorInputmail();
  card = verificadorinputCard();
  year = verificadorInputYear();
  cvc = verificadorInputCvc();
  nomuser = verificadorInputName();
  if (
    email == false ||
    card == false ||
    year == false ||
    cvc == false ||
    nomuser == false
  ) {
    activebtnform(false);
    return false;
  } else {
    activebtnform(true);
    return true;
  }
};

//Funcion para activar o desactivar el boton
const activebtnform = (activa) => {
  btnPagarCarro.disabled = !activa;
  activa == false
    ? btnPagarCarro.classList.add("btnDisabled")
    : btnPagarCarro.classList.remove("btnDisabled");
};

//Funcion para validar correo electronico
const validateEmail = (email) => {
  let regexpremail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regexpremail.test(email);
};

const VerificadorInputmail = () => {
  if (txtemail.value.length == 0) {
    lblerrorEmailForm.style.visibility = "visibile";
    lblerrorEmailForm.textContent = "No dejes este campo vacío";
    return false;
  } else {
    let IsCorrectEmail = validateEmail(txtemail.value);
    if (IsCorrectEmail == true) {
      lblerrorEmailForm.classList.remove("animate__fadeIn");
      lblerrorEmailForm.classList.add("animate__fadeOut");

      return IsCorrectEmail;
    } else {
      lblerrorEmailForm.classList.remove("animate__fadeOut");
      lblerrorEmailForm.classList.add("animate__fadeIn");
      lblerrorEmailForm.style.visibility = "visible";
      lblerrorEmailForm.textContent = "Correo inválido";
      return IsCorrectEmail;
    }
  }
};

const verificadorinputCard = () => {
  if (txtnumberCard.value.length == 0) {
    lblerrorCardForm.classList.remove("animate__fadeOut");
    lblerrorCardForm.classList.add("animate__fadeIn");
    lblerrorCardForm.textContent = "No dejes este campo vacio";
    return false;
  } else {
    if (txtnumberCard.value.length < 16) {
      lblerrorCardForm.classList.remove("animate__fadeOut");
      lblerrorCardForm.classList.add("animate__fadeIn");
      lblerrorCardForm.textContent = "Número de tarjeta inválido";
      return false;
    } else {
      lblerrorCardForm.classList.remove("animate__fadeIn");
      lblerrorCardForm.classList.add("animate__fadeOut");
      return true;
    }
  }
};

const verificadorInputYear = () => {
  if (txtYear.value.length == 0) {
    lblerrorYearCvc.classList.remove("animate__fadeOut");
    lblerrorYearCvc.classList.add("animate__fadeIn");
    lblerrorYearCvc.textContent = "No dejes este campo de fecha vacio";
    return false;
  } else {
    lblerrorYearCvc.classList.remove("animate__fadeIn");
    lblerrorYearCvc.classList.add("animate__fadeOut");
    return true;
  }
};

const verificadorInputCvc = () => {
  if (txtCvc.value.length == 0) {
    lblerrorYearCvc.classList.remove("animate__fadeOut");
    lblerrorYearCvc.classList.add("animate__fadeIn");
    lblerrorYearCvc.textContent = "No dejes el campo cvc vacío";
    return false;
  } else {
    if (txtCvc.value.length < 3) {
      lblerrorYearCvc.classList.remove("animate__fadeOut");
      lblerrorYearCvc.classList.add("animate__fadeIn");
      lblerrorYearCvc.textContent = "Cvc inválido";
      return false;
    } else {
      lblerrorYearCvc.classList.remove("animate__fadeIn");
      lblerrorYearCvc.classList.add("animate__fadeOut");
      return true;
    }
  }
};
const verificadorInputName = () => {
  if (txtNomUser.value.length == 0) {
    lblerrorNomUser.classList.remove("animate__fadeOut");
    lblerrorNomUser.classList.add("animate__fadeIn");
    lblerrorNomUser.textContent = "No dejes este campo vacío";
    return false;
  } else {
    lblerrorNomUser.classList.remove("animate__fadeIn");
    lblerrorNomUser.classList.add("animate__fadeOut");
    return true;
  }
};

//Escuchamos el evento del input email

txtemail.addEventListener("input", () => {
  //llamamos la funcion que verifica este input
  email = VerificadorInputmail();
  if (email == true) {
    card = verificadorinputCard();
    if (card != false) {
      if (funcionValidator()) {
        activebtnform(true);
      } else {
        activebtnform(false);
      }
    }
  } else {
    activebtnform(false);
  }
});

//Escuchamos el evento donde se ingresa el numero de tarjeta de credito

txtnumberCard.addEventListener("input", (e) => {
  e.target.value = e.target.value.slice(0, 16);
  card = verificadorinputCard();
  if (card == true) {
    year = verificadorInputYear();
    if (year != false) {
      if (funcionValidator()) {
        activebtnform(true);
      } else {
        activebtnform(false);
      }
    }
  } else {
    activebtnform(false);
  }
});

//Escuchamos el evento donde se ingresa la fecha de la tarjeta
txtYear.addEventListener("input", () => {
  year = verificadorInputYear();
  if (year == true) {
    cvc = verificadorInputCvc();
    if (cvc == true) {
      if (funcionValidator()) {
        activebtnform(true);
      } else {
        activebtnform(false);
      }
    }
  } else {
    activebtnform(false);
  }
});

//Escuchamos el evento donde se ingresa el CVC de la tarjeta

txtCvc.addEventListener("input", (e) => {
  e.target.value = e.target.value.slice(0, 3);
  cvc = verificadorInputCvc();
  if (cvc == true) {
    nomuser = verificadorInputName();
    if (nomuser == true) {
      if (funcionValidator()) {
        activebtnform(true);
      } else {
        activebtnform(false);
      }
    }
  } else {
    activebtnform(false);
  }
});

//Escuchamos el evento donde se ingresa el nombre
txtNomUser.addEventListener("input", () => {
  nomuser = verificadorInputName();
  if (nomuser == true) {
    if (funcionValidator()) {
      activebtnform(true);
    } else {
      activebtnform(false);
    }
  } else {
    activebtnform(false);
  }
});

//Evento del formulario

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (funcionValidator()) {
    hideModals();
    showModal();
    CardModal.classList.add("StylesModalThanks");
    ThanksforBuy.style.display = "flex";
    form.reset();
    infoPayForm.textContent = " Listo ✅";
    toasty("Pronto tendrá sus productos en su ubicación");
    carrito = [];
    CarToLocal(carrito);
    infocarrito();
  }
});

//Continuar comprando
const btnContinueBuy = document.getElementById("btnContinueBuy");

btnContinueBuy.addEventListener("click", () => {
  hideModals();
  closeModal();
  ShowHideMainContent();
  CardModal.classList.remove("StylesModalThanks");
});

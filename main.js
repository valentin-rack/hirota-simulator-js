// ===================== HIROTA Cart 1.0 (super simple) =====================

// --------------------- Catálogo por categorías (arrays de objetos) ---------------------
const CATALOG = {
  KARATE_GI: [
    { id: "gi-tsubasa-rm", name: "Tsubasa (ready-made)", price: 125 },
    { id: "gi-tsubasa-ft", name: "Tsubasa (fully-tailored)", price: 215 },
    { id: "gi-takumi-rm",  name: "Takumi (ready-made)",  price: 125 },
    { id: "gi-takumi-ft",  name: "Takumi (fully-tailored)", price: 215 }
  ],
  BELTS: [
    { id: "b-104", name: "B-104 Black Cotton Normal (4cm)", price: 20 },
    { id: "b-203", name: "B-203 Black Satin Normal (4cm)",  price: 25 },
    { id: "b-303", name: "B-303 Black Cotton Yohachi Normal (4cm)", price: 30 },
    { id: "b-403", name: "B-403 Black Satin Shushi Special (4.5cm)", price: 35 },
    { id: "b-503", name: "B-503 Black Cotton Yohachi Special (4.5cm)", price: 38 },
    { id: "b-601", name: "B-601 Black Silk Normal (4cm)",   price: 70 },
    { id: "b-602", name: "B-602 Black Silk Special (4.5cm)", price: 82 }
  ],
  ACCESSORIES: [
    { id: "acc-tee",   name: "HIROTA Fist t-shirt", price: 26 },
    { id: "acc-stowl", name: "HIROTA Scarf Towel",  price: 12 },
    { id: "acc-htowl", name: "HIROTA Hand Towel",   price: 8 }
  ]
};


// --------------------- Carrito (array de objetos) ---------------------
const cart = [];


// --------------------- Utilidad: total del carrito (función tradicional) ---------------------
function cartTotal() {
  let total = 0; // acumulador
  for (const item of cart) {   // for...of
    total = total + (item.price * item.qty);
  }
  return total;
}


// --------------------- Helpers sencillos (prompts/alerts) ---------------------
function mainMenu() {
    return prompt(
    "🛒  HIROTA Cart 1.0\n" +
    "══════════════════════════════\n\n" +
    "1.  Add product\n" +
    "2.  Checkout\n" +
    "3.  Exit\n\n" +
    "👉  Choose an option (1–3):"
    );
}


function chooseCategory() {
  const opt = prompt(
    "Choose a category\n" +
    "══════════════════════════════\n\n" +
    "1.  🥋 KARATE-GI\n" +
    "2.  ⚫ BELTS\n" +
    "3.  🎒 ACCESSORIES\n\n" +
    "👉  Enter the number 1-3 (or Cancel to go back):"
  );
  if (opt === null) return null; // Si presiona botón "Cancelar" retorna "null"
  switch (opt.trim()) { // Si ingresa un prompt, retorna una "categoryKey"
    case "1": return "KARATE_GI";
    case "2": return "BELTS";
    case "3": return "ACCESSORIES";
    default:
      alert("Invalid option.");
      return null;
  }
}


function chooseProduct(categoryKey) {
  const list = CATALOG[categoryKey]; // Tomo array de objetos de categoría elegida (ej:"KARATE_GI")
  // Construyo el texto (msg) del prompt
  let msg = "Choose a product (" + categoryKey.replace("_", "-") + "):\n"+
  "══════════════════════════════\n\n";
  for (let i = 0; i < list.length; i++) { // Sumo al "msg" cada producto con su número y precio
    msg = msg + (i + 1) + ". " + list[i].name + " — " + list[i].price + " USD" + "\n";
  }
  msg = msg + "\n👉  Enter the number (or Cancel to go back)"; // Sumo al "msg" una línea con la instrucción
  // Muestro el mensaje y guardo el prompt
  const pick = prompt(msg);
  // Si presiona "Cancelar", devuelve null
  if (pick === null) return null; 
  // Transformo el número "pick" en el "index" correspondiente del array
  const idx = parseInt(pick, 10) - 1;
  // Si se cumple una de estas condiciones el prompt no es válido, aviso y devuelvo null
  if (Number.isNaN(idx) || idx < 0 || idx >= list.length) {
    alert("Invalid product number.");
    return null;
  }
  // Si el "idx" es un número en el rango adecuado, devuelve el producto elegido
  return list[idx];
}


function askQuantity() {
  const q = prompt(
    "¿Quantity?\n" +
    "══════════════════════════════\n\n" +
    "👉  Enter an integer > 0:"
  );
  // Si presiona "Cancelar", devuelve null
  if (q === null) return null;
  // Si ingresa un número entero y no negativo, devuelve la cantidad
  const qty = parseInt(q, 10);
  if (!Number.isInteger(qty) || qty <= 0) {
    alert("Invalid quantity.");
    return null;
  }
  return qty;
}


function addToCart(product, qty) {
  // Pushea el producto (objeto) al carro
  cart.push({
    id: product.id,
    name: product.name,
    price: product.price,
    qty: qty
  });
  // Aviso que fue agregado
  alert(
    "Added: " + product.name + " x" + qty +
    "\nCurrent total: USD " + cartTotal().toFixed(2)
  );
}


function showCartSummary() {
  // Si el carrito está vacío, mostramos un mensaje y salimos de la función
  if (cart.length === 0) {
    alert("Your cart 🛒 is empty.");
    return;
  }
  // Construímos el texto del resumen del carro
  let summary = "🛒  Cart summary:\n";
  // Recorremos todos los elementos del carrito
  for (const item of cart) {
  // Agregamos una línea al texto con su nombre, cantidad y subtotal de cada ítem
    summary = summary + "• " + item.name + " x" + item.qty +
      " = " + (item.price * item.qty).toFixed(2) + " USD" + "\n";
  }
  // Agregamos el total general al final del mensaje
  summary = summary + "\nTOTAL: " + cartTotal().toFixed(2) + " USD";
  // Mostramos todo en un alert
  alert(summary);
}


function checkout() {
  // Si el carrito está vacío, mostramos un mensaje y salimos de la función
  if (cart.length === 0) {
    alert("Your cart 🛒 is empty. Add something first.");
    return;
  }
  // Mostramos el resumen antes de confirmar la compra
  showCartSummary();
  // Pedimos confirmación al usuario
  const ok = confirm("Confirm purchase?");
  if (ok) {
    alert("Purchase confirmed. Thank you!");
    console.log("Final order:", cart, "TOTAL:", cartTotal());
    cart.length = 0; // vaciar carrito
  } else {
    alert("Checkout canceled.");
  }
}


// --------------------- Flujo Principal ---------------------
alert("Welcome to HIROTA Cart 1.0 (prompts only).");

// Variable que controla si el programa sigue corriendo
let running = true;

while (running) {
  // Mostramos menú principal y guardamos selección
  const choice = mainMenu();

  // Si presiona "Cancelar" en el Menu principal, salimos del bucle
  if (choice === null) { 
    break;
  }

  // Evaluamos selección
  switch (choice.trim()) {

    // Opción 1: agregar producto
    case "1":
      // Elige categoría, guardamos la "categoryKey" en "cat"
      const cat = chooseCategory();
      if (!cat) { break; } // si cat es "null" vuelve al menú

      // Elige producto específico de la "categoryKey", retorna el Producto (objeto)
      const prod = chooseProduct(cat);
      if (!prod) { break; } // si prod es "null" vuelve al menú

      // Elige cantidad del Producto
      const qty = askQuantity();
      if (!qty) { break; } // si qty es "null" vuelve al menú

      // Confirmar si desea agregarlo al carrito
      const confirmAdd = confirm(
        "Add to cart 🛒 ?\n" + prod.name + " x" + qty + " — " + (prod.price * qty).toFixed(2) + " USD"
      );

      // Si confirma, agregamos el producto al carrito
      if (confirmAdd) {
        addToCart(prod, qty);
      }
      break;

    // Opción 2: ir al checkout
    case "2":
      checkout();
      break;

    // Opción 3: salir del programa (no vaciamos el carrito, pues quedaría en "Local Storage")
    case "3":
      running = false; // detenemos el bucle
      alert("Goodbye!");
      break;

    // Cualquier otro valor: opción inválida
    default:
      alert("Invalid option.");
  }
}

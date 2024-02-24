
// se inicia creando dos arreglos de matrices unidireccionales//
const productos = ["iPhone 13", "XIAOMI Note 12", "Honor Magic",
"Samsung Galaxy", "Motorola G52", "iPhone 11", "XIAOMI Poco", "Motorola G72"];
const precios = [1500, 700, 800, 300, 450, 800, 900, 750];

    function actualicePrecios() {
        const productoSeleccionado = document.getElementById('product').value;
        const index = productos.indexOf(productoSeleccionado);
        const precio = precios[index];
        document.getElementById('selected-product').value = `${productoSeleccionado} precio $${precio}`;
    }

    document.getElementById('FormularioProductos').addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar que el formulario se envíe

        // Leer los valores del formulario
        const productoSeleccionado = document.getElementById('product').value;
        const index = productos.indexOf(productoSeleccionado);
        const precio = precios[index];
        const cupon = parseFloat(document.getElementById('cupon').value) || 0;
        const cantidad = parseInt(document.getElementById('cantidad').value);
        const destination = document.getElementById('destination').value;
        const peso = parseFloat(document.getElementById('peso').value);

        // Calcular descuento por cantidad
        let descuentoporCantidad = 0;
        if (cantidad > 1) {
            descuentoporCantidad = 0.1 * precio; // Descuento del 10% si se compran más de un producto
        }

        // Calcular costo de envío
        let costodeEnvio = 0;
        if (destination === 'local') {
            costodeEnvio = 5 * peso; // Costo de envío local: $5 por kg
        } else if (destination === 'national') {
            costodeEnvio = 10 * peso; // Costo de envío nacional: $10 por kg
        } else {
            costodeEnvio = 20 * peso; // Costo de envío internacional: $20 por kg
        }

        // Calcular costo final del producto
        const subtotal = precio * cantidad;
        const montodelDescuento = (subtotal * cupon) / 100;
        const totalAntesdelDescuento = subtotal - montodelDescuento - descuentoporCantidad;
        const impuesto = 0.12 * totalAntesdelDescuento; // IVA (12%)
        const totalCost = totalAntesdelDescuento + impuesto + costodeEnvio;

        // Mostrar el resultado en la página
        const resultElement = document.getElementById('resultado');
        resultElement.innerHTML = `
            <h2>Costo Final del Producto</h2>
            <p>Precio Original: $${precio.toFixed(2)}</p>
            <p>Descuento por Cupón: $${montodelDescuento.toFixed(2)}</p>
            <p>Descuento por Cantidad: $${descuentoporCantidad.toFixed(2)}</p>
            <p>Impuestos (IVA): $${impuesto.toFixed(2)}</p>
            <p>Costo de Envío: $${costodeEnvio.toFixed(2)}</p>
            <h3>Total: $${totalCost.toFixed(2)}</h3>
        `;
    });

    // Actualizar el precio al cargar la página
    actualicePrecios();
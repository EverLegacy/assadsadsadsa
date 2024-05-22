let listaProductos = document.querySelector("#listaProductos");
let listaCategorias = document.querySelector("#listaCategorias");

let productos = [];

let obtieneProductos = () => {
    fetch('https://fakestoreapi.com/products/')
        .then(res => res.json())
        .then(productosObtenidos => {
            console.log(productosObtenidos);
            productos = productosObtenidos.map(producto => ({
                ...producto,
                category: producto.category.replace("'", '')
            }));
            muestraProductos("");
        });
}

let muestraProductos = (categoria) => {
    console.log("muestraProductos:", productos);

    let productosMostrar = categoria 
        ? productos.filter(producto => producto.category === categoria) 
        : productos;

    listaProductos.innerHTML = productosMostrar.map(producto => `
        <div class="col-12 col-md-3 py-5">
            <div class="card" style="max-height: 600px;">
                <img class="py-3 imagenProducto" src="${producto.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${producto.title}</h5>
                    <p class="card-text">${producto.description.slice(0, 100)}</p>
                    <a href="#" class="btn btn-primary">Comprar ahora</a>
                </div>
            </div>
        </div>
    `).join('');
}

fetch('https://fakestoreapi.com/products',{
            method:"POST",
            body:JSON.stringify(
                {
                    title: 'test product',
                    price: 13.5,
                    description: 'lorem ipsum set',
                    image: 'https://i.pravatar.cc',
                    category: 'electronic'
                }
            )
        })
            .then(res=>res.json())
            .then(json=>console.log(json))
obtieneProductos();
obtieneCategorias();

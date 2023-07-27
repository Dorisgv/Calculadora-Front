 /************************ INICIALIZACION DE VARIABLES ************************/

var lista_de_usuarios, tipos_de_usuario, billetes, billetes_usados;
var cantidad_cinco_mil, cantidad_diez_mil, cantidad_veinte_mil, cantidad_cincuenta_mil, cantidad_cien_mil;
var usuario = "";
var cont = "";

Inicializar_lista_de_valores(); //Aqui estoy llamando la funcion!

for (let i=0; i<=lista_de_usuarios.length-1; i++){
    console.log(lista_de_usuarios[i].nombre);
    console.log(lista_de_usuarios[i].num_doc);
    console.log(lista_de_usuarios[i].contraseña);
    console.log(lista_de_usuarios[i].tipo_usuario);
    console.log("-------------------------------------------------------------------------");
}

iniciar_cajero(); //Aqui estoy llamando la funcion INICIAR CAJERO

function iniciar_cajero(){
    /********************** INGRESO DE USUARIO Y CONTRASEÑA **********************/

   // solicitar_usuario_y_contraseña(); //Aqui estoy llamando la funcion SOLICITAR USUARIO Y CONTRASEÑA */

    /**************************** VALIDACION DE USUARIO ***************************/

    var usuario_existe = validar_usuario(usuario, cont);
    while(!usuario_existe){
        solicitar_usuario_y_contraseña();
        usuario_existe = validar_usuario(usuario, cont);
       console.log("--------------------------------");
    }

    /************************* VALIDACION DE USUARIO Y TIPO ************************/

     if(obtener_tipo_de_usuario(usuario) === "Administrador"){
        console.log("El tipo de usuario es ADMINISTRADOR");
        console.log("---------------------------------------------------------------------");
        cargar_billetes();
        iniciar_cajero();
    }else{
        console.log("El tipo de usuario es CLIENTE");
        console.log("---------------------------------------------------------------------");
        if(total_general() === 0){
            console.log("Cajero en mantenimiento, vuelva pronto");
            console.log("-----------------------------------------------------------------");
            iniciar_cajero();
            console.log("-----------------------------------------------------------------");
        }

        let cantidad_a_retirar = prompt("Por favor ingrese la cantidad a retirar");
        console.log("La cantidad ingresada para retirar fue: " + cantidad_a_retirar);
        console.log("---------------------------------------------------------------------");
        
        //
        if(total_general() >= cantidad_a_retirar){
        
            /* Reiniciar billetes usados */
            billetes_usados.cien_mil = 0;
            billetes_usados.cincuenta_mil = 0;
            billetes_usados.veinte_mil = 0;
            billetes_usados.diez_mil = 0;
            billetes_usados.cinco_mil = 0; 

            // 1'000.000  - 258.000
            
             //5
            for (let i=1; i<=billetes.cien_mil; i++) {
                if (cantidad_a_retirar >= (100000 * i)){
                    billetes_usados.cien_mil = billetes_usados.cien_mil + 1; 
                }
            }
            
            billetes.cien_mil = billetes.cien_mil - billetes_usados.cien_mil;
            cantidad_a_retirar = cantidad_a_retirar - billetes_usados.cien_mil * 100000;

            // 55000
            for (let i=1; i<=billetes.cincuenta_mil; i++) {
                if (cantidad_a_retirar >= (50000 * i)){
                    billetes_usados.cincuenta_mil = billetes_usados.cincuenta_mil + 1; 
                }
            }  

             billetes.cincuenta_mil = billetes.cincuenta_mil - billetes_usados.cincuenta_mil;
            cantidad_a_retirar = cantidad_a_retirar - billetes_usados.cincuenta_mil * 50000;

            //5000
            for (let i=1; i<=billetes.veinte_mil; i++) {
                if (cantidad_a_retirar >= (20000 * i)){
                    billetes_usados.veinte_mil = billetes_usados.veinte_mil + 1; 
                }
            }
            
            billetes.veinte_mil = billetes.veinte_mil - billetes_usados.veinte_mil;
            cantidad_a_retirar = cantidad_a_retirar - billetes_usados.veinte_mil * 20000;

            //5000
            for (let i=1; i<=billetes.diez_mil; i++) {
                if (cantidad_a_retirar >= (10000 * i)){
                    billetes_usados.diez_mil = billetes_usados.diez_mil + 1; 
                }
            }

            billetes.diez_mil = billetes.diez_mil - billetes_usados.diez_mil;
            cantidad_a_retirar = cantidad_a_retirar - billetes_usados.diez_mil * 10000;

            //5000
            for (let i=1; i<=billetes.cinco_mil; i++) {
                if (cantidad_a_retirar >= (5000 * i)){
                    billetes_usados.cinco_mil = billetes_usados.cinco_mil + 1; 
                }
            }

            billetes.cinco_mil = billetes.cinco_mil - billetes_usados.cinco_mil;
            cantidad_a_retirar = cantidad_a_retirar - billetes_usados.cinco_mil * 5000;

            if(cantidad_a_retirar != 0){
                console.log("Resta para retirar: " + cantidad_a_retirar);
            } 

            console.log("Cantidad de billetes de 100.000 entregados: " + billetes_usados.cien_mil);
            console.log("Cantidad de billetes de 50.000 entregados: " + billetes_usados.cincuenta_mil);
            console.log("Cantidad de billetes de 20.000 entregados: " + billetes_usados.veinte_mil);
            console.log("Cantidad de billetes de 10.000 entregados: " + billetes_usados.diez_mil);
            console.log("Cantidad de billetes de 5.000 entregados: " + billetes_usados.cinco_mil);
            console.log("--------------------------------------------------------------------------------")

            total_general(); 

            iniciar_cajero();
        }else{
            console.log("El monto solicitado no está disponible");
            console.log("--------------------------------------------------------------------------------")
            iniciar_cajero();
        }

    }
}


/************************* DECLARACION DE FUNCIONES ************************/

 function solicitar_usuario_y_contraseña(){
    usuario = "";
    cont = "";
    usuario = prompt("Por favor ingrese el usuario");
    console.log("El usuario ingresado es: " + usuario);
    cont = prompt("Por favor ingrese la contraseña");
    console.log("La contraseña ingresada es: " + cont);
    console.log("--------------------------------------------------------------------------------")
}

 function validar_usuario(usuarioIngresado, contraseñaIngresada){
    let existe_usuario = false;
    for (let i=0; i<=lista_de_usuarios.length-1; i++) { //REPASAR ESTA LINEA
        if(lista_de_usuarios[i].nombre === usuarioIngresado && lista_de_usuarios[i].contraseña === contraseñaIngresada){
            existe_usuario = true;
        }
    }

    if (existe_usuario) {
        console.log("Este usuario SI existe");
    }else{
        console.log("Este usuario NO existe");
        console.log("--------------------------------------------------------------------------------")
    }

    return existe_usuario;
}
//Esta funcion lo que me permite es asignar valores por defecto de las variables que estan dentro de la funcion!
function Inicializar_lista_de_valores(){
    tipos_de_usuario = ["Administrador", "Cliente"]
    console.log(tipos_de_usuario[0]);
    console.log(tipos_de_usuario[1]);

    lista_de_usuarios = [ 
        {
            nombre: "Juan",
            num_doc: "123456",
            contraseña: "soyJuan",
            tipo_usuario: tipos_de_usuario[1]
        },

        {
            nombre: "Doris",
            num_doc: "123653",
            contraseña: "soyDoris",
            tipo_usuario: tipos_de_usuario[0]
        },

        {
            nombre: "Diego",
            num_doc: "654329",
            contraseña: "soyDiego",
            tipo_usuario: tipos_de_usuario[1]
        },

        {
            nombre: "Maria",
            num_doc: "1890521",
            contraseña: "soyMaria",
            tipo_usuario: tipos_de_usuario[0]
        },

        {
            nombre: "Lau",
            num_doc: "097632",
            contraseña: "soyLau",
            tipo_usuario: tipos_de_usuario[1]
        },
    ]

    billetes = {
        cinco_mil : 0,
        diez_mil : 0,
        veinte_mil : 0,
        cincuenta_mil : 0,
        cien_mil : 0
    }

    billetes_usados = {
        cinco_mil : 0,
        diez_mil : 0,
        veinte_mil : 0,
        cincuenta_mil : 0,
        cien_mil : 0
    }
}

function obtener_tipo_de_usuario(usuario_ingresado){
    let tipo_usuario = "";
    for(let i=0; i<=lista_de_usuarios.length-1; i++){
        if(lista_de_usuarios[i].nombre === usuario_ingresado){
            tipo_usuario = lista_de_usuarios[i].tipo_usuario;
        }
    }

    return tipo_usuario;
} 


function cargar_billetes(){
    cantidad_cinco_mil = parseInt (prompt("Ingrese la cantidad de billetes de 5.000 COP"));
    console.log("La cantidad de billetes ingresada de 5.000 fue: " + cantidad_cinco_mil);
    console.log("El monto total de 5.000 es: " + cantidad_cinco_mil * 5000); 
    cantidad_diez_mil = prompt("Ingrese la cantidad de billetes de 10.000 COP");
    console.log("La cantidad de billetes ingresada de 10.000 fue: " + cantidad_diez_mil);
    console.log("El monto total de 10.000 es: " + cantidad_diez_mil * 10000); 
    cantidad_veinte_mil = prompt("Ingrese la cantidad de billetes de 20.000 COP");
    console.log("La cantidad de billetes ingresada de 20.000 fue: " + cantidad_veinte_mil);
    console.log("El monto total de 20.000 es: " + cantidad_veinte_mil * 20000); 
    cantidad_cincuenta_mil = prompt("Ingrese la cantidad de billetes de 50.000 COP");
    console.log("La cantidad de billetes ingresada de 50.000 fue: " + cantidad_cincuenta_mil);
    console.log("El monto total de 50.000 es: " + cantidad_cincuenta_mil * 50000); 
    cantidad_cien_mil = prompt("Ingrese la cantidad de billetes de 100.000 COP");
    console.log("La cantidad de billetes ingresada de 100.000 fue: " + cantidad_cien_mil);
    console.log("El monto total de 100.000 es: " + cantidad_cien_mil * 100000); 
    console.log("------------------------------------------------------------------------------");
     
    billetes.cinco_mil = billetes.cinco_mil + parseInt(cantidad_cinco_mil);
    billetes.diez_mil = billetes.diez_mil + parseInt(cantidad_diez_mil);
    billetes.veinte_mil = billetes.veinte_mil + parseInt(cantidad_veinte_mil);
    billetes.cincuenta_mil = billetes.cincuenta_mil + parseInt(cantidad_cincuenta_mil);
    billetes.cien_mil = billetes.cien_mil + parseInt(cantidad_cien_mil);
    //console.log("-----------------------------------------------------------------------------");
    
    total_general(); 

} 

 function total_general(){
    let total = 0;
    total = (billetes.cinco_mil * 5000) + (billetes.diez_mil * 10000) + (billetes.veinte_mil * 20000) + (billetes.cincuenta_mil * 50000) + (billetes.cien_mil * 100000);
    
    console.log("Cantidad total de billetes de 5.000 es: " + billetes.cinco_mil);
    console.log("Monto total de billetes de 5.000 es: " + billetes.cinco_mil * 5000);

    console.log("Cantidad total de billetes de 10.000 es: " + billetes.diez_mil);
    console.log("Monto total de billetes de 10.000 es: " + billetes.diez_mil * 10000);

    console.log("Cantidad total de billetes de 20.000 es: " + billetes.veinte_mil);
    console.log("Monto total de billetes de 20.000 es: " + billetes.veinte_mil * 20000);

    console.log("Cantidad total de billetes de 50.000 es: " + billetes.cincuenta_mil);
    console.log("Monto total de billetes de 50.000 es: " + billetes.cincuenta_mil * 50000);

    console.log("Cantidad total de billetes de 100.000 es: " + billetes.cien_mil);
    console.log("Monto total de billetes de 100.000 es: " + billetes.cien_mil * 100000);
    console.log("--------------------------------------------------------------------------------")

    console.log("El total de dinero es: " + total);
    console.log("--------------------------------------------------------------------------------")
    
    return total;
}
 
//--------------------------------------------------------------------------------------------------------------------------





















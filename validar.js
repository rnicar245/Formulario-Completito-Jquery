/**
    * @author Rafael Jesús Nieto Cardador
*/


    let Validar = (function() {
        const expresiones = new Map();
        expresiones.set("correo", /^[^@]+[^\.\-\@\_]@[1-9a-zA-ZáéíóúÁÉÍÓÚñÑ]+(\.[a-z]{2,3}){1,2}$/);
        expresiones.set("dni", /^(\d{8}) ?([a-zA-Z]$)/);
        expresiones.set("fecha" , /^(\d{2})([/-])(\d{2})([/-])(\d{4})$/);
        expresiones.set("tel", /^(\(?\+?\d{1,4}\)?([ -\.]))?[6-9]([0-9]{2}\2){3}[0-9]{2}$/);
        expresiones.set("url" , /^http[s]?:\/\/([w]{3}\.)?.+\.[a-z]{2,3}[[\/.+]*|\/]$/);

        
        function validarTexto(texto){
            if(texto == ""){
                return "El campo está vacío.";
            }
            return "";
        }
        
        function validarNum(num){
            if(num == ""){
                return "El campo está vacío.";
            }

            if(isNaN(num)){
                return "La cadena introducida no es numérica."
            }

            return "";
        }

        function validarCorreo(email){
            if(email == ""){
                return "El campo está vacío.";
            }
            if(!expresiones.get("correo").test(email)){
                return "Formato correcto: example@gmail.com."
            }
            return "";
        }

        function validarDNI(dni){
            try{
                const letras = "TRWAGMYFPDXBNJZSQVHLCKET";
                let dniReg = expresiones.get("dni");
                
                if(dni == ""){
                    return "El campo está vacío.";
                }

                let [,num, letra] = dniReg.exec(dni);

                if(letra.toUpperCase() != letras[num%23]){
                    return "La letra no coincide con el número.";
                }
    
                return "";
            }catch(er){
                return "Formato correcto: 07930497M";
            }
           
            
        }

        function validarFecha (fecha){
            try{
                if(fecha == ""){
                    return "El campo está vacío.";
                }

                let [,dia, signo1, mes, signo2, ano] = expresiones.get("fecha").exec(fecha);              

                let fechaObjeto = new Date(`${ano}/${mes}/${dia}`);
                
                if(signo1 != signo2){
                    return "Puedes usar / o - para separar la fecha, pero no ambos.";
                }

                if(Number(dia) != fechaObjeto.getDate() || Number(mes) != fechaObjeto.getMonth() +1 || Number(ano) != fechaObjeto.getFullYear()){
                    return "La fecha no existe, ten en cuenta los límites de días de cada mes.";
                }  

                return "";
            }catch(er){
                return "Formato correcto: DD-MM-AAAA (01-01-1999)";
            }
        }

        function validarTel (tel){
            if(tel == ""){
                return "El campo está vacío.";
            }
            
            if(!expresiones.get("tel").test(tel)){
                return "Formato correcto: 657 01 23 45 o 657012345.";
            }

            return "";
             
        }

        function validarUrl (url){
            if(url == ""){
                return "El campo está vacío.";
            }
            
            if(!expresiones.get("url").test(url)){
                return "Formato correcto: https://example.com/example/";
            }
            return "";
        }

        function validarModulo (modulo){
            if(modulo == undefined || modulo == ""){
                return "Elija un módulo, por favor.";
            }
             
            return "";
        }

        function validarAficiones (aficiones){
            if(!aficiones[0].checked && !aficiones[1].checked && !aficiones[2].checked){
                return "Elija al menos una afición, por favor.";
            }
            return "";
             
        }

        function validarGrado (grado){
            if(!grado[0].checked && !grado[1].checked){
                return "Elija al menos un grado, por favor.";
            }
            return "";
        }

        return{
            validarTexto: validarTexto,
            validarNum: validarNum,
            validarCorreo: validarCorreo,
            validarDNI: validarDNI,
            validarFecha: validarFecha,
            validarTel:validarTel,
            validarUrl:validarUrl,
            validarModulo:validarModulo,
            validarAficiones:validarAficiones,
            validarGrado:validarGrado
        }

    })();

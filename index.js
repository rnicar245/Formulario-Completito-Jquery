/**
  * @author Rafael Jesús Nieto Cardador
 */

$(function () {
    $("form")
        .on("submit", function (evento) {
            evento.preventDefault();
            $("input, select").trigger("blur");

            if ($("span:not(:empty)").length === 0) {
                $("p").html("Todo está en orden");
                $("form").fadeOut("slow").fadeIn("slow");
                setTimeout(function () {
                    $("form").trigger("reset");
                }, 500);
            }else{
                console.log($("span:not(:empty)").first().prev().children().first());
                $("span:not(:empty)").first().prev().children().first().focus();
            }
        })
        .on("reset", function () {
            $("input, select").removeClass("valido").removeClass("erroneo");
            $("span").html("");
            $("p").html("");
        });

    $("input, select")
        .on("blur", validarInput)
        .on("focus", function () {
            $(this).removeClass("valido").removeClass("erroneo");
            $(this).parent().next().html("");
        });

    $("span").css("color", "red");

    //Rellenar
    $("#rellenar").click(function () {
        let cadenasRellenar = ["a", "1", "hola@gmail.com", "07930497M", "01/01/1999", "(+1031)-655-55-55-55", "https://www.hola.com"];
        $("input").each(function () {
            switch ($(this).prop("type")) {
                case "text":
                    $(this).val(cadenasRellenar[0]);
                    cadenasRellenar.shift();
                    break;

                case "checkbox":
                case "radio":
                    $(this).parent().children().first().prop("checked", true);
                    break;
            }

        });
        $("select").val("DAW").trigger("blur");
        $("input").trigger("blur");
    });
});
let validarFormulario = function () {
    $error = false;
    $("input").trigger("blur");
    $("select").trigger("blur");

    $("span").each(function () {
        if ($(this).html() != "") {
            
            $("p").html("");
            $error = true;
            return false;
        }
    });
    if (!$error)
        $("p").html("Todo está en orden");
}


let validarInput = function () {
    switch ($("input").index(this)) {
        case 0:
            $(this).parent().next().html(Validar.validarTexto($(this).val()));
            break;
        case 1:
            $(this).parent().next().html(Validar.validarNum($(this).val()));
            break;
        case 2:
            $(this).parent().next().html(Validar.validarCorreo($(this).val()));
            break;
        case 3:
            $(this).parent().next().html(Validar.validarDNI($(this).val()));
            break;
        case 4:
            $(this).parent().next().html(Validar.validarFecha($(this).val()));
            break;
        case 5:
            $(this).parent().next().html(Validar.validarTel($(this).val()));
            break;
        case 6:
            $(this).parent().next().html(Validar.validarUrl($(this).val()));
            break;
        case 7:
        case 8:
        case 9:
            $(this).parent().next().html(Validar.validarAficiones($(this).parent().children()));
            break;
        case 10:
        case 11:
            $(this).parent().next().html(Validar.validarGrado($(this).parent().children()));
            break;
    }
    if ($("select").index(this) != -1)
        $(this).parent().next().html(Validar.validarModulo($(this).val()));

    $(this).parent().next().html() == "" ? $(this).removeClass("erroneo").addClass("valido") : $(this).removeClass("valido").addClass("erroneo");

}

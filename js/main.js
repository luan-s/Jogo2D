//// VARIAVEIS DE CONTROLE ////
var movimento = true;
var veloci = 35


$( document ).ready(function(){
  $("body").keydown(function(e){

    //console.log(e.which)
  /*  e.preventDefault();*/
    if(verificaTeto())
      if(e.which == 38)
        sobe(veloci+15);

      if(e.which == 40)
        desce(veloci);

    //Esquerda
    if(verificaEsquerda())
      if(e.which == 37)
        esquerda(veloci);

    //Direita
    if(verificaDireita())
      if(e.which == 39)
        direita(veloci)
  });

  //Acerta o angulo do personagem
  $("body").keyup(function(e){
    acertaAgngulo;
    movimento = true;
  });

  sobe = function(velocidade){
    $(".personagem").css("transform","rotate(-20deg)");
    var ant = parseInt($(".personagem").css("top"));
    $(".personagem").css("top",ant-velocidade+"px");
    movimento = false;
  }

  desce = function(velocidade){
    if(!verificafundo()) return;

    if(movimento)
      $(".personagem").css("transform","rotate(20deg)");


    var ant = parseInt($(".personagem").css("top"));
    $(".personagem").css("top",ant+velocidade+"px");
  }

  esquerda = function(velocidade){
    $(".personagem").css("transform","rotate(0deg)");
    var ant = parseInt($(".personagem").css("left"));
    $(".personagem").css("left",ant-velocidade+"px");
    movimento = false;
  }

  direita = function(velocidade){
    $(".personagem").css("transform","rotate(0deg)");
    var ant = parseInt($(".personagem").css("left"));
    $(".personagem").css("left",ant+velocidade+"px");
    movimento = false;

  }

  function verificaTeto(){
    return (parseInt($(".personagem").css("top")) > 5)
  }

  function verificafundo(){
    return (parseInt($(".personagem").css("top")) < parseInt($("body").css("height")) - 150)
  }

  function verificaDireita(){
    return (parseInt($(".personagem").css("left")) < parseInt($("body").css("width")) - 150)
  }

  function verificaEsquerda(){
    return (parseInt($(".personagem").css("left")) > 20)
  }

  // Acerta angulo do personagem
  var acertaAgngulo = function(){
    $(".personagem").css("transform","rotate(0deg)");
  };


  //Queda do personagem
  setInterval(function(){
    desce(15);
  },100)

})
console.log($(".object-die").css("top"));



////Verifica Colis?es////
setInterval(function(){
  if( parseInt($(".personagem").css("top"))+parseInt($(".personagem").css("height")) == parseInt($(".object-die").css("top") )  ){
    console.log("encostou");
  }
},1);


//Movimenta objetos-die

setInterval(function(){
  var ant = parseInt($(".object-die").css("left"));
  $(".object-die").css("left",ant-20+"px");
},50);


setInterval(function(){
  $(".area-jogavel").append('<div class="object-die"></div>');
},1000);


$(document).keydown(function(event) {
if (event.ctrlKey==true && (event.which == '61' || event.which == '107' || event.which == '173' || event.which == '109'  || event.which == '187'  || event.which == '189'  ) ) {
      return;
     }
    // 107 Num Key  +
    // 109 Num Key  -
    // 173 Min Key  hyphen/underscor Hey
    // 61 Plus key  +/= key
});

$(window).bind('mousewheel DOMMouseScroll', function (event) {
       if (event.ctrlKey == true) {
       event.preventDefault();
       }
});

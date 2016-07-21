//// VARIAVEIS DE CONTROLE ////
var movimento = true;
var veloci = 30
var PERSONAGEM = $(".personagem");

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
    PERSONAGEM.css("transform","rotate(-20deg)");
    var ant = parseInt(PERSONAGEM.css("top"));
    PERSONAGEM.css("top",ant-velocidade+"px");
    movimento = false;
  }

  desce = function(velocidade){
    if(!verificafundo()) return;

    if(movimento)
      PERSONAGEM.css("transform","rotate(20deg)");


    var ant = parseInt(PERSONAGEM.css("top"));
    PERSONAGEM.css("top",ant+velocidade+"px");
  }

  esquerda = function(velocidade){
    PERSONAGEM.css("transform","rotate(0deg)");
    var ant = parseInt(PERSONAGEM.css("left"));
    PERSONAGEM.css("left",ant-velocidade+"px");
    movimento = false;
  }

  direita = function(velocidade){
    PERSONAGEM.css("transform","rotate(0deg)");
    var ant = parseInt(PERSONAGEM.css("left"));
    PERSONAGEM.css("left",ant+velocidade+"px");
    movimento = false;

  }

  function verificaTeto(){
    return (parseInt(PERSONAGEM.css("top")) > 5)
  }
  function verificafundo(){
    return (parseInt(PERSONAGEM.css("top")) < parseInt($("body").css("height")) - 150);
  }

  function verificaDireita(){
    return (parseInt(PERSONAGEM.css("left")) < parseInt($("body").css("width")) - 150);
  }

  function verificaEsquerda(){
    return (parseInt(PERSONAGEM.css("left")) > 20)
  }

  // Acerta angulo do personagem
  var acertaAgngulo = function(){
    PERSONAGEM.css("transform","rotate(0deg)");
  };


  //Queda do personagem
  setInterval(function(){
    desce(15);
  },100)

})
console.log($(".object-die").css("top"));

////Verifica Colis?es////
setInterval(function(){
  var alturaPersonagem = parseInt(PERSONAGEM.css("top"))+parseInt(PERSONAGEM.css("height"));
  var alturaBloco = parseInt($(".object-die").css("top") );
  var rightSidePersonagem = parseInt(PERSONAGEM.css("left"))+parseInt(PERSONAGEM.css("width"));
  var leftSideObjeto = parseInt($(".object-die").css("left"))
  if(leftSideObjeto == rightSidePersonagem)
    alert("canto");

  if( alturaPersonagem  ==  alturaBloco ){
    console.log("encostou");
  }
},1);

//Movimenta objetos-die
setInterval(function(){
  $(".object-die").css("display","block");
  var ant = parseInt($(".object-die").css("left"));
  $(".object-die").css("left",ant-30+"px");

  if(parseInt($(".object-die").css("left")) < 0 ){
    $(".object-die").css("display","none");
    $(".object-die").css("left","130%");
  }
},0.0001);


/*setInterval(function(){
  $(".area-jogavel").append('<div class="object-die"></div>');
},1000);*/

//// VARIAVEIS DE CONTROLE ////
var movimento = true;
var veloci = 35


$( document ).ready(function(){
  $("body").keydown(function(e){

    //console.log(e.which)
  /*  e.preventDefault();*/
    if(verificaTeto())
      if(e.which == 38)
        sobe(veloci+10);

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
    return (parseInt($(".personagem").css("top")) > 15)
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
    desce(10);
  },100)

})

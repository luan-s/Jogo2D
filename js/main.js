//// VARIAVEIS DE CONTROLE ////
var movimento = true;
var veloci = 30
var PERSONAGEM = $(".personagem");
var movimentoX =  true;

////DEBUGMODE////
var DEBUG_MODE = false;

$( document ).ready(function(){
  $("body").keydown(function(e){

  //console.log(e.which)
  /*  e.preventDefault();*/
    if(verificaTeto())
      if(e.which == 38)
        sobe(veloci+15);

      if(e.which == 40)
        desce(veloci+20);

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
    PERSONAGEM.css("transform","rotate(-20deg) translateX(20%)");
    var ant = parseInt(PERSONAGEM.css("top"));
    PERSONAGEM.css("top",ant-velocidade+"px");
    movimento = false;
  }

  gravidade = function(velocidade){
    if(!verificafundo()) return;

    if(movimento)
      PERSONAGEM.css("transform","rotate(20deg) translateX(20%)");


    var ant = parseInt(PERSONAGEM.css("top"));
    PERSONAGEM.css("top",ant+velocidade+"px");
  }

  desce = function(velocidade){
    if(!verificafundo()) return;

    if(movimento)
      PERSONAGEM.css("transform","rotate(90deg) translateX(10%)");
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
  /*  PERSONAGEM.css("transform","rotate(0deg) ");*/
  };

  //Queda do personagem
  var run_gravidade = setInterval(function(){
    gravidade(15);
  },100)

  //Movimenta objetos-die
  var movimentaObjetosDie = setInterval(function(){
    $(".object-die").css("display","block");
    var ant = parseInt($(".object-die").css("left"));
    $(".object-die").css("left",ant-30+"px");

    if(parseInt($(".object-die").css("left")) < 0 - 100 ){
      $(".object-die").css("display","none");
      $(".object-die").css("left","130%");
    }
  },5);

  /*setInterval(function(){
    $(".area-jogavel").append('<div class="object-die"></div>');
  },1000);*/

  ////DEBUG_MODE////
  if(DEBUG_MODE){
    /*$(".area-jogavel").append('<div class="barraY"></div>');
    $(".area-jogavel").append('<div class="barraX"></div>');*/
    clearInterval(run_gravidade);
  /*  setInterval(function(){
        $(".rightPlayer").css("left",PERSONAGEM.position().left+PERSONAGEM.width()+"px");
    },0.0001);*/
  }

  //Monitor de colisoes
  monitorColisoes = setInterval(function(){
    verificaArestasPersonagem();
  },5);


  verificaArestasPersonagem = function(){

    canto_superior_esquerdoY = parseInt(PERSONAGEM.css("top")) - parseInt(PERSONAGEM.css("height"));
    canto_superior_esquerdoX = parseInt(PERSONAGEM.css("left"));

    canto_superior_direitoY = canto_superior_esquerdoY;
    canto_superior_direitoX = parseInt(PERSONAGEM.css("left")) + parseInt(PERSONAGEM.css("width"));

    canto_inferior_esquerdoY = parseInt(PERSONAGEM.css("top"));
    canto_inferior_esquerdoX = parseInt(PERSONAGEM.css("left"));

    canto_inferior_direitoY = canto_inferior_esquerdoY;
    canto_inferior_direitoX = parseInt(PERSONAGEM.css("left")) + parseInt(PERSONAGEM.css("width"))

    verificaQueda();

    for(var i = canto_superior_esquerdoX ; i <=  canto_superior_direitoX;i++){
      colidiu(i, canto_inferior_direitoY);
    }

    for(var i = canto_superior_direitoY ; i <=  canto_inferior_direitoY;i++){
      colidiu(canto_inferior_direitoX, i);
    }

    for(var i = canto_superior_esquerdoX ; i <=  canto_superior_direitoX;i++){
      colidiu(i, canto_inferior_direitoY);
    }

    for(var i = canto_superior_direitoY ; i <=  canto_inferior_direitoY;i++){
      colidiu(canto_inferior_direitoX, i);
    }

  }//verificaArestasPersonagem

  //Verifica se um algum ponto do personagem esta colidindo com algum objeto
  colidiu =  function(X, Y){
    OBJETO = $(".object-die");
    if( (X >= parseInt(OBJETO.css("left")) &&  X <= parseInt(OBJETO.css("left")) + parseInt(OBJETO.css("width")) )
        && (Y >= parseInt(OBJETO.css("top")) - parseInt(OBJETO.css("height")) && Y <= parseInt(OBJETO.css("top")) )
      ){

        playerDie();
    }
  }

  //Verifica se o personagem tocou o chao
  verificaQueda = function(){
    if(!verificafundo())
      playerDie();
  }

  //Comando executados quando o pesonagem morre
  function playerDie(){
    PERSONAGEM.css("display","none");
    PERSONAGEM.css("top","10px");
    PERSONAGEM.css("left","10px");

    setTimeout(function(){
      PERSONAGEM.css("display","block");
    },1000)
  }
})///document.ready

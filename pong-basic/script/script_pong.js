//navigatie
function naarPagina(pagina)
{
    $('section').css('display','none');
    $(pagina).css('display', 'block');
}

//hoogste scores
var spelers=["speler1","speler2","speler3"];
var scores=[1,2,3];

//spelers laden uit array
function laadSpelers()
{
    $.each(spelers, function(i, val)
    {
        $('#scores').find('#playerList').append("<li>"+ val +"</li>");
    });
}
//score laden uit array
function laadScores()
{
    $.each(scores, function(i, val)
    {
        $('#scores').find('#scoreList').append("<li>"+ val +"</li>");
    });
}

//spelers verplaatsen met interact.js

// target elements with the "draggable" class
interact('.draggable')
  .draggable({
    // keep the element within the area of it's parent
    restrict: {
      restriction: "parent",
      endOnly: true,
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    },
    // enable autoScroll
    autoScroll: true,

    // call this function on every dragmove event
    onmove: dragMoveListener,
    // call this function on every dragend event
    onend: function (event) {
      var textEl = event.target.querySelector('p');

      textEl && (textEl.textContent =
        'moved a distance of '
        + (Math.sqrt(event.dx * event.dx +
                     event.dy * event.dy)|0) + 'px');
    }
  });

  function dragMoveListener (event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = 0,//(parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    //target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }

  // this is used later in the resizing and gesture demos
  window.dragMoveListener = dragMoveListener;

//bal verplaatsen

var balX = parseInt($("#ball").css("left"));//postitie
var balY = parseInt($("#ball").css("top"));
var speler1X = parseInt($("#player1").css("left"));
var speler1Y=parseInt($("#player1").css("top"));
var speler1H = parseInt($("#player1").css("height"));
var speler2X = parseInt($("#player2").css("left"));
var speler2Y = parseInt($("#player2").css("top"));
var speler2H = parseInt($("#player2").css("height"));
var vx=5;//snelheid horizontaal
var vy=3;//snelheid verticaal
var score1=0;
var score2=-1;
var aantalSpelers;
var gameInterval;
var spelTimer;
var spelduur=10;

function startGame(spelers)
{ 
    if(spelers)
    {
        aantalSpelers=spelers;
    }
    gameInterval=window.setInterval(function(){verplaats(aantalSpelers)}, 10);
    spelTimer= setInterval(speeltijd,1000);
}

function pauseGame()
{
    clearInterval(gameInterval);
    clearInterval(spelTimer);
}
function newGame()
{
    vx=5;//snelheid horizontaal
    vy=3;//snelheid verticaal
    score1=0;
    score2=0;
    spelduur=10;//geselecteerde tijd
    $("#game").find('#score1').html(score1);
    $("#game").find('#score2').html(score2);
}


function verplaats(aantal)
{
    var spelers=aantal; 
    
    $('#game').find('#player2, #score2').css('display','none');
    
    //positie bal
    balX+= vx;
    balY+= vy;
    
    //verplaats de bal
    $("#ball").css({left:balX, top:balY});
    
    //1 speler
    
    //positie speler 1 
    speler1Y=parseInt($("#player1").css("top"))+ parseInt($("#player1").attr("data-y"));

    //bal horizontaal terugkaatsen op de muur
    if(balX>=$("#pongGame").width())
    {
        vx=-vx;
        $("#ball").css({"backgroundColor":"green"});
        if(score2>0)
        {
            score2--;
        }
        else
        {
            score2=0;
        }
        $("#game").find('#score2').html(score2);
    }
    if(balX<=0)
    {
        vx=5;
        $("#ball").css({"backgroundColor":"red"});
        if(score1>0)
        {
            score1--;      
        }
        else
        {
            score=0;
        }
        $("#game").find('#score1').html(score1);
    }
    //bal verticaal terugkaatsen op muur
    if(balY<0)
    {
        vy=-vy;
    }
    if(balY>$("#pongGame").height())
    {
        vy=-vy;
    }

    //bal terugkaatsen op de speler1
    if(balX< speler1X && balY>speler1Y && balY< (speler1Y+speler1H))
    { 
        raakSpeler("speler1Y");
        score1++;
        $("#game").find('#score1').html(score1);
    }
     
    //2 speler
    if(spelers==2)
    {
        $('#game').find('#player2, #score2').css('display','block');
        
        speler2Y=parseInt($("#player2").css("top"))+ parseInt($("#player2").attr("data-y"));
        
        //bal terugkaatsen op de speler2
        if(balX> speler2X && balY> speler2Y && balY<speler2Y+speler2H)
        {
            raakSpeler("speler2Y");
            score2++;
            $("#game").find('#score2').html(score2);
        }
        //bal vertragen bij terugkaatsen op muur
        if(balX>=$("#pongGame").width())
        {
            vx=-5;
        }       
    }
}

function raakSpeler(spelerY)
{
    $("#ball").css({"backgroundColor":"yellow"});
    
    vx*=-1.2;
    //als de bal de bovenste helft raakt
    if(balY-spelerY<50)
    {
        vy=-vy;
    }
    //als de bal de onderste helft raakt
    else
    {
        vy=vy;
    }
}

function speeltijd()
{
    spelduur-=1;
    $('#pongGame').find($('#spelduur')).html(spelduur);
    if(spelduur==0)
    {
        pauseGame();
        eindSpel();
        clearInterval(spelTimer);
    }
}

function eindSpel()
{
    $('#game').find("nav").find("h3").html("Je hebt "+ score1 + " punten!");
    if(score2!=-1)
    {
        if(score1>score2)
        {
            $('#game').find("nav").find("h3").html("Speler 1 heeft gewonnen met "+ score1 + " punten!");
        }
        if(score1<score2)
        {
        $('#game').find("nav").find("h3").html("Speler 2 heeft gewonnen met "+ score1 + " punten!");
        }
        else
        {
            $('#game').find("nav").find("h3").html("Gelijk spel met "+ score1 + " punten!");
        }
    }
    
    
    //popup score + opslaan +nieuw spel
    
}


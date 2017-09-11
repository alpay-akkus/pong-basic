
//link a-tags naar pagina secties
$('section').find('a').click(function()
{
    naarPagina($(this).attr('href'));
});

//nieuw spel 1speler starten
$('#start').find('a').eq(0).click(function()
{
    newGame();
    startGame(1);  
});
//nieuw spel 2spelers starten
$('#start').find('a').eq(1).click(function()
{
    newGame();
    startGame(2);  
});

//spel pauseren
$('#game').find('a').click(function()
{
    pauseGame();
});

//spel hervatten
$('#scores, #settings, #instructions').find('a[href=#game]').click(function()
{
    startGame();
});

//scores laden

laadSpelers();
laadScores();
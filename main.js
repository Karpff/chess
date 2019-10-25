function get(x)
{
  return document.getElementById(x);
}

var ghost = 0;
var turn = "w";
var promoted = [];
var wKing = [4,7];
var bKing = [4,0];
var fieldsBackup = [];
var moveBackup = [8,8];

function reTurn()
{
  if(turn == "b") turn = "w";
  else if(turn == "w") turn = "b";
  if(ghost.color == turn) ghost = 0;
  for(let i=0;i<8;i++)
  {
    if(fields[i][0].type == "pawn")
    {
      turn="promotion_w";
      get("promotion_w").style.top = innerHeight*2/5-202+"px";
      get("promotion_w").style.zIndex=1;promoted = [i,0];
    }
    if(fields[i][7].type == "pawn")
    {
      turn="promotion_b";
      get("promotion_b").style.top = innerHeight*2/5-202+"px";
      get("promotion_b").style.zIndex=1;promoted = [i,7];
    }
  }
  checkCheck();
  selected = 0;
}

var w = [];
var b = [];

function check()
{
  for(let i=0;i<8;i++)
  {
    for(let j=0;j<8;j++)
    {
      w[i][j] = 1;
      b[i][j] = 1;
    }
  }
  for(let i=0;i<8;i++)
  {
    for(let j=0;j<8;j++)
    {
      if(fields[i][j])fields[i][j].mark();
    }
  }
}

function checkCheck()
{
  check();
  if(w[bKing[0]][bKing[1]] == 2 && turn == "w")
  {
    for(let i=0;i<8;i++)for(let j=0;j<8;j++)fields[i][j] = fieldsBackup[i][j];
    fields[moveBackup[0]][moveBackup[1]].x = moveBackup[0];
    fields[moveBackup[0]][moveBackup[1]].y = moveBackup[1];
    turn = "b";
    check();
  }
  else if(b[wKing[0]][wKing[1]] == 2 && turn == "b")
  {
    for(let i=0;i<8;i++)for(let j=0;j<8;j++)fields[i][j] = fieldsBackup[i][j];
    fields[moveBackup[0]][moveBackup[1]].x = moveBackup[0];
    fields[moveBackup[0]][moveBackup[1]].y = moveBackup[1];
    turn = "w";
    check();
  }
}

function promote(what)
{
  if(turn == "promotion_w")
  {
    if(what == "queen")fields[promoted[0]][promoted[1]] = new Queen(promoted[0],promoted[1],"w","b");
    if(what == "knight")fields[promoted[0]][promoted[1]] = new Knight(promoted[0],promoted[1],"w","b");
    if(what == "rook")fields[promoted[0]][promoted[1]] = new Rook(promoted[0],promoted[1],"w","b");
    if(what == "bishop")fields[promoted[0]][promoted[1]] = new Bishop(promoted[0],promoted[1],"w","b");
    turn = "b";
    get("promotion_w").style.top = innerHeight/2+"px";
    get("promotion_w").style.zIndex = "-100";
  }
  else if(turn == "promotion_b")
  {
    if(what == "queen")fields[promoted[0]][promoted[1]] = new Queen(promoted[0],promoted[1],"b","w");
    if(what == "knight")fields[promoted[0]][promoted[1]] = new Knight(promoted[0],promoted[1],"b","w");
    if(what == "rook")fields[promoted[0]][promoted[1]] = new Rook(promoted[0],promoted[1],"b","w");
    if(what == "bishop")fields[promoted[0]][promoted[1]] = new Bishop(promoted[0],promoted[1],"b","w");
    turn = "w";
    get("promotion_b").style.top = innerHeight/2+"px";
    get("promotion_b").style.zIndex = "-100";
  }
  drawAll();
}

var selected = 0;
function select(id)
{
  for(let i=0;i<8;i++)for(let j=0;j<8;j++)fieldsBackup[i][j] = fields[i][j];
  let x = parseInt(id[0]);
  let y = parseInt(id[1]);
  if(selected)
  {
    if(selected == fields[x][y])selected = 0;
    else
    {
      moveBackup = [selected.x,selected.y];
      selected.move(x,y);
    }
  }
  else if(fields[x][y].color == turn)
  {
    selected = fields[x][y];
  }
  drawAll();
}

function drawAll()
{
  for(let i=0;i<8;i++)
  {
    for(let j=0;j<8;j++)
    {
      if(fields[i][j])
      {
        fields[i][j].draw();
      }
      else get(i+""+j).innerHTML = "";
      get(i+""+j).style.boxShadow = "";
    }
  }
  if(b[wKing[0]][wKing[1]]==2)get(wKing[0]+""+wKing[1]).style.boxShadow = "0 0 10px 1px #FF0000 inset";
  if(w[bKing[0]][bKing[1]]==2)get(bKing[0]+""+bKing[1]).style.boxShadow = "0 0 10px 1px #FF0000 inset";
  if(selected)get(selected.x+""+selected.y).style.boxShadow = "0 0 10px 1px #00DD00 inset";
}

var fields = [];
function init()
{
  get("board").style.top = innerHeight*2/5 - 162 + "px";
  get("board").style.left = innerWidth/2 - 160 + "px";
  get("promotion_b").style.top = innerHeight/3+"px";
  get("promotion_b").style.left = innerWidth/2 - 80 + "px";
  get("promotion_w").style.top = innerHeight/3+"px";
  get("promotion_w").style.left = innerWidth/2 - 80 + "px";
  var board="";
  let color="white";
  for(let i=0;i<8;i++)
  {
    fields.push([0,0,0,0,0,0,0,0]);
    fieldsBackup.push([0,0,0,0,0,0,0,0]);
    w.push([1,1,1,1,1,1,1,1]);
    b.push([1,1,1,1,1,1,1,1]);
    if(color=="black")color="white";
    else color="black";
    for(let j=0;j<8;j++)
    {
      if(color=="black")color="white";
      else color="black";
      board += "<div id='"+j+""+i+"' class='"+color+"' onclick='select(this.id)'></div>";
    }
  }
  get("board").innerHTML = board;
  fields[0][0] = new Rook(0,0,"b","w");
  fields[1][0] = new Knight(1,0,"b","w");
  fields[2][0] = new Bishop(2,0,"b","w");
  fields[3][0] = new Queen(3,0,"b","w");
  fields[4][0] = new King(4,0,"b","w");
  fields[5][0] = new Bishop(5,0,"b","w");
  fields[6][0] = new Knight(6,0,"b","w");
  fields[7][0] = new Rook(7,0,"b","w");
  for(let i=0;i<8;i++)fields[i][1] = new Pawn(i,1,"b","w");
  fields[0][7] = new Rook(0,7,"w","b");
  fields[1][7] = new Knight(1,7,"w","b");
  fields[2][7] = new Bishop(2,7,"w","b");
  fields[3][7] = new Queen(3,7,"w","b");
  fields[4][7] = new King(4,7,"w","b");
  fields[5][7] = new Bishop(5,7,"w","b");
  fields[6][7] = new Knight(6,7,"w","b");
  fields[7][7] = new Rook(7,7,"w","b");
  for(let i=0;i<8;i++)fields[i][6] = new Pawn(i,6,"w","b");
  drawAll();
}
init();

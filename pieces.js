class Piece
{
  constructor(x,y,color,enemyColor,type)
  {
    this.x = x;
    this.y = y;
    this.color = color;
    this.enemyColor = enemyColor;
    this.type = type;
  }

  draw()
  {
      get(this.x+""+this.y).innerHTML = "<img src='pieces/"+this.type+"_"+this.color+".png'>";
  }
}

class Bishop extends Piece
{
  constructor(x,y,color,enemyColor)
  {
    super(x,y,color,enemyColor,"bishop");
  }

  move(x,y)
  {
    if(Math.abs(x-this.x) == Math.abs(y-this.y) && (!fields[x][y] || fields[x][y].color != this.color))
    {
      let obstacles = 0;
      if(x>this.x && y>this.y)
      {
        for(let i=1;i<Math.abs(x-this.x);i++)
        {
          if(fields[this.x+i][this.y+i]) obstacles++;
        }
      }
      else if(x>this.x && y<this.y)
      {
        for(let i=1;i<Math.abs(x-this.x);i++)
        {
          if(fields[this.x+i][this.y-i]) obstacles++;
        }
      }
      else if(x<this.x && y<this.y)
      {
        for(let i=1;i<Math.abs(x-this.x);i++)
        {
          if(fields[this.x-i][this.y-i]) obstacles++;
        }
      }
      else if(x<this.x && y>this.y)
      {
        for(let i=1;i<Math.abs(x-this.x);i++)
        {
          if(fields[this.x-i][this.y+i]) obstacles++;
        }
      }
      if(!obstacles)
      {
        fields[x][y] = this;
        fields[this.x][this.y] = 0;
        this.x = x; this.y = y;
        reTurn();
      }
    }
  }

  mark()
  {
    for(let i=1;i<8;i++)
    {
      if(window[this.color][this.x+i])
      {
        if(window[this.color][this.x+i][this.y+i])
        {
          window[this.color][this.x+i][this.y+i] = 2;
          if(fields[this.x+i][this.y+i] && !(fields[this.x+i][this.y+i].type == "king" && fields[this.x+i][this.y+i].color != this.color))
          break;
        }else break;
      }else break;
    }
    for(let i=1;i<8;i++)
    {
      if(window[this.color][this.x+i])
      {
        if(window[this.color][this.x+i][this.y-i])
        {
          window[this.color][this.x+i][this.y-i] = 2;
          if(fields[this.x+i][this.y-i] && !(fields[this.x+i][this.y-i].type == "king" && fields[this.x+i][this.y-i].color != this.color))
          break;
        }else break;
      }else break;
    }
    for(let i=1;i<8;i++)
    {
      if(window[this.color][this.x-i])
      {
        if(window[this.color][this.x-i][this.y-i])
        {
          window[this.color][this.x-i][this.y-i] = 2;
          if(fields[this.x-i][this.y-i] && !(fields[this.x-i][this.y-i].type == "king" && fields[this.x-i][this.y-i].color != this.color))
          break;
        }else break;
      }else break;
    }
    for(let i=1;i<8;i++)
    {
      if(window[this.color][this.x-i])
      {
        if(window[this.color][this.x-i][this.y+i])
        {
          window[this.color][this.x-i][this.y+i] = 2;
          if(fields[this.x-i][this.y+i] && !(fields[this.x-i][this.y+i].type == "king" && fields[this.x-i][this.y+i].color != this.color))
          break;
        }else break;
      }else break;
    }
  }
}

class Rook extends Piece
{
  constructor(x,y,color,enemyColor)
  {
    super(x,y,color,enemyColor,"rook");
    this.moved = false;
  }

  move(x,y)
  {
    if(this.x == x && (!fields[x][y] || fields[x][y].color != this.color))
    {
      let obstacles = 0;
      if(y>this.y)
      {
        for(let i=this.y+1;i<y;i++)
        {
          if(fields[x][i]) obstacles++;
        }
      }
      else if(this.y>y)
      {
        for(let i=y+1;i<this.y;i++)
        {
          if(fields[x][i]) obstacles++;
        }
      }
      if(!obstacles)
      {
        fields[x][y] = this;
        fields[this.x][this.y] = 0;
        this.x = x; this.y = y;
        this.moved = true;
        reTurn();
      }
    }
    else if(this.y == y && (!fields[x][y] || fields[x][y].color != this.color))
    {
      let obstacles = 0;
      if(x>this.x)
      {
        for(let i=this.x+1;i<x;i++)
        {
          if(fields[i][y]) obstacles++;
        }
      }
      else if(this.x>x)
      {
        for(let i=x+1;i<this.x;i++)
        {
          if(fields[i][y]) obstacles++;
        }
      }
      if(!obstacles)
      {
        fields[x][y] = this;
        fields[this.x][this.y] = 0;
        this.x = x; this.y = y;
        this.moved = true;
        reTurn();
      }
    }
  }

  mark()
  {
    for(let i=1;i<8;i++)
    {
      if(window[this.color][this.x][this.y+i])
      {
        window[this.color][this.x][this.y+i] = 2;
        if(fields[this.x][this.y+i] && !(fields[this.x][this.y+i].type == "king" && fields[this.x][this.y+i].color != this.color))
        break;
      }else break;
    }
    for(let i=1;i<8;i++)
    {
      if(window[this.color][this.x][this.y-i])
      {
        window[this.color][this.x][this.y-i] = 2;
        if(fields[this.x][this.y-i] && !(fields[this.x][this.y-i].type == "king" && fields[this.x][this.y-i].color != this.color))
        break;
      }else break;
    }
    for(let i=1;i<8;i++)
    {
      if(window[this.color][this.x+i])
      {
        if(window[this.color][this.x+i][this.y])
        {
          window[this.color][this.x+i][this.y] = 2;
          if(fields[this.x+i][this.y] && !(fields[this.x+i][this.y].type == "king" && fields[this.x+i][this.y].color != this.color))
          break;
        }else break;
      }else break;
    }
    for(let i=1;i<8;i++)
    {
      if(window[this.color][this.x-i])
      {
        if(window[this.color][this.x-i][this.y])
        {
          window[this.color][this.x-i][this.y] = 2;
          if(fields[this.x-i][this.y] && !(fields[this.x-i][this.y].type == "king" && fields[this.x-i][this.y].color != this.color))
          break;
        }else break;
      }else break;
    }
  }
}

class Knight extends Piece
{
  constructor(x,y,color,enemyColor)
  {
    let typ;
    if(Math.random()<0.0145 && color == "w")typ = "unicorn";
    else typ = "knight";
    super(x,y,color,enemyColor,typ);
  }

  move(x,y)
  {
    if((Math.abs(this.x-x) == 2 && Math.abs(this.y-y) == 1 || Math.abs(this.x-x) == 1 && Math.abs(this.y-y) == 2) &&
    (!fields[x][y] || fields[x][y].color != this.color))
    {
      fields[x][y] = this;
      fields[this.x][this.y] = 0;
      this.x = x; this.y = y;
      reTurn();
    }
  }

  mark()
  {
    if(window[this.color][this.x+1])if(window[this.color][this.x+1][this.y+2])window[this.color][this.x+1][this.y+2] = 2;
    if(window[this.color][this.x+1])if(window[this.color][this.x+1][this.y-2])window[this.color][this.x+1][this.y-2] = 2;
    if(window[this.color][this.x-1])if(window[this.color][this.x-1][this.y+2])window[this.color][this.x-1][this.y+2] = 2;
    if(window[this.color][this.x-1])if(window[this.color][this.x-1][this.y-2])window[this.color][this.x-1][this.y-2] = 2;
    if(window[this.color][this.x+2])if(window[this.color][this.x+2][this.y+1])window[this.color][this.x+2][this.y+1] = 2;
    if(window[this.color][this.x+2])if(window[this.color][this.x+2][this.y-1])window[this.color][this.x+2][this.y-1] = 2;
    if(window[this.color][this.x-2])if(window[this.color][this.x-2][this.y+1])window[this.color][this.x-2][this.y+1] = 2;
    if(window[this.color][this.x-2])if(window[this.color][this.x-2][this.y-1])window[this.color][this.x-2][this.y-1] = 2;
  }
}

class Pawn extends Piece
{
  constructor(x,y,color,enemyColor)
  {
    super(x,y,color,enemyColor,"pawn");
  }

  move(x,y)
  {
    if(this.color == "w")
    {
      if(this.x == x && this.y-y == 2 && this.y == 6 && !fields[x][y] && !fields[x][y+1] ||
      this.x == x && this.y-y == 1 && !fields[x][y] ||
      (this.x-1 == x || this.x == x-1) && this.y-y == 1 &&
      (fields[x][y].color == "b" || x == ghost.x && y == ghost.y && ghost.color == "b"))
      {
        if(this.y-y == 2) ghost = new Ghost(this.x, this.y-1, y, "w");
        if(x == ghost.x && y == ghost.y) fields[x][ghost.of] = 0;
        fields[x][y] = this;
        fields[this.x][this.y] = 0;
        this.x = x; this.y = y;
        reTurn();
      }
    }
    else if(this.color == "b")
    {
      if(this.x == x && y-this.y == 2 && this.y == 1 && !fields[x][y] && !fields[x][y-1] ||
      this.x == x && y-this.y == 1 && !fields[x][y] ||
      (this.x-1 == x || this.x == x-1) && y-this.y == 1 &&
      (fields[x][y].color == "w" || x == ghost.x && y == ghost.y && ghost.color == "w"))
      {
        if(y-this.y == 2) ghost = new Ghost(this.x, this.y+1, y, "b");
        if(x == ghost.x && y == ghost.y) fields[x][ghost.of] = 0;
        fields[x][y] = this;
        fields[this.x][this.y] = 0;
        this.x = x; this.y = y;
        reTurn();
      }
    }
  }

  mark()
  {
    if(this.color == "b")
    {
      if(window["b"][this.x-1])if(window["b"][this.x-1][this.y+1])window["b"][this.x-1][this.y+1] = 2;
      if(window["b"][this.x+1])if(window["b"][this.x+1][this.y+1])window["b"][this.x+1][this.y+1] = 2;
    }
    else if(this.color == "w")
    {
      if(window["w"][this.x-1])if(window["w"][this.x-1][this.y-1])window["w"][this.x-1][this.y-1] = 2;
      if(window["w"][this.x+1])if(window["w"][this.x+1][this.y-1])window["w"][this.x+1][this.y-1] = 2;
    }
  }
}

class Queen extends Piece
{
  constructor(x,y,color,enemyColor)
  {
    super(x,y,color,enemyColor,"queen");
  }

  move(x,y)
  {
    if(Math.abs(x-this.x) == Math.abs(y-this.y) && (!fields[x][y] || fields[x][y].color != this.color))
    {
      let obstacles = 0;
      if(x>this.x && y>this.y)
      {
        for(let i=1;i<Math.abs(x-this.x);i++)
        {
          if(fields[this.x+i][this.y+i]) obstacles++;
        }
      }
      else if(x>this.x && y<this.y)
      {
        for(let i=1;i<Math.abs(x-this.x);i++)
        {
          if(fields[this.x+i][this.y-i]) obstacles++;
        }
      }
      else if(x<this.x && y<this.y)
      {
        for(let i=1;i<Math.abs(x-this.x);i++)
        {
          if(fields[this.x-i][this.y-i]) obstacles++;
        }
      }
      else if(x<this.x && y>this.y)
      {
        for(let i=1;i<Math.abs(x-this.x);i++)
        {
          if(fields[this.x-i][this.y+i]) obstacles++;
        }
      }
      if(!obstacles)
      {
        fields[x][y] = this;
        fields[this.x][this.y] = 0;
        this.x = x; this.y = y;
        reTurn();
      }
    }
    else if(this.x == x && (!fields[x][y] || fields[x][y].color != this.color))
    {
      let obstacles = 0;
      if(y>this.y)
      {
        for(let i=this.y+1;i<y;i++)
        {
          if(fields[x][i]) obstacles++;
        }
      }
      else if(this.y>y)
      {
        for(let i=y+1;i<this.y;i++)
        {
          if(fields[x][i]) obstacles++;
        }
      }
      if(!obstacles)
      {
        fields[x][y] = this;
        fields[this.x][this.y] = 0;
        this.x = x; this.y = y;
        reTurn();
      }
    }
    else if(this.y == y && (!fields[x][y] || fields[x][y].color != this.color))
    {
      let obstacles = 0;
      if(x>this.x)
      {
        for(let i=this.x+1;i<x;i++)
        {
          if(fields[i][y]) obstacles++;
        }
      }
      else if(this.x>x)
      {
        for(let i=x+1;i<this.x;i++)
        {
          if(fields[i][y]) obstacles++;
        }
      }
      if(!obstacles)
      {
        fields[x][y] = this;
        fields[this.x][this.y] = 0;
        this.x = x; this.y = y;
        reTurn();
      }
    }
  }

  mark()
  {
    for(let i=1;i<8;i++)
    {
      if(window[this.color][this.x+i])
      {
        if(window[this.color][this.x+i][this.y+i])
        {
          window[this.color][this.x+i][this.y+i] = 2;
          if(fields[this.x+i][this.y+i] && !(fields[this.x+i][this.y+i].type == "king" && fields[this.x+i][this.y+i].color != this.color))
          break;
        }else break;
      }else break;
    }
    for(let i=1;i<8;i++)
    {
      if(window[this.color][this.x+i])
      {
        if(window[this.color][this.x+i][this.y-i])
        {
          window[this.color][this.x+i][this.y-i] = 2;
          if(fields[this.x+i][this.y-i] && !(fields[this.x+i][this.y-i].type == "king" && fields[this.x+i][this.y-i].color != this.color))
          break;
        }else break;
      }else break;
    }
    for(let i=1;i<8;i++)
    {
      if(window[this.color][this.x-i])
      {
        if(window[this.color][this.x-i][this.y-i])
        {
          window[this.color][this.x-i][this.y-i] = 2;
          if(fields[this.x-i][this.y-i] && !(fields[this.x-i][this.y-i].type == "king" && fields[this.x-i][this.y-i].color != this.color))
          break;
        }else break;
      }else break;
    }
    for(let i=1;i<8;i++)
    {
      if(window[this.color][this.x-i])
      {
        if(window[this.color][this.x-i][this.y+i])
        {
          window[this.color][this.x-i][this.y+i] = 2;
          if(fields[this.x-i][this.y+i] && !(fields[this.x-i][this.y+i].type == "king" && fields[this.x-i][this.y+i].color != this.color))
          break;
        }else break;
      }else break;
    }
    for(let i=1;i<8;i++)
    {
      if(window[this.color][this.x][this.y+i])
      {
        window[this.color][this.x][this.y+i] = 2;
        if(fields[this.x][this.y+i] && !(fields[this.x][this.y+i].type == "king" && fields[this.x][this.y+i].color != this.color))
        break;
      }else break;
    }
    for(let i=1;i<8;i++)
    {
      if(window[this.color][this.x][this.y-i])
      {
        window[this.color][this.x][this.y-i] = 2;
        if(fields[this.x][this.y-i] && !(fields[this.x][this.y-i].type == "king" && fields[this.x][this.y-i].color != this.color))
        break;
      }else break;
    }
    for(let i=1;i<8;i++)
    {
      if(window[this.color][this.x+i])
      {
        if(window[this.color][this.x+i][this.y])
        {
          window[this.color][this.x+i][this.y] = 2;
          if(fields[this.x+i][this.y] && !(fields[this.x+i][this.y].type == "king" && fields[this.x+i][this.y].color != this.color))
          break;
        }else break;
      }else break;
    }
    for(let i=1;i<8;i++)
    {
      if(window[this.color][this.x-i])
      {
        if(window[this.color][this.x-i][this.y])
        {
          window[this.color][this.x-i][this.y] = 2;
          if(fields[this.x-i][this.y] && !(fields[this.x-i][this.y].type == "king" && fields[this.x-i][this.y].color != this.color))
          break;
        }else break;
      }else break;
    }
  }
}

class King extends Piece
{
  constructor(x,y,color,enemyColor)
  {
    super(x,y,color,enemyColor,"king");
    this.moved = false;
  }

  move(x,y)
  {
    if(fields[x][y].type == "rook" && fields[x][y].color == this.color && !fields[x][y].moved && !this.moved)
    {
      let succ = true;
      if(x>this.x)
      {
        for(let i=this.x;i<x;i++)
        {
          if(window[this.enemyColor][i][y]==2)succ=false;
        }
        for(let i=this.x+1;i<x;i++)
        {
          if(fields[i][y]!=0)succ=false;
        }
        if(succ)
        {
          this.x += 2;
          fields[x][y].x = this.x-1;
          this.moved = true;
          fields[x][y].moved = true;
          window[this.color+"King"][0]=this.x;
          let kek = fields[x][y];
          fields[this.x][this.y] = this;
          fields[this.x-1][this.y] = kek;
          fields[x][y] = 0;
          fields[this.x-2][this.y] = 0;
          reTurn();
        }
      }
      else if(x<this.x)
      {
        for(let i=this.x;i>x;i--)
        {
          if(window[this.enemyColor][i][y]==2)succ=false;
        }
        for(let i=this.x-1;i>x;i--)
        {
          if(fields[i][y]!=0)succ=false;
        }
        if(succ)
        {
          this.x -= 2;
          fields[x][y].x = this.x+1;
          this.moved = true;
          fields[x][y].moved = true;
          window[this.color+"King"][0]=this.x;
          let kek = fields[x][y];
          fields[this.x][this.y] = this;
          fields[this.x+1][this.y] = kek;
          fields[x][y] = 0;
          fields[this.x+2][this.y] = 0;
          reTurn();
        }
      }
    }
    else if([0,1].includes(Math.abs(x-this.x)) && [0,1].includes(Math.abs(y-this.y)) && (!fields[x][y] || fields[x][y].color != this.color))
    {
      if(window[this.enemyColor][x][y] == 1)
      {
        fields[x][y] = this;
        fields[this.x][this.y] = 0;
        this.x = x; this.y = y;
        window[this.color+"King"][0] = this.x;
        window[this.color+"King"][1] = this.y;
        this.moved = true;
        reTurn();
      }
    }
  }

  mark()
  {
    if(window[this.color][this.x][this.y+1])window[this.color][this.x][this.y+1] = 2;
    if(window[this.color][this.x][this.y-1])window[this.color][this.x][this.y-1] = 2;
    if(window[this.color][this.x+1])if(window[this.color][this.x+1][this.y-1])window[this.color][this.x+1][this.y-1] = 2;
    if(window[this.color][this.x+1])window[this.color][this.x+1][this.y] = 2;
    if(window[this.color][this.x+1])if(window[this.color][this.x+1][this.y+1])window[this.color][this.x+1][this.y+1] = 2;
    if(window[this.color][this.x-1])if(window[this.color][this.x-1][this.y+1])window[this.color][this.x-1][this.y+1] = 2;
    if(window[this.color][this.x-1])window[this.color][this.x-1][this.y] = 2;
    if(window[this.color][this.x-1])if(window[this.color][this.x-1][this.y-1])window[this.color][this.x-1][this.y-1] = 2;

  }
}

class Ghost
{
  constructor(x,y,of,color)
  {
    this.x = x;
    this.y = y;
    this.of = of;
    this.color = color;
  }
}

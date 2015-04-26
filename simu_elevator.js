var game = new Phaser.Game(800, 900, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var rooms;

var stairs=6;
var inhabitants = [];
var ground;
var inhabitantsTotal = 40;

var WAITING=0;
var WALKING=1;
var CHILLING=2;
var JUMPING=3;

inhabitant = function(index,game)
{
   var x = game.world.randomX;
   var y = game.world.randomY;

  if (y>=game.world.height-48) y = game.world.height-40;
  this.state=WAITING;
  this.direction='none';
  this.chrono = 0;
  this.game = game;
  this.stairs=1;

  this.guy =  game.add.sprite(x,y,'dude');
  game.physics.arcade.enable(this.guy);

  //  Player physics properties. Give the little guy a slight bounce.
  this.guy.body.bounce.y = 0.2;
  this.guy.body.gravity.y = 300;
  this.guy.body.collideWorldBounds = true;

  //  Our two animations, walking left and right.
  this.guy.animations.add('right', [0,1,2,3,4,5,6,7], 10, true);
  this.guy.animations.add('left',[9,9,10,11,12,13,14,15], 10, true);
}

inhabitant.prototype.update = function() {
  //IA
  // Should use A FSM
  this.guy.body.velocity.x = 0;

  if(this.guy.body.x<=0) this.guy.body.x=game.width-50;
  if(this.guy.body.x>game.width-50) this.guy.body.x=1;



  if(this.state==WAITING)
  {
    this.chrono = 50*Math.random();
    if(Math.random() <0.5)
    {
      this.state = WALKING;
      this.direction='left';
    }
    else
    {
      this.state = WALKING;
      this.direction = 'right';
    }
    if(Math.random() <0.05) this.state = JUMPING;
  }

  if(Math.random() < 0.01)
  {
    this.chrono = 50*Math.random();
    this.state = CHILLING;
  }

  if(this.state == WALKING )
  {
    this.chrono--;
    if(this.chrono<=0) this.state = WAITING;
  }

  //MOVE
  if(this.state == CHILLING)
  {
    this.guy.animations.stop();
    this.chrono--;
    if(this.chrono<=0) this.state = WAITING;
  }
  if(this.state == JUMPING)
  {
    this.guy.body.velocity.y=-200;
    this.state = WALKING;
  }

  if(this.state == WALKING)
  {
    this.guy.animations.play(this.direction);
    if(this.direction == 'left')
      this.guy.body.velocity.x=-150;
    else
      this.guy.body.velocity.x=150;
  }  

}

function put_apt()
{
  var apt;

  for(var i=0;i<stairs;i++)
  {
  apt = rooms.create(450,(i*game.world.height/stairs),'ground');
  apt.scale.setTo(1,0.25);
  apt.body.immovable=true;

  apt = rooms.create(-50,(i*game.world.height/stairs),'ground');
  apt.scale.setTo(1,0.25);
  apt.body.immovable=true;
  }
}

function preload() {
  game.load.image('ground', 'assets/platform.png');
  game.load.spritesheet('dude', 'assets/dude.png',48, 48);


}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);

  rooms = game.add.group();
  rooms.enableBody = true;

  
  ground = rooms.create(0, game.world.height - 38 , 'ground');
  ground.scale.setTo(2, 1);
  ground.body.immovable = true;

  put_apt();
  for (var i=0; i<inhabitantsTotal; i++)
    inhabitants.push(new inhabitant(i,game));

}

function update() {

  for (var i = 0; i < inhabitants.length; i++)
  {
      game.physics.arcade.collide(rooms, inhabitants[i].guy);
      inhabitants[i].update();
  }
}

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var rooms;

function put_apt()
{
  var apt = rooms.create(450,300,'ground');
  apt.body.immovable=true;

  apt = rooms.create(-50,300,'ground');
  apt.body.immovable=true;
}

function preload() {
  game.load.image('sky', 'assets/sky.png')
  game.load.image('ground', 'assets/platform.png');
  game.load.spritesheet('dude', 'assets/dude.png', 32, 48);


}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.add.sprite(0, 0, 'sky');

  rooms = game.add.group();
  rooms.enableBody = true;

  var ground = rooms.create(0, game.world.height - 38 , 'ground');
  ground.scale.setTo(2, 1);
  ground.body.immovable = true;

  put_apt();
}

function update() {
}

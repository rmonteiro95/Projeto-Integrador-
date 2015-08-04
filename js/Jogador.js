/* global Phaser */

var Jogador = function (_game, _x, _y, _key, _frame) {
    Phaser.Sprite.call(this, _game, _x, _y, _key, _frame);
    this.controle;
    this.game = _game;
    this.shadow;
};

Jogador.prototype = Object.create(Phaser.Sprite.prototype);
Jogador.prototype.constructor = Jogador;

Jogador.prototype.tecla_Norte;
Jogador.prototype.tecla_Sul;
Jogador.prototype.tecla_Leste;
Jogador.prototype.tecla_Oeste;

Jogador.prototype.norte = [17, 16, 15, 14, 13, 12, 11, 10, 9];
Jogador.prototype.sul = [62, 61, 60, 59, 58, 57, 56, 55, 54];
Jogador.prototype.leste = [35, 34, 33, 32, 31, 30, 29, 28, 27];
Jogador.prototype.oeste = [44, 43, 42, 41, 40, 39, 38, 37, 36];
Jogador.prototype.noroeste = [8, 7, 6, 5, 4, 3, 2, 1, 0];
Jogador.prototype.nordeste = [26, 25, 24, 23, 22, 21, 20, 19, 18];
Jogador.prototype.suldoeste = [53, 52, 51, 50, 49, 48, 47, 46, 45];
Jogador.prototype.suldeste = [71, 70, 69, 68, 67, 66, 65, 64, 63];
Jogador.prototype.direcoes = ["N", "S", "L", "O", "NO", "NE", "SO", "SE"];

Jogador.prototype.cria = function () {
    this.game.physics.arcade.enable(this);
    this.enableBody = true;
    this.anchor.setTo(0.5, 1);
    this.game.camera.follow(this);
    this.criaAnimacoes();
    
    if(!this.tecla_Norte || !this.tecla_Sul || !this.tecla_Leste || !this.tecla_Oeste){
        this.criaBotoes();
    }

    this.criaSombra();
};

Jogador.prototype.criaAnimacoes = function () {
    this.animations.add('N', this.norte, 10, true);
    this.animations.add('S', this.sul, 10, true);
    this.animations.add('L', this.leste, 10, true);
    this.animations.add('O', this.oeste, 10, true);
    this.animations.add('NO', this.noroeste, 10, true);
    this.animations.add('NE', this.nordeste, 10, true);
    this.animations.add('SO', this.suldoeste, 10, true);
    this.animations.add('SE', this.suldeste, 10, true);

    this.animations.add('rev_N', this.norte.reverse(), 10, true);
    this.animations.add('rev_S', this.sul.reverse(), 10, true);
    this.animations.add('rev_L', this.leste.reverse(), 10, true);
    this.animations.add('rev_O', this.oeste.reverse(), 10, true);
    this.animations.add('rev_NO', this.noroeste.reverse(), 10, true);
    this.animations.add('rev_NE', this.nordeste.reverse(), 10, true);
    this.animations.add('rev_SO', this.suldoeste.reverse(), 10, true);
    this.animations.add('rev_SE', this.suldeste.reverse(), 10, true);
};

Jogador.prototype.criaBotoes = function () {
    this.prototype.tecla_Norte = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.prototype.tecla_Sul = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
    this.prototype.tecla_Leste = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.prototype.tecla_Oeste = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
};

Jogador.prototype.criaSombra = function () {
    this.shadow = this.game.add.sprite(this.position.x, this.position.y, 'tilesetSpriteSheet', 960);
    this.game.physics.arcade.enable(this.shadow);
    this.shadow.alpha = 0.5;
    this.shadow.anchor.setTo(0.5, 1);
};

Jogador.prototype.update = function () {
    this.shadow.body.velocity.y = 0;
    this.shadow.body.velocity.x = 0;
    this.position.setTo(this.shadow.position.x, this.shadow.position.y);

    if (this.controle.left.isDown) {
        this.shadow.body.velocity.x -= 50;
        this.scale.x = -1;
        this.animations.play('walk');
    }
    else if (this.controle.right.isDown) {
        this.shadow.body.velocity.x += 50;
        this.scale.x = 1;
        this.animations.play('walk');
    }
    else if (this.controle.down.isDown) {
        this.shadow.body.velocity.y += 50;
        this.animations.play('walk');
    }
    else if (this.controle.up.isDown) {
        this.shadow.body.velocity.y -= 50;
        this.animations.play('walk');
    }
    else {
        this.animations.play('idle');
    }
};
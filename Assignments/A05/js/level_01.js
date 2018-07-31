var level_01 = {

	preload: function () {

	},
	create: function () {
		console.log("level_01.js");

		game.physics.startSystem(Phaser.Physics.ARCADE);



		// Adding the knight atlas that contains all the animations
		this.player = game.add.sprite(game.camera.width / 2, game.camera.height / 2, 'knight_atlas');

		// Add walking and idle animations. Different aninmations are needed based on direction of movement.
		this.player.animations.add('walk_left', Phaser.Animation.generateFrameNames('Walk_left', 0, 8), 20, true);
		this.player.animations.add('walk_right', Phaser.Animation.generateFrameNames('Walk_right', 0, 8), 20, true);
		this.player.animations.add('idle_left', Phaser.Animation.generateFrameNames('Idle_left', 0, 9), 20, true);
		this.player.animations.add('idle_right', Phaser.Animation.generateFrameNames('Idle_right', 0, 9), 20, true);
		//animations added for assignment ML
		this.player.animations.add('jump_left', Phaser.Animation.generateFrameNames('Jump_left', 0, 9), 20, false);
		this.player.animations.add('jump_right', Phaser.Animation.generateFrameNames('Jump_right', 0, 9), 20, false);
		this.player.animations.add('death', Phaser.Animation.generateFrameNames('Dead', 0, 10), 20, false);
		this.player.animations.add('run_left', Phaser.Animation.generateFrameNames('Run_left', 0, 9), 20, true);
		this.player.animations.add('run_right', Phaser.Animation.generateFrameNames('Run_right', 0, 9), 20, true);
		this.player.animations.add('attack_left', Phaser.Animation.generateFrameNames('Attack_left', 0, 9), 20, false)
		this.player.animations.add('attack_right', Phaser.Animation.generateFrameNames('Attack_right', 0, 9), 20, false)
		this.player.animations.add('jumpAttack_left', Phaser.Animation.generateFrameNames('JumpAttack_left', 0, 9), 20, false)
		this.player.animations.add('jumpAttack_right', Phaser.Animation.generateFrameNames('JumpAttack_right', 0, 9), 20, false)

		this.prevDir = '';	// holds sprites previous direction (left , right) so
		// we can face the correct direction when using the 'idle' animation
		this.player.animations.play('idle_left');
		// turn physics on for player
		game.physics.arcade.enable(this.player);

		// set the anchor for sprite to middle of the view
		this.player.anchor.setTo(0.5);

		this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
		this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
		this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		this.spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.shift = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
		this.f = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		game.addPauseButton(game);
		//flags for animations and callbacks
		wait = false
		dead = false
	},

	update: function () {

		// Each key changes the players velocity in the x or y direction
		// and plays the proper animation. It sets the prevDir so we can
		// face the correct way when stopped.
		animWait = function () {
			return wait = false
		}
		//Use the shift key to add running by changing speed and animation  
		if (!wait && !dead) {
			if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
				this.player.body.velocity.x = -200;
				this.player.animations.play('walk_left');
				this.prevDir = 'left'
			} else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
				this.player.body.velocity.x = 200;
				this.player.animations.play('walk_right');
				this.prevDir = 'right'
			} else if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
				if (this.prevDir == 'left') {
					this.player.animations.play('walk_left');
				} else {
					this.player.animations.play('walk_right');
				}
				this.player.body.velocity.y = -200;
			} else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
				if (this.prevDir == 'left') {
					this.player.animations.play('walk_left');
				} else {
					this.player.animations.play('walk_right');
				}
				this.player.body.velocity.y = 200;
			} else {
				if (this.prevDir == 'left') {
					this.player.animations.play('idle_left');
				} else {
					this.player.animations.play('idle_right');
				}
				this.player.body.velocity.x = 0;
				this.player.body.velocity.y = 0;
			}
		}
		// Create a move class or function to clean up code.
		if (this.game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) && !dead) {
			if (this.prevDir == 'right') {
				this.jump(animWait, this.player, this.wait)
			} else {
				this.jumpLeft(animWait,this.player, this.wait)
			}
		}

		this.jump = function (animWait, player) {
			player.scale.setTo(1.5, 1.5)
			wait = true
			console.log("here")
			player.animations.play('jump_right').onComplete.add(animWait)
			player.scale.setTo(1, 1)

			player.scale.setTo(1, 1)
		}
		this.jumpLeft = function (animWait, player) {
			wait = true
			player.animations.play('jump_left').onComplete.add(animWait)
		}



		if (this.game.input.keyboard.justPressed(Phaser.Keyboard.ENTER)) {
			death(animWait, this.player)
		}

		death = function (animWait, player) {
			wait = true;
			player.animations.play('death')
			dead = true
		}

		if (this.game.input.activePointer.isDown && !dead) {
			wait = true
			console.log(this.prevDir)
			if (this.prevDir == 'left') {
				attack(animWait, this.player)
			} else {
				this.player.animations.play('attack_right').onComplete.add(animWait)
			}
		}

		attack = function (animWait, player) {
			wait = true
			player.animations.play('attack_left').onComplete.add(animWait)
		}

		if (this.game.input.keyboard.justPressed(Phaser.Keyboard.SHIFT) && (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) || this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) && !dead) {
			run(animWait, this.player, this.prevDir)
		}

		run = function (animWait, player, prevDir) {
			wait = true
			player.body.velocity.x = -200 * 1.5
			if(prevDir == 'left'){
			player.animations.play('run_left').onLoop.add(animWait)
			}else{
				player.animations.play('run_right').onLoop.add(animWait)
			}
		}
		if (this.game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) && this.game.input.activePointer.isDown && !dead) {
			jumpAttack(animWait, this.player, this.prevDir)
		}
 
		jumpAttack = function (animWait, player, prevDir){
			wait = true
			if(prevDir == "left"){
				player.animations.play('jumpAttack_left').onComplete.add(animWait)
			}else{
				player.animations.play('jumpAttack_right').onComplete.add(animWait)
			}
		}
		},

	render: function () {
		game.debug.bodyInfo(this.player, 16, 24);
		// Instructions:
		game.debug.text("Use arrow keys to move sprite around.", game.width / 2, game.height - 10);
	}
}
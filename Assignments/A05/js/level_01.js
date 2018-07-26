var level_01 = {

	preload: function () {

	},
	create: function () {
		console.log("level_01.js");

		game.physics.startSystem(Phaser.Physics.ARCADE);

		this.prevDir = '';	// holds sprites previous direction (left , right) so
							// we can face the correct direction when using the 'idle' animation

		// Adding the knight atlas that contains all the animations
		this.player = game.add.sprite(game.camera.width / 2, game.camera.height / 2, 'knight_atlas');

		// Add walking and idle animations. Different aninmations are needed based on direction of movement.
		this.player.animations.add('walk_left', Phaser.Animation.generateFrameNames('Walk_left', 0, 8), 20, true);
		this.player.animations.add('walk_right', Phaser.Animation.generateFrameNames('Walk_right', 0, 8), 20, true);
		this.player.animations.add('idle_left', Phaser.Animation.generateFrameNames('Idle_left', 0, 9), 20, true);
		this.player.animations.add('idle_right', Phaser.Animation.generateFrameNames('Idle_right', 0, 9), 20, true);
		//animations added for assignment ML
		this.player.animations.add('jump_left', Phaser.Animation.generateFrameNames('Jump_left', 0 , 9), 20, true);
		this.player.animations.add('jump_right', Phaser.Animation.generateFrameNames('Jump_right', 0,9), 20, true);
		this.player.animations.add('death', Phaser.Animation.generateFrameNames('Dead', 0,10),20,true);
		this.player.animations.add('run_left', Phaser.Animation.generateFrameNames('Run_left',0,9),20,true);

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
	},

	update: function () {

		// Each key changes the players velocity in the x or y direction
		// and plays the proper animation. It sets the prevDir so we can
		// face the correct way when stopped.

		// Use the shift key to add running by changing speed and animation

		// Create a move class or function to clean up code.
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
			this.player.body.velocity.x = -200;
			this.player.animations.play('walk_left');
			this.prevDir = 'left'
		}
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
			this.player.body.velocity.x = 200;
			this.player.animations.play('walk_right');
			this.prevDir = 'right'
		}
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
			if(this.prevDir == 'left'){
				this.player.animations.play('walk_left');
			}else{
				this.player.animations.play('walk_right');
			}
			this.player.body.velocity.y = -200;
			
		}
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
			if(this.prevDir == 'left'){
				this.player.animations.play('walk_left');
			}else{
				this.player.animations.play('walk_right');
			}
			this.player.body.velocity.y = 200;
		}

		if (this.leftKey.isUp && this.rightKey.isUp && this.upKey.isUp && this.downKey.isUp && !this.spaceBar.isDown && !this.shift.isDown) {
			if(this.prevDir == 'left'){
				this.player.animations.play('idle_left');
			}else{
				this.player.animations.play('idle_right');
			}
			this.player.body.velocity.x = 0;
			this.player.body.velocity.y = 0;
		}

		if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			this.player.scale.setTo(1.5,1.5)
			if(this.prevDir == 'left'){
				this.player.animations.play('jump_left')
			}else{
				this.player.animations.play('jump_right')
			}
		}else{
			this.player.scale.setTo(1,1)
		}

		if(this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
			this.player.animations.play('death')
		}
		if (this.game.input.activePointer.isDown){
			this.player.animations.play('death')
		}

		if (this.game.input.keyboard.isDown(Phaser.Keyboard.SHIFT) && this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
		 	this.player.animations.play('run_left')
		}




	},

	render: function(){
		game.debug.bodyInfo(this.player, 16, 24);
		// Instructions:
		game.debug.text( "Use arrow keys to move sprite around.", game.width/2, game.height-10 );
	}
}
ig.module(
    'game.entities.playerw'
)
.requires(
    'impact.entity',
    'impact.sound'
)
.defines(function(){
    EntityPlayerw = ig.Entity.extend({
        animSheet: new ig.AnimationSheet( 'media/newplayerw.PNG', 35, 50 ),
        size: {x: 30, y: 42},
        offset: {x: 2, y: 8},
        flip: false,
        maxVel: {x: 100, y: 100},
        friction: {x: 600, y: 0},
        accelGround: 100,
        accelAir: 100,
        jump: 50,
		health: 30,
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.PASSIVE,
        weapon: 0,
        totalWeapons: 2,
        activeWeapon: "EntityBullet2",
        startPosition: null,
        invincible: true,
        invincibleDelay: 2,
        invincibleTimer:null,
        _wmDrawBox: true,
        _wmBoxColor: 'rgba(255, 0, 0, 0.7)',
        jumpSFX: new ig.Sound( 'media/sounds/jump.*' ),
        shootSFX: new ig.Sound( 'media/sounds/shoot.*' ),
        deathSFX: new ig.Sound( 'media/sounds/death.*' ),
        init: function( x, y, settings ) {
        	this.parent( x, y, settings );
            this.setupAnimation(this.weapon);
            this.startPosition = {x:x,y:y};
            this.invincibleTimer = new ig.Timer();
            this.makeInvincible();

        },
        setupAnimation: function(offset){
            //offset = offset * 10;
            this.addAnim('idle', .7, [2+offset,3+offset]);
            this.addAnim('run', .7, [2+offset,3+offset]);
            this.addAnim('jump', .7, [2+offset,3+offset]);
            this.addAnim('fall', .7, [2+offset,3+offset]);
        },
        makeInvincible: function(){
            this.invincible = true;
            this.invincibleTimer.reset();
        },
        update: function() {
			ig.game.gravity = 40;
			// move left or right
        	var accel = this.standing ? this.accelGround : this.accelAir;
        	if( ig.input.state('left') ) {
        		this.accel.x = -accel;
        		this.flip = true;
        	}else if( ig.input.state('right') ) {
        		this.accel.x = accel;
        		this.flip = false;
        	}else{
        		this.accel.x = 0;
        	}
        	// jump
        	if( /*this.standing &&*/ ig.input.state('jump') ) {
        		this.vel.y = -this.jump;
                //this.jumpSFX.play();
        	}
            // shoot
            // shoot
            if (this.activeWeapon == 'EntityBullet2' || this.activeWeapon == 'EntityBullets12') {
			if( ig.input.pressed('shoot') ) {
            	if (this.activeWeapon == 'EntityBullets12') {
				ig.game.spawnEntity( EntityBullets32, this.pos.x, this.pos.y, {flip:this.flip} );
				ig.game.spawnEntity( EntityBullets22, this.pos.x, this.pos.y, {flip:this.flip} );
				ig.game.spawnEntity( this.activeWeapon, this.pos.x, this.pos.y, {flip:this.flip} ); }
				else
					ig.game.spawnEntity( this.activeWeapon, this.pos.x, this.pos.y, {flip:this.flip} );
                //this.shootSFX.play();
            } }
			else {
			if( ig.input.state('shoot') ) {
            	ig.game.spawnEntity( this.activeWeapon, this.pos.x, this.pos.y, {flip:this.flip} );
				
			}}
            if( ig.input.pressed('switch') ) {
            	this.weapon ++;
            	if(this.weapon >= this.totalWeapons)
            		this.weapon = 0;
                switch(this.weapon){
                	case(0):
                		this.activeWeapon = "EntityBullet2";
                		break;
                	//case(1):
                		//this.activeWeapon = "EntityBulletmg2";
						//break;
					//case(2):
                		//this.activeWeapon = "EntityBullets12";
						//break;
                }
                //this.setupAnimation(this.weapon);
            }
            // set the current animation, based on the player's speed
            if( this.vel.y < 0 ) {
            	this.currentAnim = this.anims.jump;
            }else if( this.vel.y > 0 ) {
            	this.currentAnim = this.anims.fall;
            }else if( this.vel.x != 0 ) {
            	this.currentAnim = this.anims.run;
            }else{
            	this.currentAnim = this.anims.idle;
            }
            this.currentAnim.flip.x = this.flip;
            if( this.invincibleTimer.delta() > this.invincibleDelay ) {
                this.invincible = false;
                this.currentAnim.alpha = 1;
            }
        	// move!
        	this.parent();
        },
        kill: function(){
            //this.deathSFX.play();
            this.parent();
            ig.game.respawnPosition = this.startPosition;
            ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, {callBack:this.onDeath} );
        },
        onDeath: function(){
            ig.game.stats.deaths ++;
            ig.game.lives --;
            if(ig.game.lives < 0){
                ig.game.gameOver();
            }else{
                ig.game.spawnEntity( EntityPlayerw, ig.game.respawnPosition.x, ig.game.respawnPosition.y);
            }
        },
        receiveDamage: function(amount, from){
            if(this.invincible)
                return;
            this.parent(amount, from);
			this.makeInvincible();
        },
        draw: function(){
            if(this.invincible)
                this.currentAnim.alpha = this.invincibleTimer.delta()/this.invincibleDelay * 1 ;
            this.parent();
			ig.game.statText.draw('Health: ' + this.health, 5,15);
        }
    });
    EntityBullet2 = ig.Entity.extend({
        size: {x: 5, y: 3},
        animSheet: new ig.AnimationSheet( 'media/bullet.png', 5, 3 ),
        maxVel: {x: 100, y: 0},
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.PASSIVE,
        init: function( x, y, settings ) {
            this.parent( x + (settings.flip ? -4 : 8) + 11 , y+27, settings );
            this.vel.x = this.accel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
            this.addAnim( 'idle', 0.2, [0] );
        },
        handleMovementTrace: function( res ) {
            this.parent( res );
            if( res.collision.x || res.collision.y ){
                this.kill();
            }
        },
        check: function( other ) {
            other.receiveDamage( 10, this );
            this.kill();
        }
    });
	EntityBulletmg2 = ig.Entity.extend({
        size: {x: 5, y: 3},
        animSheet: new ig.AnimationSheet( 'media/bullet.png', 5, 3 ),
        maxVel: {x: 100, y: 0},
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.PASSIVE,
        init: function( x, y, settings ) {
            this.parent( x + (settings.flip ? -4 : 8) + 11 , y+27, settings );
            this.vel.x = this.accel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
            this.addAnim( 'idle', 0.2, [0] );
        },
        handleMovementTrace: function( res ) {
            this.parent( res );
            if( res.collision.x || res.collision.y ){
                this.kill();
            }
        },
        check: function( other ) {
            other.receiveDamage( 0.5, this );
            this.kill();
        }
    });
	EntityBullets12 = ig.Entity.extend({
        size: {x: 5, y: 3},
        animSheet: new ig.AnimationSheet( 'media/bullet.png', 5, 3 ),
        maxVel: {x: 100, y: 100},
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.PASSIVE,
        init: function( x, y, settings ) {
            this.parent( x + (settings.flip ? -4 : 8) + 11 , y+27, settings );
            this.vel.x = this.accel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
			this.vel.y = this.accel.y = (settings.flip ? -this.maxVel.y : this.maxVel.y);
            this.addAnim( 'idle', 0.2, [0] );
        },
        handleMovementTrace: function( res ) {
            this.parent( res );
            if( res.collision.x || res.collision.y ){
                this.kill();
            }
        },
        check: function( other ) {
            other.receiveDamage( 3, this );
            this.kill();
        }
    });
	EntityBullets22 = ig.Entity.extend({
        size: {x: 5, y: 3},
        animSheet: new ig.AnimationSheet( 'media/bullet.png', 5, 3 ),
        maxVel: {x: 100, y: -100},
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.PASSIVE,
        init: function( x, y, settings ) {
            this.parent( x + (settings.flip ? -4 : 8) + 11 , y+27, settings );
            this.vel.x = this.accel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
			this.vel.y = this.accel.y = (settings.flip ? -this.maxVel.y : this.maxVel.y);
            this.addAnim( 'idle', 0.2, [0] );
        },
        handleMovementTrace: function( res ) {
            this.parent( res );
            if( res.collision.x || res.collision.y ){
                this.kill();
            }
        },
        check: function( other ) {
            other.receiveDamage( 3, this );
            this.kill();
        }
    });
	EntityBullets32 = ig.Entity.extend({
        size: {x: 5, y: 3},
        animSheet: new ig.AnimationSheet( 'media/bullet.png', 5, 3 ),
        maxVel: {x: 100, y: 0},
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.PASSIVE,
        init: function( x, y, settings ) {
            this.parent( x + (settings.flip ? -4 : 8) + 11 , y+27, settings );
            this.vel.x = this.accel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
			this.vel.y = this.accel.y = (settings.flip ? -this.maxVel.y : this.maxVel.y);
            this.addAnim( 'idle', 0.2, [0] );
        },
        handleMovementTrace: function( res ) {
            this.parent( res );
            if( res.collision.x || res.collision.y ){
                this.kill();
            }
        },
        check: function( other ) {
            other.receiveDamage( 3, this );
            this.kill();
        }
    });
});

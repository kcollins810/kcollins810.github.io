ig.module(
    'game.entities.playert'
)
.requires(
    'impact.entity',
    'impact.sound'
)
.defines(function(){
    EntityPlayert = ig.Entity.extend({
        animSheet: new ig.AnimationSheet( 'media/newplayert.png', 40, 40 ),
        size: {x: 33, y: 33},
        offset: {x: 5, y: 5},
        flip: false,
        maxVel: {x: 100, y: 100},
        friction: {x: 600, y: 600},
        accelGround: 300,
        accelAir: 300,
        jump: 300,
		health: 30,
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.PASSIVE,
        weapon: 0,
        totalWeapons: 2,
        activeWeapon: "EntityBullet",
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
            this.addAnim('idleup', 1, [0+offset]);
            this.addAnim('idleright', .1, [1+offset]);
            this.addAnim('idledown', 1, [2+offset]);
            this.addAnim('idleleft', 0.4, [3+offset]);
        },
        makeInvincible: function(){
            this.invincible = true;
            this.invincibleTimer.reset();
        },
        update: function() {
            ig.game.gravity = 0; 
			 // move left or right
        	var accel = this.standing ? this.accelGround : this.accelAir;
        	if( ig.input.state('left') ) {
        		this.accel.x = -accel;
				this.accel.y = 0;
        		//this.flip = true;
        	}else if( ig.input.state('right') ) {
        		this.accel.x = accel;
				this.accel.y = 0;
        		//this.flip = false;
			}else if( ig.input.state('up') ) {
        		this.accel.y = -accel;
				this.accel.x = 0;
        		//this.flip = false;
			}else if( ig.input.state('down') ) {
        		this.accel.y = accel;
				this.accel.x = 0;
        		//this.flip = false;
        	}else{
        		this.accel.x = 0;
				this.accel.y = 0;
        	}
        	/*// jump
        	if( this.standing && ig.input.pressed('jump') ) {
        		this.vel.y = -this.jump;
                //this.jumpSFX.play();
        	}*/
            /*// shoot
            if( ig.input.pressed('shoot') ) {
            	ig.game.spawnEntity( this.activeWeapon, this.pos.x, this.pos.y, {flip:this.flip} );
                //this.shootSFX.play();
            }*/
            /*if( ig.input.pressed('switch') ) {
            	this.weapon ++;
            	if(this.weapon >= this.totalWeapons)
            		this.weapon = 0;
                switch(this.weapon){
                	case(0):
                		this.activeWeapon = "EntityBullet";
                		break;
                	case(1):
                		this.activeWeapon = "EntityGrenade";
                	break;
                }
                //this.setupAnimation(this.weapon);
            }*/
            // set the current animation, based on the player's speed
            if( this.vel.y < 0 ) {
            	this.currentAnim = this.anims.idleup;
            }else if( this.vel.y > 0 ) {
            	this.currentAnim = this.anims.idledown;
            }else if( this.vel.x > 0 ) {
            	this.currentAnim = this.anims.idleright;
            }else if( this.vel.x < 0 ) {
            	this.currentAnim = this.anims.idleleft;
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
                ig.game.spawnEntity( EntityPlayert, ig.game.respawnPosition.x, ig.game.respawnPosition.y);
            }
        },
        receiveDamage: function(amount, from){
            if(this.invincible)
                return;
            this.parent(amount, from);
        },
        draw: function(){
            if(this.invincible)
                this.currentAnim.alpha = this.invincibleTimer.delta()/this.invincibleDelay * 1 ;
            this.parent();
			ig.game.statText.draw('Health: ' + this.health, 5,15);
        }
    });
    /*EntityBullet = ig.Entity.extend({
        size: {x: 5, y: 3},
        animSheet: new ig.AnimationSheet( 'media/bullet.png', 5, 3 ),
        maxVel: {x: 300, y: 0},
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
            other.receiveDamage( 3, this );
            this.kill();
        }
    });
    EntityGrenade = ig.Entity.extend({
        size: {x: 4, y: 4},
        offset: {x: 2, y: 2},
        animSheet: new ig.AnimationSheet( 'media/grenade.png', 8, 8 ),
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.BOTH,
        collides: ig.Entity.COLLIDES.PASSIVE,
        maxVel: {x: 200, y: 200},
        bounciness: 0.6,
        bounceCounter: 0,
        init: function( x, y, settings ) {
            this.parent( x + (settings.flip ? -4 : 7), y, settings );
            this.vel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
            this.vel.y = -(50 + (Math.random()*100));
            this.addAnim( 'idle', 0.2, [0,1] );
        },
        handleMovementTrace: function( res ) {
        	this.parent( res );
        	if( res.collision.x || res.collision.y ) {
        		// only bounce 3 times
        		this.bounceCounter++;
        		if( this.bounceCounter > 3 ) {
        			this.kill();
        		}
        	}
        },
        check: function( other ) {
        	other.receiveDamage( 10, this );
        	this.kill();
        },
        kill: function(){
            for(var i = 0; i < 20; i++)
                ig.game.spawnEntity(EntityGrenadeParticle, this.pos.x, this.pos.y);
            this.parent();
        }
    });
    EntityDeathExplosion = ig.Entity.extend({
        lifetime: 1,
        callBack: null,
        particles: 25,
        init: function( x, y, settings ) {
            this.parent( x, y, settings );
                for(var i = 0; i < this.particles; i++)
                    ig.game.spawnEntity(EntityDeathExplosionParticle, x, y, {colorOffset: settings.colorOffset ? settings.colorOffset : 0});
                this.idleTimer = new ig.Timer();
            },
            update: function() {
                if( this.idleTimer.delta() > this.lifetime ) {
                    this.kill();
                    if(this.callBack)
                        this.callBack();
                    return;
                }
            }
    });
    EntityDeathExplosionParticle = ig.Entity.extend({
        size: {x: 2, y: 2},
        maxVel: {x: 160, y: 200},
        lifetime: 2,
        fadetime: 1,
        bounciness: 0,
        vel: {x: 100, y: 30},
        friction: {x:100, y: 0},
        collides: ig.Entity.COLLIDES.LITE,
        colorOffset: 0,
        totalColors: 7,
        animSheet: new ig.AnimationSheet( 'media/blood.png', 2, 2 ),
        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            var frameID = Math.round(Math.random()*this.totalColors) + (this.colorOffset * (this.totalColors+1));
            this.addAnim( 'idle', 0.2, [frameID] );
            this.vel.x = (Math.random() * 2 - 1) * this.vel.x;
            this.vel.y = (Math.random() * 2 - 1) * this.vel.y;
            this.idleTimer = new ig.Timer();
        },
        update: function() {
            if( this.idleTimer.delta() > this.lifetime ) {
                this.kill();
                return;
            }
            this.currentAnim.alpha = this.idleTimer.delta().map(
                this.lifetime - this.fadetime, this.lifetime,
                1, 0
            );
            this.parent();
        }
    });
    EntityGrenadeParticle = ig.Entity.extend({
        size: {x: 1, y: 1},
        maxVel: {x: 160, y: 200},
        lifetime: 1,
        fadetime: 1,
        bounciness: 0.3,
        vel: {x: 40, y: 50},
        friction: {x:20, y: 20},
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.LITE,
        animSheet: new ig.AnimationSheet( 'media/explosion.png', 1, 1 ),
        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.vel.x = (Math.random() * 4 - 1) * this.vel.x;
            this.vel.y = (Math.random() * 10 - 1) * this.vel.y;
            this.idleTimer = new ig.Timer();
            var frameID = Math.round(Math.random()*7);
            this.addAnim( 'idle', 0.2, [frameID] );
        },
        update: function() {
            if( this.idleTimer.delta() > this.lifetime ) {
                this.kill();
                return;
            }
            this.currentAnim.alpha = this.idleTimer.delta().map(
                this.lifetime - this.fadetime, this.lifetime,
                1, 0
            );
            this.parent();
        }
    });*/
});

ig.module(
	'game.entities.zombies'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityZombies = ig.Entity.extend({
    animSheet: new ig.AnimationSheet( 'media/shark.png', 80, 35 ),
    size: {x: 79, y:33},
    offset: {x: 1, y: 2},
    maxVel: {x: 230, y: 1},
    flip: true,
    friction: {x: 150, y: 0},
    speed: 16,
	health: 150,
    type: ig.Entity.TYPE.B,
    checkAgainst: ig.Entity.TYPE.A,
    collides: ig.Entity.COLLIDES.PASSIVE,
    init: function( x, y, settings ) {
    	this.parent( x, y, settings );
    	this.addAnim('walk', .7, [0,1]);
    },
    update: function() {
    	ig.game.gravity = 40;
		// near an edge? return!
    	if( !ig.game.collisionMap.getTile(
    		this.pos.x + (this.flip ? +4 : this.size.x -4),
    			this.pos.y + this.size.y+1
    		)
    	) {
    		//this.flip = this.flip;
    	}
    	var xdir = this.flip ? -1 : 1;
    	this.vel.x = this.speed * xdir;
    	this.currentAnim.flip.x = !this.flip;
    	this.parent();
		
    },
    handleMovementTrace: function( res ) {
    	this.parent( res );
    	// collision with a wall? return!
    	if( res.collision.x ) {
    		this.flip = !this.flip;
    	}
    },
    check: function( other ) {
    	other.receiveDamage( 10, this );
    },
    receiveDamage: function(value){
        this.parent(value);
        if(this.health > 0)
    		ig.game.spawnEntity(EntityDeathExplosion, this.pos.x + 20, this.pos.y +25, {particles: 2, colorOffset: 1});
    },
    kill: function(){
        ig.game.stats.kills ++;
        this.parent();
        ig.game.spawnEntity(EntityDeathExplosion, this.pos.x + 20, this.pos.y +25, {colorOffset: 1});
    }
});
});

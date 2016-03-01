ig.module(
	'game.entities.zombieb'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityZombieb = ig.Entity.extend({
    animSheet: new ig.AnimationSheet( 'media/enemy2.png', 70, 100 ),
    size: {x: 70, y:95},
    offset: {x: 0, y: 0},
    maxVel: {x: 0, y: 0},
    flip: true,
    friction: {x: 150, y: 0},
    speed: 14,
	health: 500,
    type: ig.Entity.TYPE.B,
    checkAgainst: ig.Entity.TYPE.A,
    collides: ig.Entity.COLLIDES.PASSIVE,
    init: function( x, y, settings ) {
    	this.parent( x, y, settings );
    	this.addAnim('walk', .4, [0]);
    },
    update: function() {
    	/*// near an edge? return!
    	if( !ig.game.collisionMap.getTile(
    		this.pos.x + (this.flip ? +4 : this.size.x -4),
    			this.pos.y + this.size.y+1
    		)
    	) {
    		this.flip = !this.flip;
    	}
    	var xdir = this.flip ? -1 : 1;
    	this.vel.x = this.speed * xdir;
    	this.currentAnim.flip.x = this.flip;*/
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
    	other.receiveDamage( 30, this );
    },
    receiveDamage: function(value){
        this.parent(value);
        if(this.health > 0)
    		ig.game.spawnEntity(EntityDeathExplosion, this.pos.x + 30, this.pos.y +75, {particles: 2, colorOffset: 1});
    },
    kill: function(){
        ig.game.stats.kills ++;
        this.parent();
        ig.game.spawnEntity(EntityDeathExplosion, this.pos.x + 30, this.pos.y +75, {colorOffset: 1});
    }
});
});

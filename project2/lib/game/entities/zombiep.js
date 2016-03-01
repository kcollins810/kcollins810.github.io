ig.module(
	'game.entities.zombiep'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityZombiep = ig.Entity.extend({
    animSheet: new ig.AnimationSheet( 'media/self.PNG', 35, 50 ),
    size: {x: 35, y:45},
    offset: {x: 0, y: 5},
    type: ig.Entity.TYPE.A,
    checkAgainst: ig.Entity.TYPE.NONE,
    collides: ig.Entity.COLLIDES.PASSIVE,
    init: function( x, y, settings ) {
    	this.parent( x, y, settings );
    	this.addAnim('idle', 1, [0,1,0,1,0,1,2,1]);
    },
    update: function() {
		this.currentAnim = this.anims.idle;
		this.parent();
    },
    kill: function(){
            //this.deathSFX.play();
            this.parent();
            ig.game.respawnPosition = this.startPosition;
            ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, {callBack:this.onDeath} );
        },
});
});

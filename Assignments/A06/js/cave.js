var cave ={
    preload:function(){
        //loading tilemap
        game.load.tilemap('cave', 'assets/maps/cave.json', null, Phaser.Tilemap.TILED_JSON);
        //mapping tile .pngs
        game.load.image('collision','tileset/logic/collision.png');
        game.load.image('ground/brown','tileset/ground/brown.png');
        game.load.image('rock/rocks_2','tileset/ground/rock/rocks_2.png');
        game.load.image('floor_tiles','tileset/ground/indoor/floor_tiles.png');
        game.load.image('rocks','tileset/ground/rock/rocks.png');
        game.load.image('wall/int_rock','tileset/building/wall/int_rock.png');
        game.load.image('purple_crystal','tileset/ground/rock/purplr_crystal.png');
        game.load.image('stairs','tileset/building/stairs/stairs.png');
        game.load.image('dark_stars','tileset/building/stairs/dark_stairs.png');
        game.load.image('blood/floor_stain','tileset/item/blood/floor_stain.png');
        game.load.image('blood/nsew_stains','tileset/item/blood/nsew_stains.png');
        game.load.image('corpse/skeleton','tileset/item/corpse/skeleton.png');
        game.load.image('corpse/huge_animal','tileset/item/corpse/huge_animal.png');
        game.load.image('skull_dark','tileset.item/corpse/skull_dark.png');
        game.load.image('skull_pale','tileset.item/corpse/skull_pale.png');
        game.load.image('broken_green_column','tileset/item/statue/broke_green_column.png');
        game.load.image('blackened_column','tileset/item/statue/blackened_column');
        game.load.image('mushroom3','tileset/plant/mushroom3.png');
        game.load.image('star_shaped_plants','tileset/plant/star_shaped_plants.png');
        game.load.image('portal','tileset/logic/portal.png');
        game.load.image('creature/giant_human','tileset/logic/creature/giant_human.png');
        game.load.image('creature/mutant','tileset/logic/creature/mutant.png');
        game.load.image('creature/huge_animal','tileset/logic/creature/huge_animal.png');
        game.load.image('ground/brown','tileset/ground/brown.png');
    },

    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        //mapping tilesets
        this.map.addTilesetImage('collision','collision');
        this.map.addTilesetImage('ground','ground/brown');
        this.map.addTilesetImage('rocks2','rock/rocks_2');
        this.map.addTilesetImage('floor','floor_tiles');
        this.map.addTilesetImage('rocks','rocks');
        this.map.addTilesetImage('wallRock','wall/int_rock');
        this.map.addTilesetImage('crystal','purple_crystal');
        this.map.addTilesetImage('stairs','stairs');
        this.map.addTilesetImage('darkStairs','dark_stairs');
        
    }
}
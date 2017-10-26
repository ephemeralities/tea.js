/**
 * Creates an instance of a Game
 * @class Game
 * @param {number} width - specifies the width of the game screen's viewport
 * @param {number} height - specifies the height of the game screen's viewport
 * @param {boolean} antialiasing - sets whether antialiasing is active or not
 */
 
function Game(width, height, antialiasing = false) {
    this.running = true;
    this.effects = new EffectsRenderer(this);
    this.manager = new ObjectManager(this);
    this.timer = new Timer(this);
    this.camera = new Camera(0, 0, this, this.manager);
    this.directory = "assets/";
    this.keys = new Keys();
    this.sprites = new SpriteContainer();
    this.display = new Display(width, height, antialiasing, this);

    Sprite.prototype.game = this;
    Sprite.prototype.manager = this.manager;
    Sprite.prototype.effects = this.effects;

    SimpleSprite.prototype.game = this;
    SimpleSprite.prototype.manager = this.manager;

    Camera.prototype.display = this.display;

    Keys.prototype.game = this;

    window.addEventListener("load", this.start);
    window.addEventListener("keydown", this.keys.keyActive);
    window.addEventListener("keyup", this.keys.keyInactive);
    window.Key = this.keys;
    window.Sprites = this.sprites;
}

Game.prototype = {

    /**
     * Specifies the directory in which image assets are stored
     * @memberof Game.prototype
     * @func changeDirectory
     * @param {String} [newDirectory = "assets/"] - New directory
     */
    changeDirectory: function(newDirectory) {
        this.directory = newDirectory + "/";
    },

    /**
     * Pauses the currently running game
     * @memberof Game.prototype
     * @func pause
     */
    pause: function(){
        this.running = true;
        this.paused = true;
        window.cancelAnimationFrame(this.id);
        console.log("Game is currently paused");
    },

    /**
     * Resumes the game if it is paused.
     * @memberof Game.prototype
     * @func resume
     */
    resume: function(){
        this.running = true;
        this.paused = false;
        window.requestAnimationFrame(main);
        console.log("Game is resuming...");
    },

    /**
     * Restarts the game and runs whatever is in the init function
     * @memberof Game.prototype
     * @func restart
     */
    restart: function(){
        if(this.running)
            this.stop();
        init();
        window.requestAnimationFrame(main);
        console.log("Game has restarted...");
    },

    /**
     * Initializes the world through init and starts the main loop
     * @memberof Game.prototype
     * @func start
     * */
    start: function() {
        init();
        window.requestAnimationFrame(main);
        window.removeEventListener("load", this.worldInitialize);
    },

    /**
     * Permanently stops the game loop and clears everything
     * @memberof Game.prototype
     * @func stop
     * */
    stop: function(){
        this.running = false;
        window.cancelAnimationFrame(this.id);
        console.log("Game has been stopped");
        this.timer.reset();
        this.manager.purge();
        this.camera.reset();
    },
    
    /**
     * Refreshes and redraws what is on screen
     * @memberof Game.prototype
     * @func update
     */
    update: function() {
        if(!this.paused){
            this.camera.update();
           // this.camera.updateActive();
            this.display.drawActive();
            this.timer.update();
        }
    },
};

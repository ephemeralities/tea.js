function Keys(){
    this.initKeys();
}

Keys.prototype = {
    initKeys: function(){
        for(var i = 0; i < 26; i++){
            this[String.fromCharCode(i + 65).toLowerCase()] = false;
        }
    },
    
    keyInactive: function(e){
        this.Key[e.key] = false;
    },
    
    keyActive: function(e){
        this.Key[e.key] = true;
    }
};

//User object instantiated.
var user = {
    userKey: null,

    //Creates a user cache key using a number scrabling system to put the users data into a complex obfuscated string.
    createKey() {
        this.userKey = "u" + (88 - gold) + "r" + (212 - silver) + "g" + (2001 - copper) + "y" + (117 - clicks) + "l" + (422 - diamond) + "o";
        document.getElementById("userKey").value = this.userKey;
        localStorage.setItem("raidKey", this.userKey)
    },

    //Decodes the currently assigned userkey and loads the data values from it.
    loadKey(type) {
        if(type == "b") {
            this.userKey = document.getElementById("userKey").value;
        }
        gold = 88 - this.userKey.substring(this.userKey.lastIndexOf("u") + 1, this.userKey.lastIndexOf("r"));
        silver = 212 - this.userKey.substring(this.userKey.lastIndexOf("r") + 1, this.userKey.lastIndexOf("g"));
        copper = 2001 - this.userKey.substring(this.userKey.lastIndexOf("g") + 1, this.userKey.lastIndexOf("y"));
        clicks = 117 - Number(this.userKey.substring(this.userKey.lastIndexOf("y") + 1, this.userKey.lastIndexOf("l")));
        diamond = 422 - Number(this.userKey.substring(this.userKey.lastIndexOf("l") + 1, this.userKey.lastIndexOf("o")));
        this.createKey();
        updateDisplay();
    },

    checkStart() {
        if(localStorage.getItem("raidKey") === null) {
            gold = 0;
		    silver = 0;
            copper = 0;
            clicks = 0;
            diamond = 0;
            this.createKey();
            localStorage.setItem("raidKey", this.userKey);
            localStorage.setItem("raidClicks", clicks);
            updateDisplay();
        }
        else {
            this.userKey = localStorage.getItem("raidKey");
            this.loadKey("a");
            log(null, null, "C")
        }
    },

    resetCache() {
        localStorage.removeItem("raidKey", "null")
    },

    resetStats() {
        localStorage.removeItem("raidKey", "null")
        gold = 0;
		silver = 0;
        copper = 0;
        clicks = 0;
        diamond = 0;
        this.createKey();
    }
}
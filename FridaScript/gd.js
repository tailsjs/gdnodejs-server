'use strict';
let cache = {
	modules: {},
	options: {}
};

let base = Process.findModuleByName('libcocos2dcpp.so').base;
let malloc = new NativeFunction(Module.findExportByName('libcocos2dcpp.so', 'malloc'), 'pointer', ['int']);

function messageSetup(){
	Interceptor.attach(base.add(0x5057D8), {
		onEnter: function(args){
			try{
				if(args[1].readUtf8String().match(/boomlings/))
					args[1] = createStringPtr(args[1].readUtf8String().replace("www.boomlings.com", cache.options.redirectHost))
			}catch(e){}
		}
	});
}

// startup
rpc.exports = {
	init: function(stage, options) {
		cache.options = options || {};
		cache.options.redirectHost = "www.boomlings.com"; // Your own host (you can use more than 26 symbols :])
		messageSetup()
	}
};

function createStringPtr(message) {
    let charPtr = malloc(message.length + 1);
    Memory.writeUtf8String(charPtr, message);
    return charPtr;
}
// frida -U Gadget -l script.js --no-pause --runtime=v8
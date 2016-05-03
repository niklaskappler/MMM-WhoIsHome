/**
 * Created by niklaskappler on 28.04.16.
 */


Module.register("MMM-WhoIsHome",{

    // Define module defaults
    defaults: {
        device: [
            {
                name: "Someones iPhone",
                ip: "localhost",
                mac: "90:FD:61:18:01:CD"
            },
        ],
        showAllDevice: false,
        useIP: false,
        reloadInterval:  1 * 60 * 1000, // every 5 minutes
    },


    // Override start method.
    start: function() {
        Log.log("Starting module: " + this.name);
        this.devices = [];
        var rel = this.config.reloadInterval
        this.sendSocketNotification("ARP_REQUEST", {reloadInterval:rel});
    },

    // Override socket notification handler.
    socketNotificationReceived: function(notification, payload) {
        if (notification === 'ARP_RESPONSE') {
            this.update(payload);
        }
    },

    // Override dom generator.
    getDom: function() {
        var wrapper = document.createElement("div");



        var tableWrapper = document.createElement("table");
        var headerWrappper = document.createElement("header");
        headerWrappper.innerHTML ="Who Is Home:";

        wrapper.appendChild(headerWrappper);

        if (this.devices.length == 0){
            tableWrapper.innerHTML = "No Device is online or response";
            tableWrapper.className = "small dimmed";
            wrapper.appendChild(tableWrapper);
            return wrapper;
        }

        for(var e in this.devices){
            var trWrapper = document.createElement("tr");

            var nameWrapper = document.createElement("td");
            nameWrapper.innerHTML = this.devices[e].name;

            var ipWrapper = document.createElement("td");
            ipWrapper.innerHTML = "("+this.devices[e].ip+")";

            var macWrapper = document.createElement("td");
            macWrapper.innerHTML = " "+this.devices[e].mac;

            var vendorWrapper = document.createElement("td");
            vendorWrapper.innerHTML = " "+this.devices[e].vendor;

            trWrapper.appendChild(nameWrapper);
            trWrapper.appendChild(ipWrapper);
            //trWrapper.appendChild(macWrapper);
            //trWrapper.appendChild(vendorWrapper);
            trWrapper.className = "small dimmed";
            tableWrapper.appendChild(trWrapper);
        }
        wrapper.appendChild(tableWrapper);
        return wrapper;
    },

    update: function (data) {
        this.devices = [];

        for (var d in data){
            for (var m in this.config.device){
                if(data[d].mac == this.config.device[m].mac){
                    data[d].name = this.config.device[m].name;
                    this.devices.push(data[d]);
                }
            }
        }

        //this.devices = data;
        console.log(data);
        this.updateDom();
    }
});
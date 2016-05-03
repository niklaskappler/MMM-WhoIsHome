/**
 * Created by niklaskappler on 02.05.16.
 */

var NodeHelper = require("node_helper");
var arpscanner = require('./arpscanner.js');



module.exports = NodeHelper.create({

    start: function () {

        this.sendSocketNotification("ARP_RESPONSE", [ ] );
        return;
    },

    socketNotificationReceived: function (notification, payload) {
        var that = this;
        that.update();
        if (notification === 'ARP_REQUEST') {
            setInterval(function() {
                that.update();
            }, payload.reloadInterval);
            
        }
    },
    update: function () {
        var that = this;
        arpscanner(onResult);
        function onResult(err, data) {
            if(err) throw  err;
            that.sendSocketNotification("ARP_RESPONSE", data);
            //that.sendSocketNotification('ARP_RESPONSE', {});
        }
    }
});
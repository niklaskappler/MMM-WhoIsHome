MMM-WhoIsHome
===
[MagicMirror](https://github.com/MichMich/MagicMirror) Module to display which wifi devices is at home...

Dependencies:
---
* [arpscan](https://github.com/goliatone/arpscan) --- allready included
* [arp-scan](http://linux.die.net/man/1/arp-scan) --- `sudo apt-get install arp-scan`

Setup:
---
* Install [arp-scan](http://linux.die.net/man/1/arp-scan)
* Go into your module folder an run `npm install`
* Add the following to your config:
````javascript
{
	module: 'MMM-WhoIsHome',
	position: 'top_right',
	config:{
		    device: [{
			    	name: <YOUR DEVICE NAME>, //required
			    	mac: <YOUR DEVICE MAC ADRESS>, //required
			},],
		},
},
````

TODO:
---
* _Clean up code_

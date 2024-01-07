Module.register("MMM-CountDown",{
	// Default module config.
	defaults: {
		event: "New Millenium:",
		date: "3000-01-01",
		showHours: false,
		showMinutes: false,
		showSeconds: false,
		customInterval: 10000,
		daysLabel: 'd',
		hoursLabel: 'h',
		minutesLabel: 'm',
		secondsLabel: 's',
	},

	// set update interval
	start: function() {
		var self = this;
		setInterval(function() {
			self.updateDom(); // no speed defined, so it updates instantly.
		}, this.config.customInterval); 
	},
	getScripts() {
		return ["moment.js"];
	},
	getStyles: function () {
		return ['MMM-CountDown.css']
	},
	// Update function
	getDom: function() {

		var wrapper = document.createElement("div");
		for (var  i=0; i<this.config.events.length; i++){
			var event = this.config.events[i];
			var eventWrapper = document.createElement("div");
			var timeWrapper = document.createElement("div");
			var textWrapper = document.createElement("div");
	
			textWrapper.className = "week align-left dimmed medium";
			timeWrapper.className = "time bright medium light";
			textWrapper.innerHTML= event.event;
	
			var today = new Date(Date.now());
			var target = new Date(event.date);
			var timeDiff = target - today;
	
			// Set days, hours, minutes and seconds
			var diffDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
			var diffHours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			var diffMinutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
			var diffSeconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
			
			// Build the output
			var hrs = '';
			var mins = '';
			var secs = '';
			var days = diffDays + this.config.daysLabel;
	
			if(this.config.showHours == true) hrs = diffHours + this.config.hoursLabel;
			if(this.config.showMinutes == true) mins = diffMinutes + this.config.minutesLabel;
			if(this.config.showSeconds == true) secs = diffSeconds + this.config.secondsLabel;
	
			timeWrapper.innerHTML = days + hrs + mins + secs;
	
			eventWrapper.appendChild(textWrapper);
			eventWrapper.appendChild(timeWrapper);
			wrapper.appendChild(eventWrapper);

		}

		return wrapper;
	}
});

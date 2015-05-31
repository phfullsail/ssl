var User = function (){
	this.data = {
		fname: null,
		lname: null,
		username: null,
		password: null,
		email: null
	};

	this.fill = function(info) {

		for(var prop in this.data) {
			if(this.data[prop] !== 'undefined') {
				this.data[prop] = info[prop];
			}
		}
	};

	this.getInfo = function () {
		return this.data;
	}
};

module.exports = function (info) {
	var instance = new User();

	instance.fill(info);

	return instance;

};




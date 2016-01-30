/**
 * Created by jarvis on 16/1/30.
 */
var crypto = require('crypto');

module.exports = {
	getCryptoStr: function(str) {
		return crypto.createHash('md5').update(str).digest('hex');
	}
};
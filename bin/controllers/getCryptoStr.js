/**
 * Created by jarvis on 16/2/1.
 */
'use strict';
var crypto = require('crypto');

module.exports = function(str) {
	return crypto.createHash('md5').update(str).digest('hex');
};

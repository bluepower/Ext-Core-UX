//-------------------------------------------------------------------------
// String more methods
//-------------------------------------------------------------------------
String.escapeMore = function(string) {
    return string.replace(/('|\\)/g, "\\$1");
};

String.leftPadMore = function(val, size, ch) {
	var result = String(val);
	if(!ch) {
		ch = " ";
	}
	while (result.length < size) {
		result = ch + result;
	}
	return result;
};

String.formatMore = function(format) {
	var toArray = function() {
		var ua = navigator.userAgent.toLowerCase(),
			isIE = !(/opera/.test(ua)) && (/msie/.test(ua));

		return isIE ?
			function(a, i, j, res) {
				res = [];
				for(var x = 0, len = a.length; x < len; x++) {
					res.push(a[x]);
				}
				return res.slice(i || 0, j || res.length);
			} :
			function(a, i, j) {
				return Array.prototype.slice.call(a, i || 0, j || a.length);
			}
    }();

	var args = toArray(arguments, 1);
	return format.replace(/\{(\d+)\}/g, function(m, i) {
		return args[i];
	});
};

String.prototype.toggleMore = function(value, other) {
    return this == value ? other : value;
};

String.prototype.trimMore = function() {
    var re = /^\s+|\s+$/g;
    return function() {
		return this.replace(re, "");
	};
}();

//-------------------------------------------------------------------------
// leftPadZero
//-------------------------------------------------------------------------
String.leftPadZero1 = function(num, n) {
	var i = (num + '').length;
	while(i++ < n) num = '0' + num;
	return num;
};

String.leftPadZero2 = function(num, n) {
	if((num + '').length >= n) return num;
	return String.leftPadZero2('0' + num, n);
};

String.leftPadZero3 = function(num, n) {
	return (Array(n).join(0) + num).slice(-n);
};

String.leftPadZero4 = function(num, n) {
	var len = num.toString().length;
	while(len < n) {
		num = '0' + num;
		len ++;
	}
	return num;
};
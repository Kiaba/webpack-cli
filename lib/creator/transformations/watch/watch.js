const isAssignment = require('../../utils/is-assignment');
const utils = require('../../../transformations/utils');

/*
*
* Transform for watch. Finds the watch property from yeoman and creates a
* property based on what the user has given us.
*
* @param j — jscodeshift API
* @param ast - jscodeshift API
* @param { Object } yeomanConfig - Object containing transformation rules
* @returns ast - jscodeshift API
*/

module.exports = function(j, ast, yeomanConfig) {
	const webpackProperties = yeomanConfig.webpackOptions;
	function createWatchProperty(p) {
		return utils.pushCreateProperty(j, p, 'watch', webpackProperties['watch']);
	}
	if(typeof(webpackProperties['watch']) === 'boolean') {
		return ast.find(j.ObjectExpression).filter(p => isAssignment(p, createWatchProperty));
	} else {
		return ast;
	}
};

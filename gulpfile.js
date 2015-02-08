var gulp = require('gulp');
var ProjectHelper = require('project-helpers');

ProjectHelper.setup({
	debug : false,
	sourcePath : 'assets/',
	componentsPath : 'assets/components/',
	mainLessFile : 'main.less',
	buildPath : '/Users/ridewing/Documents/produktioner/powergamer/deploy/public/themes/powergamer/assets/build/'
});

ProjectHelper.registerComponent('knockout');
ProjectHelper.registerComponent('jquery');
//ProjectHelper.registerComponent('jquery-ui', 'jquery-ui.js');
ProjectHelper.registerComponent('jquery.cookie', 'jquery.cookie.js');
ProjectHelper.registerComponent('spin.js');
ProjectHelper.registerComponent('ladda', 'dist/ladda.min.js');
ProjectHelper.registerComponent('fastclick');
ProjectHelper.registerComponent('sweetalert', 'lib/sweet-alert.js');
ProjectHelper.registerComponent('html5shiv', 'dist/html5shiv.js');

gulp.task("default", function () {
	ProjectHelper.default();
});

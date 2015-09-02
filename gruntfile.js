module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-beep');
	grunt.loadNpmTasks('grunt-sass');

	grunt.initConfig({
		uglify: {
			my_target: {
				files: {
					'public/app/components/script.js': ['components/js/*.js']
				} //files
			} //my_target
		}, //uglify
		watch: {
			scripts: {
				files: ['public/app/components/js/*.js'],
				tasks: ['uglify'],
				options: {
					livereload: 35729,
					spawn: false
				}
			},//scripts
			sass: {
				files: ['public/app/components/scss/*.scss'],
				tasks: ['sass'],
				options: {
					livereload: 35729,
					spawn: false
				}
			},//sass
			html: {
				files: ['public/*.html'],
				options: {
					livereload: 35729,
					spawn: false
				}
			}//html
		},//watch
		connect:{
			port:8080
		},//connect
		sass: {
			options: {
				style: 'expanded'
				},
				dist: { 
     		 	files: {                         // Dictionary of files
        			'public/app/components/styles.css': 'public/app/components/scss/style.scss',       // 'destination': 'source'        			
        		}
        	}
		}//sass

	}); //initConfig

	grunt.registerTask('default', ['connect','watch']); 
	

}; //exports
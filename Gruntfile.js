module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
			//将多个文件合并成一个文件
			concat: {
	          options:{
	            stripBanners:true, //合并时允许输出头部信息
	            banner:'/*!<%= pkg.name %> - <%= pkg.version %>-'+'<%=grunt.template.today("yyyy-mm-dd") %> */'
	          },
	          cssConcat:{
	            src:['src/css/one.css','src/css/two.css'],
	            dest:'src/css/<%= pkg.name %> - <%= pkg.version %>.css'//dest 是目的地输出
	          },
	          jsConcat:{
	            src:'src/*.js',
	            dest:'src/<%=pkg.name %> - <%= pkg.version %>.js'
	          }
	      },
		//压缩css
		cssmin: {
			options: {
				stripBanners: true, //合并时允许输出头部信息
				banner: '/*!<%= pkg.name %> - <%= pkg.version %>-' + '<%=grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: 'src/css/<%=pkg.name %> - <%=pkg.version %>.css', //合并后再压缩
				dest: 'src/css/<%= pkg.name %> - <%= pkg.version %>.min.css' //dest 是目的地输出
			}
		},
		//压缩js
		uglify: {
			options: {
				stripBanners: true,
				banner: '/*! <%= pkg.name %>-<%=pkg.version%>.js <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: 'src/<%=pkg.name %> - <%=pkg.version %>.js',
				dest: 'build/<%=pkg.name%>-<%=pkg.version%>.min.js'
			}
		},
		//jshint（js语法检测插件）插件的配置信息
		jshint: {
			build: ['Gruntfiles.js', 'src/*.js'],
			options: {
				jshintrc: '.jshintrc'
			}
		},
		//css语法检测
		csslint: {
			build: ['src/css/*.css'],
			options: {
				csslintrc: '.csslintrc'
			}
		},
		 //watch自动化
        watch:{
            build:{
                files:['src/*.js','src/css/*.css'],
                tasks:['jshint','csslint','concat','cssmin','uglify'],
                options:{spawn:false}
            }
        }
	});
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default', ["jshint",'csslint','concat','cssmin','uglify','watch']);

};
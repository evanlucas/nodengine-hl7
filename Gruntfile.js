var spawn = require('child_process').spawn

module.exports = function(grunt) {
  grunt.initConfig({
    cafemocha: {
      test: {
        src: 'test/*.js',
        options: {
          ui: 'bdd',
          colors: true,
          timeout: 5000,
          slow: 75,
          reporter: grunt.option('reporter') || 'spec'
        }
      },
      cover: {
        src: 'test/*.js',
        options: {
          ui: 'bdd',
          reporter: 'html-cov-bootstrap',
          coverage: {
            output: 'coverage.html',
            env: 'NODENGINEHL7_COV'
          }
        }
      }
    },

    clean: {
      cov: ['lib-cov']
    },

    modverify: {
      main: {
        options: {
          fileFilter: ['*.js'],
          directoryFilter: ['!.git', '!node_modules', '!lib/segments']
        }
      }
    }
  })

  grunt.loadNpmTasks('grunt-modverify')
  grunt.loadNpmTasks('grunt-cafe-mocha')
  grunt.loadNpmTasks('grunt-contrib-clean')

  grunt.registerTask('lib-cov', 'Generate coverage', function() {
    var done = this.async()
    var child = spawn('jscoverage', ['lib', 'lib-cov'],
      { cwd: process.cwd(), env: process.env })
    child.stdout.pipe(process.stdout)
    child.stderr.pipe(process.stderr)
    child.on('exit', function(code) {
      if (code !== 0) {
        grunt.fail.fatal(new Error('jscoverage returned: '+code))
      }
      done()
    })
  })

  grunt.registerTask('test', ['cafemocha:test'])

  grunt.registerTask('default', ['test'])
  grunt.registerTask('cover', ['clean', 'lib-cov', 'cafemocha:cover', 'modverify'])
}

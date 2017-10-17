
var jsoncss = require("jsoncss");
var fs= require('fs');
var _ = require('lodash');
var jsonfile = require('jsonfile')
function CssHelperPlugin(options) {
    // Configure your plugin with options...
    this.options = _.extend({config:'css.config.json'}, options);
    this.options.schema=jsonfile.readFileSync('./css.config.json')
    console.log(this.options.schema)

}

CssHelperPlugin.prototype.apply = function(compiler) {
    var self = this;


    compiler.plugin("compile", function(params) {
        console.log(params);
    });

    compiler.plugin("compilation", function(compilation) {
        console.log("The compiler is starting a new compilation...");

        compilation.plugin("optimize", function() {
            console.log("The compilation is starting to optimize files...");
        });
    });
    compiler.plugin("emit", function(compilation, callback) {
        console.log(self.options.schema)
        console.log("The compilation is going to emit files...");

          var style= self.generateStyle(self.options.schema)
        self.generateCssFile(style,callback)




    });
};

CssHelperPlugin.prototype.generateStyle = function (data) {
    var self = this;
    var css={}
    _.forEach(data, function(object, key) {
        console.log('innn')
        for (var i = object.start; i < object.end; i += object.distance) {
            console.log(object.className)
            css['.'+object.className + '-' + i]={}
            css['.'+object.className + '-' + i][object.style]=i + 'px'+(object.important===true?'!important':'')
        }
    })
    console.log(css)

    return css;


}


CssHelperPlugin.prototype.generateCssFile = function (style,callback) {
    jsoncss.convert(style, '', function(err, result) {
        if (err) {
            return console.log(err);
        }
        fs.writeFile('csshelper.css', result, function(err){
            if (err) {
                return console.log(err);
            }
            callback();
        });

    });

}


module.exports = CssHelperPlugin;
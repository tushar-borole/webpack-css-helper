
var jsoncss = require("jsoncss");
var fs= require('fs');
var _ = require('lodash');
function CssHelperPlugin(options) {
    // Configure your plugin with options...
    this.options = _.extend({config:'css.config.json'}, options);

}

CssHelperPlugin.prototype.apply = function(compiler) {
    var self = this;

    self.test()
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
        console.log("The compilation is going to emit files...");

        jsoncss.convert({
            "body": {
                "color":"red"
            }
        }, '', function(err, result) {
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

    });
};

CssHelperPlugin.prototype.generateMarginPadding = function (templateFunction) {
console.log('test')

}

module.exports = CssHelperPlugin;
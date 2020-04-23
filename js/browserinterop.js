(function() {
  var clar, compile;
  clar = require("./clar");
  clar.require = require;
  compile = clar.compile;
  clar.eval = (function(code, options) {
    if ((typeof options === 'undefined')) options = {};
    options.wrap = false;
    return eval(compile(code, options));
  });
  clar.run = (function(code, options) {
    var compiled;
    if ((typeof options === 'undefined')) options = {};
    options.wrap = false;
    compiled = compile(code, options);
    return Function(compile(code, options))();
  });
  if ((typeof window === 'undefined')) return;
  clar.load = (function(url, callback, options, hold) {
    var xhr;
    if ((typeof options === 'undefined')) options = {};
    if ((typeof hold === 'undefined')) hold = false;
    options.sourceFiles = [url];
    xhr = (window.ActiveXObject ? new window.ActiveXObject("Microsoft.XMLHTTP") : new window.XMLHttpRequest());
    xhr.open("GET", url, true);
    if (("overrideMimeType" in xhr)) xhr.overrideMimeType("text/plain");
    xhr.onreadystatechange = (function() {
      var param;
      if ((xhr.readyState === 4)) {
        if ((xhr.status === 0 || xhr.status === 200)) {
          param = [xhr.responseText, options];
          if (!hold) clar.run.apply(clar, [].concat(param));
        } else {
          throw new Error(("Could not load " + url));
        }
      }
      return (callback ? callback(param) : undefined);
    });
    return xhr.send(null);
  });

  function runScripts() {
    var scripts, clars, index, s, i, script, _i, _ref, _ref0;
    scripts = window.document.getElementsByTagName("script");
    clars = [];
    index = 0;
    _ref = scripts;
    for (_i = 0; _i < _ref.length; ++_i) {
      s = _ref[_i];
      if ((s.type === "text/clar")) clars.push(s);
    }

    function execute() {
      var param, _ref0;
      param = clars[index];
      if ((param instanceof Array)) {
        clar.run.apply(clar, [].concat(param));
        ++index;
        _ref0 = execute();
      } else {
        _ref0 = undefined;
      }
      return _ref0;
    }
    execute;
    _ref0 = clars;
    for (i = 0; i < _ref0.length; ++i) {
      script = _ref0[i];
      (function(script, i) {
        var options, _ref1;
        options = {};
        if (script.src) {
          _ref1 = clar.load(script.src, (function(param) {
            clars[i] = param;
            return execute();
          }), options, true);
        } else {
          options.sourceFiles = ["embedded"];
          _ref1 = (clars[i] = [script.innerHTML, options]);
        }
        return _ref1;
      })(script, i);
    }
    return execute();
  }
  runScripts;
  return window.addEventListener ? window.addEventListener("DOMContentLoaded", runScripts, false) : window.attachEvent("onload", runScripts);
})['call'](this);

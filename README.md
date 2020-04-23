# violet

A stable web - framework written for simplicity and reliable quality. Built on top of <a href="http://github.com/clarence-lang/clarence">Clarence</a>.

> Note: This project is an open-source and non-dependency built :)

## Get started

You are allowed to use the ```html <script type="text/clar"></script>``` Tag to interop with a clarence application. You just need to set an external script for a JS <-> Clarence interop: 

```html
<html>
  <head>
  </head>
  <body>
    <script src="https://github.com/clarence-lang/violet/blob/master/js/browserinterop.js"></script>
    <script type="text/clar">
      (alert "Hello, from Clarence")
    </script>
  </body
</html>
```

You see the internal compiler will be fetched and compiles the clarence script very quickly.

## Samples

Some useful samples:

```html
<html>
  <head>
  </head>
  <body>
    <script src="https://github.com/clarence-lang/violet/blob/master/js/browserinterop.js"></script>
    <script type="text/clar">
    ; yanked at macro parse
    (mac makeReduce name operator
      `(def ,name ...args
          (if (isnt args.length 0)
            (args.reduce {,operator #0 #1}))))

    ; yanked at macroexpand
    (makeReduce mul *)

    ; code put back at macroexpand
    ; (def mul ...args
    ;   (if (isnt args.length 0)
    ;     (args.reduce {* #0 #1})))

    ; add your own macro call here
    ; try a non-operator
    (mul 2 3 )
    </script>
  </body
</html>

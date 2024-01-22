# Developer section
This section is for those are developing **J**a**S**ali.
## How to create the bundle version
To enable the use of **J**a**S**ali on the **front-end** of webapp, we crate a **bundle** version. It can be created by using [browserify](https://browserify.org/) with the plug in [esmify](https://github.com/mattdesl/esmify). The command to create it is:

```
browserify src/jasali.js -p esmify -s jasali -o jasali.js
```

## How to test the bundle version
To test the bundle version of **J**a**S**ali, we develop a simple **HTML** code that can be run on any brower. You can find it in [here](index.html). The expected value for the gas mixture density is: 5.453e-1.
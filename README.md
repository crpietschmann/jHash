# jHash - "location.hash" -based Routes and Querystrings
jHash allows you to work with 'location.hash' value in a similar fashion to a server-side query string. It also supports cross-browser "hashchange" event handling and a hash-based Routing engine.

This library utilizes the HTML5 "onhashchange" event, but also includes a fall back to still allow the change notifications to work properly in older web browsers.

[View Documentation Here](wiki)

## Key Advantages of jHash

- Free, open source (MIT icense)
- Simple and Lightweight - 4kb minified / 2kb compressed
- Supports all mainstream browsers - IE7+, Firefox, Safari, Chrome
- Fully Documented
- No Dependencies
- Single Page Application support via Hash Routing
- Hash QueryString Support for easily storing key/value pairs in hash
- Far easier than accessing and parsing "location.hash" manually

## NuGet Package

[http://nuget.org/packages/jhash](http://nuget.org/packages/jhash)

![](images/NuGet-Package.png)

## Sample Code

```
// *********************************************
// jHash Routing Example:
// *********************************************
// Hash that would match this Route Pattern
// #Wisconsin/Milwaukee
jHash.route('{state}/{city}',
    function () {
        var stateName = this.state;
        // stateName will equal 'Wisconsin'

        var cityName = this.city;
        // cityName will equal 'Milwaukee'
    }
);

// *********************************************
// "location.hash" Manipulation Examples:
// *********************************************
// URL:
// http://localhost/page.htm#SomeValue?name=Chris&location=Wisconsin

// get "root" hash value
var root = jHash.root(); // returns "SomeValue"

// get "name" hash querystring value
var name = jHash.val('name'); // returns "Chris"

// get "location" hash querystring value
var loc = jHash.val('location'); // return "Wisconsin"

// set new individual query string value
jHash.val('name', 'Steve');

// set all new query string hash values
jHash.val({
    name: 'Steve',
    location: 'Montana'
});

// clear the hash
jHash.clear();

// clear just the hash root value
jHash.clearRoot();

// clear just the hash querystring
jHash.clearQuery();
```

## Articles / News

2012-05-01 - [jHash v2.0 Released: Now with Routing Support!](http://pietschsoft.com/post/2012/05/01/jHash-v20-Released-Now-with-Routing-Support!.aspx)

2010-11-26 - [jHash: Easily Manage Browser History / window.location.hash](http://pietschsoft.com/post/2010/11/26/jHash-Easily-Manage-Browser-History-windowlocationhash.aspx)

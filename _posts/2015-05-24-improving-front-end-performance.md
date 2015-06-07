---
layout: article
permalink: /blog/:title/

title: "Improving Front-End Performance"
blogTitle: Improving Front-End <span class="u-highlight-text">Performance</span>
author: rob
date: 2015-05-24 08:33:38

exerpt: "With the latest update to GoSquared we set ourselves the target of achieving a smooth 60 frames per second for all the core UI and animation, across all devices."
---
Last year I wrote a post, Need for Speed, where I shared my workflows and techniques along with the tools involved in the development of my site. Since then my site has gone through another redesign, and although I made various workflow and server-side improvements, I gave front-end performance extra attention. Here’s what I did, why I did it, and the tools I used to optimize front-end performance on my site.

1. [Minimize Requests](#minimize-requests "Google's Homepage")
2. [Compression/Optimization](#compressionoptimization "Google's Homepage")
- [CSS and JavaScript](#css-and-javascript "Google's Homepage")
- [Images](#images "Google's Homepage")
3. [Page Rendering](#page-rendering "Google's Homepage")
- [CSS](#css "Google's Homepage")
- [JavaScript](#javascript "Google's Homepage")
- [Webfonts](#webfonts "Google's Homepage")
4. [Other](#other "Google's Homepage")
5. [Round Up](#round-up "Google's Homepage")
6. [Resources](#resources "Google's Homepage")

## Minimize Requests

Every asset required to render the page (external CSS or JS files, webfonts, images, etc.) as your site loads is an additional HTTP request. The average website makes [93 requests](https://www.google.com "Google's Homepage")!

My goal was to minimize HTTP requests. One way is to compile or concatenate (combining/merging) CSS and JS into one file each. Automating this process (e.g. using a build tool like [Grunt](https://www.google.com "Google's Homepage") or [Gulp](https://www.google.com "Google's Homepage")) is ideal, but at the very least should be done manually for production.

Third-party scripts are common culprits for making additional requests—many make more than 1 request to grab additional files such as scripts, images or CSS. Your browser’s built-in developer tools can help you sniff out the offenders.

<figure class="o-media">
    <img srcset="../../assets/build/img/bitmap/1024/article-img.jpg 1024w,
            ../../assets/build/img/bitmap/640/article-img.jpg 640w" 
        sizes="100vw"
        src="../../assets/build/img/bitmap/320/article-img.jpg" 
        alt="">
    <figcaption>Google Chrome Developer Tools’ Network tab</figcaption>
</figure>

For example, Facebook’s script makes 3 requests. A test environment with social sharing scripts from a handful of popular social sites shows that they quickly add up:

<div class="o-table o-table--scroll">
    <table>
        <thead>
            <tr>
                <th>Site</th>
                <th>Files</th>
                <th>Size</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Google+</td>
                <td>1</td>
                <td>15.1KB</td>
            </tr>
            <tr>
                <td>Facebook</td>
                <td>3</td>
                <td>73.3KB</td>
            </tr>
            <tr>
                <td>LinkedIn</td>
                <td>2</td>
                <td>47.7KB</td>
            </tr>
            <tr>
                <td>Pinterest</td>
                <td>3</td>
                <td>12.9KB</td>
            </tr>
            <tr>
                <td>Tumblr</td>
                <td>1</td>
                <td>1.5KB</td>
            </tr>
            <tr>
                <td>Twitter</td>
                <td>4</td>
                <td>52.7KB</td>
            </tr>
            <tr>
                <td>Total</td>
                <td>14</td>
                <td>203.2KB</td>
            </tr>
        </tbody>
    </table>
</div>

Source: [Responsible Social Share Links](https://www.google.com "Google's Homepage")

That’s an additional 14 HTTP requests and 203.2KB. Instead, I went with [“share-intent” URLs](https://www.google.com "Google's Homepage"), which are basically links used to pass and construct data into a share and can be used to create social share links using just HTML. It allowed me to strip away the third-party scripts I was using for sharing, which accounted for 7 requests. I wrote more on this matter on [Responsible Social Share Links](https://www.google.com "Google's Homepage").

Evaluate each third-party script and determine its importance. There may be a way to accomplish what it does without depending on the third-party. You may lose some functionality (e.g. like/tweet/share count) but ask the question: “Is the like count that important?”

## Compression / Optimization

Now that I had found ways to minimize requests made, I began looking for ways to cut fat off the meat. The smaller the files, the faster they load. The [average page size is 1,950KB](https://www.google.com "Google's Homepage"). Here’s the content breakdown:

find ways to cut weight where I could. [What Does My Site Cost?](https://www.google.com "Google's Homepage") built by [Tim Kadlec](https://www.google.com "Google's Homepage"), is a wonderful tool to help you test and visualize what it costs to visit your site from around the world based on the weight of your site.

### CSS and JavaScript

Compressing/minifying your stylesheets and JavaScript files can noticeably decrease file sizes—I saved up to 56% from one file in compression alone.

<div class="o-table o-table--scroll">
    <table>
        <thead>
            <tr>
                <th></th>
                <th>Before Compression</th>
                <th>After</th>
                <th>Savings</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>CSS</td>
                <td>135KB</td>
                <td>104KB</td>
                <td>23.0%</td>
            </tr>
            <tr>
                <td>JS</td>
                <td>16KB</td>
                <td>7KB</td>
                <td>56.3%</td>
            </tr>
        </tbody>
    </table>
</div>

I write CSS using the [BEM (Block, Element, Modifier) methodology](https://www.google.com "Google's Homepage"), and it can result in long, verbose class names. Refactoring some of my code to be less verbose (“navigation” to “nav”, “introduction” to “intro”) gave me some savings but wasn’t nearly as noticeable as before-vs-after compression, which I expected.

<div class="o-table o-table--scroll">
    <table>
        <thead>
            <tr>
                <th>Verbose Classes</th>
                <th>Less Verbose</th>
                <th>Savings</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>104KB</td>
                <td>97KB</td>
                <td>6.7%</td>
            </tr>
        </tbody>
    </table>
</div>

I also re-evaluated the need for jQuery. Of the 135KB of minified JavaScript, about 96KB was the jQuery library alone—71%! There wasn’t a lot that relied on jQuery, so I took the time to refactor my code. I shaved off 122KB by stripping away jQuery and rewriting it in vanilla JavaScript, which cut the file size down to 13KB minified.

<div class="o-table o-table--scroll">
    <table>
        <thead>
            <tr>
                <th>jQuery</th>
                <th>Vanilla JS</th>
                <th>Savings</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>135KB</td>
                <td>13KB</td>
                <td>122KB (90%)</td>
            </tr>
        </tbody>
    </table>
</div>

Since then I managed to strip away even more (7KB compressed), and the script rounds out to only 0.365KB when compressed and gzipped.

### Images

Images typically make up the bulk of a website. The [average site has 1,249KB of images](https://www.google.com "Google's Homepage").

I ditched icon fonts and replaced them with inline SVGs . In addition, any images that could be drawn as vectors were placed with inline SVGs as well. One page of the previous version of my site was loading 145KB in icon webfonts alone, and of the hundreds of icons in the webfonts, I was only utilizing a dozen of them. In comparison, one page of the current site loads 10KB of inline SVGs—that’s a 93% difference.

[SVG sprites](https://www.google.com "Google's Homepage") look interesting and seem like they could be a viable solution to replacing common inline SVG icons I use throughout the site.

Use CSS instead of images when possible—there’s so much that can be done with CSS nowadays. However, browser compatibility may be an issue with modern CSS; therefore, make good use of [caniuse.com](https://www.google.com "Google's Homepage") and enhance progressively.

You can also squeeze bytes out of images by optimizing them. There are 2 ways to optimize images:

1. Lossy—lowers image quality
2. Lossless—doesn’t affect quality

For best results I do both, and the order is important. First, compress images using a lossy method, such as resizing images to sizes no bigger than necessary, then exporting them at a slightly lower quality without compromising too much (e.g. I usually export JPGs at 82–92%).

<figure class="o-media">
    <img srcset="../../assets/build/img/bitmap/1024/article-img.jpg 1024w,
            ../../assets/build/img/bitmap/640/article-img.jpg 640w" 
        sizes="100vw"
        src="../../assets/build/img/bitmap/320/article-img.jpg" 
        alt="">
    <figcaption>ImageOptim, an image optimization tool for OS X</figcaption>
</figure>

Next, run images through a lossless image optimization tool like ImageOptim, which further reduces image file sizes by removing unnecessary information such as metadata or color profiles.

## Page Rendering

At this point, after all that work and sweating those details, I thought for sure my [Google PageSpeed Insights](https://www.google.com "Google's Homepage") scores would be in the 90s. To my demise, they weren’t.

<figure class="o-media">
    <img srcset="../../assets/build/img/bitmap/1024/article-img.jpg 1024w,
            ../../assets/build/img/bitmap/640/article-img.jpg 640w" 
        sizes="100vw"
        src="../../assets/build/img/bitmap/320/article-img.jpg" 
        alt="">
</figure>

PSI scores were 73/100 on mobile while desktop score faired a bit better at 88/100. It suggested that I “eliminate render-blocking JavaScript and CSS.”

Render-blocking files increase the time it takes for the browser to display the content because the files need to first be downloaded and processed. Multiple render-blocking files require the browser to take multiple trips to fetch and process them, further increasing that wait time.

<figure class="o-media">
    <img srcset="../../assets/build/img/bitmap/1024/article-img.jpg 1024w,
            ../../assets/build/img/bitmap/640/article-img.jpg 640w" 
        sizes="100vw"
        src="../../assets/build/img/bitmap/320/article-img.jpg" 
        alt="">
</figure>

Optimizing JavaScript, CSS and webfont delivery can improve the page’s “time to first render.” To minimize that time, it’s important to understand the [“critical rendering path”](https://www.google.com "Google's Homepage"), which is what happens between when the first byte of the page is received and when the page is first rendered into pixels.

[WebPagetest](https://www.google.com "Google's Homepage") is the best tool out there to help you profile and visualize your site and pages’ performance.

When minimizing the time to first render, we’re giving more attention to the perception of speed by rendering the content as quickly as possible, then allowing the additional presentational “stuff” to be rendered progressively as they’re processed.

### CSS

Browsers, by default, treat CSS as render blocking; therefore, when it hits the pipeline, browsers hold off rendering until the CSS has been downloaded and processed. External stylesheets mean more network trips, which increase that wait time, and large stylesheets increase that time as well.

We can improve the page render time by inlining “critical CSS” in the `<head>` so the browser can quickly render the above-the-fold content of a page without having to wait to download the entire stylesheet, and then loading the full stylesheet in a non-rendering-blocking way.

    <head>
        <style>
            /* inline critical CSS */
        </style>
    </head>

Determining what CSS is or isn’t critical requires (1) viewing the page on mobile and/or desktop viewport sizes, (2) identifying the elements that are visible within that viewport, and (3) selecting the CSS that accompanies those elements.

This can be a bit tricky, especially when done manually, but fantastic tools are available to help expedite or even automate this process. I used [grunt-criticalcss](https://www.google.com "Google's Homepage") by [Filament Group](https://www.google.com "Google's Homepage") to help generate critical CSS for pages, which I then manually optimize the CSS a bit as well (merging duplicate media queries and removing CSS I deem as unnecessary).

Now that the critical CSS is inlined in the `<head>`, load the rest of the stylesheet asynchronously, which I do with the help of loadCSS.

    <head>
        <style>
            /* inline critical CSS */
        </style>
        <script>
            // inline the loadCSS script
            function loadCSS( href, before, media, callback ){ ... }
            // then load your stylesheet
            loadCSS("/path/to/stylesheet.css");
        </script>
        <noscript>
            <link href="/path/to/stylesheet.css" rel="stylesheet">
        </noscript>
    </head>

Google also gives an [alternate example](https://www.google.com "Google's Homepage") of loading CSS in a non-render-blocking way.

### JavaScript

JavaScript can also be render-blocking; therefore its delivery should also be optimized, which can be done the following ways:

1. Inlining small scripts.
2. Loading external scripts at the bottom of the document.
3. Deferring the execution of scripts using the `defer` attribute.
4. Asynchronously loading possible scripts using the `async` attribute.

`defer` downloads the script as the HTML is parsed but waits to execute once the page has been rendered. [defer support](https://www.google.com "Google's Homepage") is pretty good; however is reported to be inconsistent and unreliable; therefore is best to both `defer` and have them at the bottom of the document.

`async` downloads the script as the HTML is parsed and executes the moment it has been downloaded. This allows for multiple scripts to be downloaded and executed concurrently; however, they’re not guaranteed to load in a specific order. Any scripts that depend on each other may need to be modified to account for these scenarios.

[async support](https://www.google.com "Google's Homepage") is not as great as `defer`, which is why I chose to use [loadJS](https://www.google.com "Google's Homepage"), a script for asynchronously loading JS files. It supports older browsers and also has a useful feature to conditionally load a script.

    <head>
        <script>
            // small inline JS
        </script>
    </head>
    <body>
        ...
        <script>
            // inline loadJS
            function loadJS( src, cb ){ .. }
            // then load your JS
            loadJS("/path/to/script.js");
        </script>
        <script src="/path/to/parent-script.js" defer>
        <script src="/path/to/dependent-script.js" defer>
    </body>

### Webfonts

Webfonts make the content more legible and beautiful but can also have negative side effects to page rendering. When loading a page, especially on mobile connections, you may have noticed text becoming invisible for a period of time. This is known as [FOIT (Flash of Invisible Text)](https://www.google.com "Google's Homepage").

When a browser attempts to download a web font, it hides the text for a period of time until it finishes downloading the font and is ready to display the text. In worst case scenarios, the text becomes and stays invisible indefinitely, making the content completely unreadable.

The way [I solved FOIT](https://www.google.com "Google's Homepage") is by progressively loading fonts by first relying on default, system fonts (e.g. Helvetica and Georgia) to allow the content to be rendered quickly. Web fonts are then loaded asynchronously using loadCSS and rely on font events with the help of the [Font Face Observer](https://www.google.com "Google's Homepage") library to detect when the fonts have been downloaded. Once the fonts are downloaded and available, a class is added to the document which sets the page in the correct font.

    <head>
        <style>
            body { font-family: Helvetica, Arial, sans-serif; }
            .fonts-loaded body { font-family: Roboto, Helvetica, Arial, sans-serif; }
        </style>
        <script>
            // inline loadCSS
            function loadCSS( href, before, media, callback ){ ... }
            // load webfonts
            loadCSS("//fonts.googleapis.com/css?family=Roboto:400,500,700");
            // inline FontFaceObserver
            (function(){ ... }
            // detect loading of fonts
            var roboto400 = new FontFaceObserver("Roboto", {
                weight: 400
            });
            var roboto700 = new FontFaceObserver("Roboto", {
                weight: 700
            });

            Promise.all([
                roboto400.check(),
                roboto700.check()
            ]).then(function() {
                document.documentElement.className += " fonts-loaded";
            });
        </script>
    </head>

Progressively loading fonts results in FOUT (Flash of Unstyled Text) and/or FOFT (Flash of Faux Text) depending on how it’s done.

However, the benefit is that the content comes and stays available without going invisible. I wrote an in-depth post on how I defeated FOIT in [Font Loading with Font Events](https://www.google.com "Google's Homepage").

## Other

Additional methods, such as enabling gzipping and caching, configuring SSL, and serving assets from a Content Delivery Network (CDN) can improve front-end performance but would require some server-side finagling. For the sake of this post, I won’t get into them; however, I do want to stress that I recommend them and they will have an overall, positive impact on the performance of your site.

I will mention that because a healthy percentage of visits on my site are outside of the U.S., and my server is located in NYC, I decided to serve some of my assets onto a CDN. They’re deployed to an [Amazon S3](https://www.google.com "Google's Homepage") bucket, which is tied to a [CloudFront](https://www.google.com "Google's Homepage") distribution.

## Round Up

I’ve been making performance improvements incrementally over the course of a few months, and although it’s been a lot of work, I definitely notice a difference. I occasionally get comments about how fast my site is, and it’s a result of these performance tweaks.

I haven’t done a great job of keeping track of the metrics (especially early on), but let’s look at some comparisons with the numbers we do have.

That’s an overall 87.5% better than average!—Not bad. Google PageSpeed Insights now gives my site favorable scores as well.

In regards to WebPagetest results, I noticed that although bytes increased on the About page, my start-render and fully-loaded times decreased considerably.

Performance improvements will always be a work-in-progress, and with [HTTP/2 on its way](https://www.google.com "Google's Homepage"), some of this is bound to change—techniques that used to work well may not work as well anymore, while others may become deprecated altogether.

I feel that I’ve made a lot of headway and learned a lot over the past few months. My site is [open-sourced on Github](https://www.google.com "Google's Homepage"), so feel free to take a peek at what’s going on under the hood. I’ve yet to figure it all out, but I hope that my sharing what I’ve done and learned with you gives you some insight. If you have any questions or wanna chat, feel free to hit me up on Twitter [@jonsuh](https://www.google.com "Google's Homepage") or [drop me an email](https://www.google.com "Google's Homepage").

## Resources

Chock full of useful resources to get you neck deep in performance.

- [Google PageSpeed Insights](https://www.google.com "Google's Homepage")
- [SpeedCurve](https://www.google.com "Google's Homepage")
- [WebPagetest](https://www.google.com "Google's Homepage")
- [What Does My Site Cost?](https://www.google.com "Google's Homepage")
- [Front-end performance for web designers and front-end developers](https://www.google.com "Google's Homepage")
- [How we make RWD sites load fast as heck](https://www.google.com "Google's Homepage")
- [Improving Smashing Magazine’s Performance: A Case Study](https://www.google.com "Google's Homepage")
- [More Weight Doesn’t Mean More Wait](https://www.google.com "Google's Homepage")
- [Optimizing Performance](https://www.google.com "Google's Homepage")
- [RWD Bloat Part I and Part II](https://www.google.com "Google's Homepage")
- [Google PageSpeed Module](https://www.google.com "Google's Homepage")
- [Responsible Social Share Links](https://www.google.com "Google's Homepage")
- [Inlining critical CSS for first-time visits](https://www.google.com "Google's Homepage")
- [async vs defer Attributes](https://www.google.com "Google's Homepage")
- [Font Loading with Font Events](https://www.google.com "Google's Homepage")
- [Font Loading Revisited with Font Events](https://www.google.com "Google's Homepage")
- [Flash of Faux Text—still more on Font Loading](https://www.google.com "Google's Homepage")
- [The Path to Performance Podcast](https://www.google.com "Google's Homepage")


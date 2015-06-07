---
layout: article
permalink: /blog/:title/

title:  "An introduction to creating your own boilerplate"
blogTitle: An introduction to creating your own <span class="u-highlight-text">front-end boilerplate</span>
author: rob
date:   2015-05-23 08:33:38

exerpt: "With the latest update to GoSquared we set ourselves the target of achieving a smooth 60 frames per second for all the core UI and animation, across all devices."
---
## What actually happens in the browser?

Before understanding how to optimise [web sites](https://www.google.com "Google's Homepage") and * applications for efficient * rendering, it’s important to understand what is actually going on in the browser between the code you write and the pixels being drawn to screen. There are six different tasks a browser performs to accomplish all this:

- downloading and parsing HTML, CSS and JavaScript
- evaluating JavaScript
- calculating styles for elements
- laying out elements on the page
- painting the actual pixels of elements
- compositing layers to the screen

This post is only really focussing on the aspects related to achieving smooth animations without visual delay. I won’t focus on the parts about downloading and parsing assets.

<figure class="o-media o-media--large">
    <img srcset="../../assets/build/img/bitmap/1024/article-img.jpg 1024w,
            ../../assets/build/img/bitmap/640/article-img.jpg 640w" 
        sizes="100vw"
        src="../../assets/build/img/bitmap/320/article-img.jpg" 
        alt="">
</figure>

This post is only really focussing on the aspects related to achieving smooth animations without visual delay. I won’t focus on the parts about downloading and parsing assets.

## Only 16ms per frame

Before understanding how to optimise web sites and applications for efficient rendering, it’s important to understand what is actually going on in the browser between the code you write and the pixels being drawn to screen. There are six different tasks a browser performs to accomplish all this:

1. downloading and parsing HTML, CSS and JavaScript
2. evaluating JavaScript
3. calculating styles for elements
4. laying out elements on the page
5. painting the actual pixels of elements
6. compositing layers to the screen

This post is only really focussing on the aspects related to achieving smooth animations without visual delay. I won’t focus on the parts about downloading and parsing assets.

> Cras mattis iudicium purus sit amet fermentum. Curabitur est gravida et libero vitae dictum. Quae vero auctorem tractata ab fiducia dicuntur.

What is happening here is that for every iteration of the loop, the browser has to make sure that all queued changes are applied in order to calculate the value of `someOtherElement.offsetWidth`, and then apply the updated `width` style to the next element in the array. This updated width attribute will then *invalidate* the `offsetWidth` property on `someOtherElement`, meaning that for the next iteration the browser will have to perform more expensive operations in order to calculate this value.

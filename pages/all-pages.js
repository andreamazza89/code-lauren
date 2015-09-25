module.exports = {"404":{"string":"## Couldn't find that page\n\nSorry, this page doesn't seem to exist.\n\n### Return to the [help homepage](#home).\n","html":"<h2 id=\"couldn-t-find-that-page\">Couldn&#39;t find that page</h2>\n<p>Sorry, this page doesn&#39;t seem to exist.</p>\n<h3 id=\"return-to-the-a-href-onclick-pub-loadhelppage-event-home-help-homepage-a-\">Return to the <a href=\"#\" onclick=\"pub.loadHelpPage(event, 'home');\">help homepage</a>.</h3>\n","slug":"404"},"adding-numbers":{"string":"## Adding numbers\n\nAs well as drawing shapes, actions can be used for many other things.  For example: adding numbers. Delete all the code on the left. Type in this code:\n\n```\nwrite(add(1 2) 200 200 \"black\")\n```\n\nWhat happened?\n\nThe `add` action was given `1` and `2` and it added them.  `add` gave back the answer, `3`, to the `write` action which wrote it on the screen.\n\n### [← Previous](#write-text) <div class=\"next\">[Naming the result of an action →](#naming-the-result-of-an-action)</div>\n","html":"<h2 id=\"adding-numbers\">Adding numbers</h2>\n<p>As well as drawing shapes, actions can be used for many other things.  For example: adding numbers. Delete all the code on the left. Type in this code:</p>\n<pre><code>write(add(1 2) 200 200 &quot;black&quot;)\n</code></pre><p>What happened?</p>\n<p>The <code>add</code> action was given <code>1</code> and <code>2</code> and it added them.  <code>add</code> gave back the answer, <code>3</code>, to the <code>write</code> action which wrote it on the screen.</p>\n<h3 id=\"-a-href-onclick-pub-loadhelppage-event-write-text-previous-a-div-class-next-a-href-onclick-pub-loadhelppage-event-naming-the-result-of-an-action-naming-the-result-of-an-action-a-div-\"><a href=\"#\" onclick=\"pub.loadHelpPage(event, 'write-text');\">← Previous</a> <div class=\"next\"><a href=\"#\" onclick=\"pub.loadHelpPage(event, 'naming-the-result-of-an-action');\">Naming the result of an action →</a></div></h3>\n","slug":"adding-numbers"},"doing-an-action-a-lot-of-times":{"string":"## Doing an action a lot of times\n\nWhen you reused the `number` name, you could focus on the adding, rather than the naming.  This will come in useful now.  You are going to create your first animation. Delete the code on the left. Type in the code below:\n\n```\nnumber: 1\n\nforever {\n  number: add(number 1)\n\n  clear-screen()\n  write(number 600 200 \"black\")\n}\n```\n\nWhat is happening here?\n\n`1` is named `number`.  There is something about a `forever`, whatever that is.  `1` is added to `number` and the result, `2`, is named `number`.\n\nThe `clear-screen` action clears the screen. (The screen is already clear, so this is pointless, but you'll see why that line is there in a second.)\n\n`number` is written to the screen.\n\nThis is where `forever` comes in.  The `forever` jumps the code back up to the line with the `add` action. Again, `1` is added to `number` and the result, `3`, is named `number`.\n\nThe screen is cleared. So the old number that was written to the screen is cleared away. `number` is written to the screen again.  The `forever` jumps the code back...and so on.\n\n### Running your code step by step\n\nThis progression of events is quite complicated.  You can use the Code Lauren player controls to see a clearer picture of how your code runs.  Click <button class=\"example-pause-button\"></button> at the top of the page to make your program pause.  Now use <button class=\"example-step-backwards-button\"></button> and <button class=\"example-step-forwards-button\"></button> to see your code run step by step.\n\n### [← Previous](#reusing-a-name) <div class=\"next\">[Moving an oval →](#moving-an-oval)</div>\n","html":"<h2 id=\"doing-an-action-a-lot-of-times\">Doing an action a lot of times</h2>\n<p>When you reused the <code>number</code> name, you could focus on the adding, rather than the naming.  This will come in useful now.  You are going to create your first animation. Delete the code on the left. Type in the code below:</p>\n<pre><code>number: 1\n\nforever {\n  number: add(number 1)\n\n  clear-screen()\n  write(number 600 200 &quot;black&quot;)\n}\n</code></pre><p>What is happening here?</p>\n<p><code>1</code> is named <code>number</code>.  There is something about a <code>forever</code>, whatever that is.  <code>1</code> is added to <code>number</code> and the result, <code>2</code>, is named <code>number</code>.</p>\n<p>The <code>clear-screen</code> action clears the screen. (The screen is already clear, so this is pointless, but you&#39;ll see why that line is there in a second.)</p>\n<p><code>number</code> is written to the screen.</p>\n<p>This is where <code>forever</code> comes in.  The <code>forever</code> jumps the code back up to the line with the <code>add</code> action. Again, <code>1</code> is added to <code>number</code> and the result, <code>3</code>, is named <code>number</code>.</p>\n<p>The screen is cleared. So the old number that was written to the screen is cleared away. <code>number</code> is written to the screen again.  The <code>forever</code> jumps the code back...and so on.</p>\n<h3 id=\"running-your-code-step-by-step\">Running your code step by step</h3>\n<p>This progression of events is quite complicated.  You can use the Code Lauren player controls to see a clearer picture of how your code runs.  Click <button class=\"example-pause-button\"></button> at the top of the page to make your program pause.  Now use <button class=\"example-step-backwards-button\"></button> and <button class=\"example-step-forwards-button\"></button> to see your code run step by step.</p>\n<h3 id=\"-a-href-onclick-pub-loadhelppage-event-reusing-a-name-previous-a-div-class-next-a-href-onclick-pub-loadhelppage-event-moving-an-oval-moving-an-oval-a-div-\"><a href=\"#\" onclick=\"pub.loadHelpPage(event, 'reusing-a-name');\">← Previous</a> <div class=\"next\"><a href=\"#\" onclick=\"pub.loadHelpPage(event, 'moving-an-oval');\">Moving an oval →</a></div></h3>\n","slug":"doing-an-action-a-lot-of-times"},"draw-a-rectangle":{"string":"## Draw a rectangle\n\nDelete all the code on the left.  Then type in the code below to draw a rectangle.\n\nWhen I say \"type in the code\", I really mean it. There is a world of difference between typing in the code and either copying and pasting it or just taking my word for what the code does.  Learning to program is about experimenting.  Play around.  Try things I haven't suggested. Guess what some code will do, then see if you're right.\n\nGo ahead and type this in:\n\n```\ndraw-rectangle(100 200 50 150 \"filled\" \"gray\")\n```\n\n### Ordering the items in the description of a shape\n\nIn the line of code you wrote to describe the rectangle, swap the places of `100` and `\"gray\"`.  The line of code should now look like this:\n\n```\ndraw-rectangle(\"gray\" 200 50 150 \"filled\" 100)\n```\n\nWhat happened?\n\nYep, the rectangle is gone. The order you write things in matters. `draw-rectangle` expected the first item it its description to be a number that says how far from the left the rectangle is.  Instead, it got a color. Without understanding all the pieces of the description, it couldn't do its job.\n\n### [← Previous](#draw-lots-of-ovals) <div class=\"next\">[Naming things →](#naming-things)</div>\n","html":"<h2 id=\"draw-a-rectangle\">Draw a rectangle</h2>\n<p>Delete all the code on the left.  Then type in the code below to draw a rectangle.</p>\n<p>When I say &quot;type in the code&quot;, I really mean it. There is a world of difference between typing in the code and either copying and pasting it or just taking my word for what the code does.  Learning to program is about experimenting.  Play around.  Try things I haven&#39;t suggested. Guess what some code will do, then see if you&#39;re right.</p>\n<p>Go ahead and type this in:</p>\n<pre><code>draw-rectangle(100 200 50 150 &quot;filled&quot; &quot;gray&quot;)\n</code></pre><h3 id=\"ordering-the-items-in-the-description-of-a-shape\">Ordering the items in the description of a shape</h3>\n<p>In the line of code you wrote to describe the rectangle, swap the places of <code>100</code> and <code>&quot;gray&quot;</code>.  The line of code should now look like this:</p>\n<pre><code>draw-rectangle(&quot;gray&quot; 200 50 150 &quot;filled&quot; 100)\n</code></pre><p>What happened?</p>\n<p>Yep, the rectangle is gone. The order you write things in matters. <code>draw-rectangle</code> expected the first item it its description to be a number that says how far from the left the rectangle is.  Instead, it got a color. Without understanding all the pieces of the description, it couldn&#39;t do its job.</p>\n<h3 id=\"-a-href-onclick-pub-loadhelppage-event-draw-lots-of-ovals-previous-a-div-class-next-a-href-onclick-pub-loadhelppage-event-naming-things-naming-things-a-div-\"><a href=\"#\" onclick=\"pub.loadHelpPage(event, 'draw-lots-of-ovals');\">← Previous</a> <div class=\"next\"><a href=\"#\" onclick=\"pub.loadHelpPage(event, 'naming-things');\">Naming things →</a></div></h3>\n","slug":"draw-a-rectangle"},"draw-an-oval":{"string":"## Draw an oval\n\nLet's write your first program.\n\nDelete all the code in the area on the left.  Type in the code below.\n\n```\ndraw-oval(100 200 30 40 \"filled\" \"blue\")\n```\n\nDo you see a blue oval?\n\n### Make the oval an outline\n\nTry changing `\"filled\"` to `\"unfilled\"`.\n\n### Change the position and size\n\nTry changing the numbers. They describe:\n\n1. How far to the right the oval is.\n2. How far down the oval is.\n3. How wide wide the oval is.\n4. How tall the oval is.\n\nWhich one is which?\n\nDo the numbers that describe the position of the oval indicate the middle of the oval or the top left of the oval? To put the question another way, will this oval be half off the screen or fully visible?\n\n```\ndraw-oval(0 0 100 100 \"filled\" \"pink\")\n```\n\nWhat about this one?\n\n```\ndraw-oval(-50 -50 100 100 \"filled\" \"pink\")\n```\n\nType in the code to find out!\n\n### [← Previous](#home) <div class=\"next\">[Draw lots of ovals →](#draw-lots-of-ovals)</div>\n","html":"<h2 id=\"draw-an-oval\">Draw an oval</h2>\n<p>Let&#39;s write your first program.</p>\n<p>Delete all the code in the area on the left.  Type in the code below.</p>\n<pre><code>draw-oval(100 200 30 40 &quot;filled&quot; &quot;blue&quot;)\n</code></pre><p>Do you see a blue oval?</p>\n<h3 id=\"make-the-oval-an-outline\">Make the oval an outline</h3>\n<p>Try changing <code>&quot;filled&quot;</code> to <code>&quot;unfilled&quot;</code>.</p>\n<h3 id=\"change-the-position-and-size\">Change the position and size</h3>\n<p>Try changing the numbers. They describe:</p>\n<ol>\n<li>How far to the right the oval is.</li>\n<li>How far down the oval is.</li>\n<li>How wide wide the oval is.</li>\n<li>How tall the oval is.</li>\n</ol>\n<p>Which one is which?</p>\n<p>Do the numbers that describe the position of the oval indicate the middle of the oval or the top left of the oval? To put the question another way, will this oval be half off the screen or fully visible?</p>\n<pre><code>draw-oval(0 0 100 100 &quot;filled&quot; &quot;pink&quot;)\n</code></pre><p>What about this one?</p>\n<pre><code>draw-oval(-50 -50 100 100 &quot;filled&quot; &quot;pink&quot;)\n</code></pre><p>Type in the code to find out!</p>\n<h3 id=\"-a-href-onclick-pub-loadhelppage-event-home-previous-a-div-class-next-a-href-onclick-pub-loadhelppage-event-draw-lots-of-ovals-draw-lots-of-ovals-a-div-\"><a href=\"#\" onclick=\"pub.loadHelpPage(event, 'home');\">← Previous</a> <div class=\"next\"><a href=\"#\" onclick=\"pub.loadHelpPage(event, 'draw-lots-of-ovals');\">Draw lots of ovals →</a></div></h3>\n","slug":"draw-an-oval"},"draw-lots-of-ovals":{"string":"## Draw lots of ovals\n\nDraw some more ovals. You can do this by adding more lines of code to your program. For example:\n\n```\ndraw-oval(100 300 30 40 \"filled\" \"pink\")\ndraw-oval(100 400 30 40 \"filled\" \"green\")\n```\n\n### Arrange the ovals in a shape\n\nTry and make a line of ovals.\n\n### [← Previous](#draw-an-oval) <div class=\"next\">[Draw a rectangle →](#draw-a-rectangle)</div>\n","html":"<h2 id=\"draw-lots-of-ovals\">Draw lots of ovals</h2>\n<p>Draw some more ovals. You can do this by adding more lines of code to your program. For example:</p>\n<pre><code>draw-oval(100 300 30 40 &quot;filled&quot; &quot;pink&quot;)\ndraw-oval(100 400 30 40 &quot;filled&quot; &quot;green&quot;)\n</code></pre><h3 id=\"arrange-the-ovals-in-a-shape\">Arrange the ovals in a shape</h3>\n<p>Try and make a line of ovals.</p>\n<h3 id=\"-a-href-onclick-pub-loadhelppage-event-draw-an-oval-previous-a-div-class-next-a-href-onclick-pub-loadhelppage-event-draw-a-rectangle-draw-a-rectangle-a-div-\"><a href=\"#\" onclick=\"pub.loadHelpPage(event, 'draw-an-oval');\">← Previous</a> <div class=\"next\"><a href=\"#\" onclick=\"pub.loadHelpPage(event, 'draw-a-rectangle');\">Draw a rectangle →</a></div></h3>\n","slug":"draw-lots-of-ovals"},"draw-oval":{"string":"## Draw oval\n\nDraw oval is an action that draws an oval on the screen.  For example, this green oval can be drawn with the code below.\n\n![Green oval draw by code snippet](/resources/images/help/draw-oval-1.png)\n\n```\ndraw-oval(100 200 30 40 \"filled\" \"green\")\n```\n\n<table>\n  <tr>\n    <td>`100`</td>\n    <td>Distance from the left of the screen</td>\n  </tr>\n  <tr>\n    <td>`200`</td>\n    <td>Distance from the top of the screen</td>\n  </tr>\n  <tr>\n    <td>`30`</td>\n    <td>Width of the oval</td>\n  </tr>\n  <tr>\n    <td>`40`</td>\n    <td>Height of the oval</td>\n  </tr>\n  <tr>\n    <td>`\"filled\"`</td>\n    <td>Oval is drawn as a solid shape. Putting `\"unfilled\"` would draw an outline.</td>\n  </tr>\n  <tr>\n    <td>`\"green\"`</td>\n    <td>Color of the oval</td>\n  </tr>\n</table>\n","html":"<h2 id=\"draw-oval\">Draw oval</h2>\n<p>Draw oval is an action that draws an oval on the screen.  For example, this green oval can be drawn with the code below.</p>\n<p><img src=\"/resources/images/help/draw-oval-1.png\" alt=\"Green oval draw by code snippet\"></p>\n<pre><code>draw-oval(100 200 30 40 &quot;filled&quot; &quot;green&quot;)\n</code></pre><table>\n  <tr>\n    <td><code>100</code></td>\n    <td>Distance from the left of the screen</td>\n  </tr>\n  <tr>\n    <td><code>200</code></td>\n    <td>Distance from the top of the screen</td>\n  </tr>\n  <tr>\n    <td><code>30</code></td>\n    <td>Width of the oval</td>\n  </tr>\n  <tr>\n    <td><code>40</code></td>\n    <td>Height of the oval</td>\n  </tr>\n  <tr>\n    <td><code>&quot;filled&quot;</code></td>\n    <td>Oval is drawn as a solid shape. Putting <code>&quot;unfilled&quot;</code> would draw an outline.</td>\n  </tr>\n  <tr>\n    <td><code>&quot;green&quot;</code></td>\n    <td>Color of the oval</td>\n  </tr>\n</table>\n","slug":"draw-oval"},"fixing-code-using-the-player-controls":{"string":"## Fixing code using the player controls\n\nHow to fix a problem in your code:\n\n1. Find the cause of the problem.\n2. Change your code to remove the cause of the problem.\n\nThe player controls can help you with this process.  In the short video below, I write a very simple program that has a problem.  I run my program slowly using the player controls.  This slow running lets me see what causes the problem, and how to fix it.\n\n<video class=\"video-js vjs-default-skin\"\n  controls preload=\"auto\" width=\"425\" height=\"358\">\n <source src=\"/resources/videos/fixing-code-using-the-player-controls.mp4\" type='video/mp4' />\n <p class=\"vjs-no-js\">The video doesn't work in your web browser.  If you have time, please email <a href=\"mailto:mary@maryrosecook.com\">mary@maryrosecook.com</a> and I will try and fix the problem.</p>\n</video>\n","html":"<h2 id=\"fixing-code-using-the-player-controls\">Fixing code using the player controls</h2>\n<p>How to fix a problem in your code:</p>\n<ol>\n<li>Find the cause of the problem.</li>\n<li>Change your code to remove the cause of the problem.</li>\n</ol>\n<p>The player controls can help you with this process.  In the short video below, I write a very simple program that has a problem.  I run my program slowly using the player controls.  This slow running lets me see what causes the problem, and how to fix it.</p>\n<video class=\"video-js vjs-default-skin\"\n  controls preload=\"auto\" width=\"425\" height=\"358\">\n <source src=\"/resources/videos/fixing-code-using-the-player-controls.mp4\" type='video/mp4' />\n <p class=\"vjs-no-js\">The video doesn&#39;t work in your web browser.  If you have time, please email <a href=\"mailto:mary@maryrosecook.com\">mary@maryrosecook.com</a> and I will try and fix the problem.</p>\n</video>\n","slug":"fixing-code-using-the-player-controls"},"flashing-light":{"string":"## Flashing light\n\nCode that a light flash from red to blue:\n\n```\ncolor: \"red\"\n\nforever {\n  if counted(40) {\n    if equal(color \"red\") {\n      color: \"blue\"\n    } else {\n      color: \"red\"\n    }\n  }\n\n  clear-screen()\n  draw-oval(300 20 150 150 \"filled\" color)\n}\n```\n","html":"<h2 id=\"flashing-light\">Flashing light</h2>\n<p>Code that a light flash from red to blue:</p>\n<pre><code>color: &quot;red&quot;\n\nforever {\n  if counted(40) {\n    if equal(color &quot;red&quot;) {\n      color: &quot;blue&quot;\n    } else {\n      color: &quot;red&quot;\n    }\n  }\n\n  clear-screen()\n  draw-oval(300 20 150 150 &quot;filled&quot; color)\n}\n</code></pre>","slug":"flashing-light"},"home":{"string":"## Learn to code. No experience necessary.\n\nTry changing `\"blue\"` to `\"red\"` in the code on the left.\n\nTry some other colors.\n\n### <div class=\"next\">[Continue the tutorial →](#draw-an-oval)</div>\n","html":"<h2 id=\"learn-to-code-no-experience-necessary-\">Learn to code. No experience necessary.</h2>\n<p>Try changing <code>&quot;blue&quot;</code> to <code>&quot;red&quot;</code> in the code on the left.</p>\n<p>Try some other colors.</p>\n<h3 id=\"-div-class-next-a-href-onclick-pub-loadhelppage-event-draw-an-oval-continue-the-tutorial-a-div-\"><div class=\"next\"><a href=\"#\" onclick=\"pub.loadHelpPage(event, 'draw-an-oval');\">Continue the tutorial →</a></div></h3>\n","slug":"home"},"moving-an-oval":{"string":"## Moving an oval\n\nIn the previous lesson, you did your first animation. But animating a shape is even more fun. Let's do that! Delete the code on the left. Type in this code:\n\n```\nleft-dist: 1\n\nforever {\n  left-dist: add(left-dist 1)\n\n  clear-screen()\n  draw-oval(left-dist 300 30 30 \"filled\" \"blue\")\n}\n```\n\nThis code is extremely similar to the code in the previous lesson.  The main difference is that the number that gets changed is used to describe the distance of an oval from the left of the screen.\n\nAgain, if you're not sure how this code works, use the play controls at the top of the screen. Walk through the code step by step to see the sequence of events.\n\n### Next\n\nThat's the end of this tutorial. You've covered a lot. I'll publish more tutorials very soon. Please send feedback on things that could be better about Code Lauren to [mary@maryrosecook.com](mailto:mary@maryrosecook.com)\n\n### [← Previous](#doing-an-action-a-lot-of-times) <div class=\"next\">[Home](#home)</div>\n","html":"<h2 id=\"moving-an-oval\">Moving an oval</h2>\n<p>In the previous lesson, you did your first animation. But animating a shape is even more fun. Let&#39;s do that! Delete the code on the left. Type in this code:</p>\n<pre><code>left-dist: 1\n\nforever {\n  left-dist: add(left-dist 1)\n\n  clear-screen()\n  draw-oval(left-dist 300 30 30 &quot;filled&quot; &quot;blue&quot;)\n}\n</code></pre><p>This code is extremely similar to the code in the previous lesson.  The main difference is that the number that gets changed is used to describe the distance of an oval from the left of the screen.</p>\n<p>Again, if you&#39;re not sure how this code works, use the play controls at the top of the screen. Walk through the code step by step to see the sequence of events.</p>\n<h3 id=\"next\">Next</h3>\n<p>That&#39;s the end of this tutorial. You&#39;ve covered a lot. I&#39;ll publish more tutorials very soon. Please send feedback on things that could be better about Code Lauren to <a href=\"mailto:mary@maryrosecook.com\">mary@maryrosecook.com</a></p>\n<h3 id=\"-a-href-onclick-pub-loadhelppage-event-doing-an-action-a-lot-of-times-previous-a-div-class-next-a-href-onclick-pub-loadhelppage-event-home-home-a-div-\"><a href=\"#\" onclick=\"pub.loadHelpPage(event, 'doing-an-action-a-lot-of-times');\">← Previous</a> <div class=\"next\"><a href=\"#\" onclick=\"pub.loadHelpPage(event, 'home');\">Home</a></div></h3>\n","slug":"moving-an-oval"},"naming-the-result-of-an-action":{"string":"## Naming the result of an action\n\nDelete the code on the left. Type in this code:\n\n```\naddition-answer: add(1 2)\nwrite(addition-answer 600 200 \"black\")\n```\n\nThis is interesting. You created a new number, `3`, by giving `1` and `2` to the `add` action.  You then named the new number `addition-answer`.\n\n### [← Previous](#adding-numbers) <div class=\"next\">[Reusing a name →](#reusing-a-name)</div>\n","html":"<h2 id=\"naming-the-result-of-an-action\">Naming the result of an action</h2>\n<p>Delete the code on the left. Type in this code:</p>\n<pre><code>addition-answer: add(1 2)\nwrite(addition-answer 600 200 &quot;black&quot;)\n</code></pre><p>This is interesting. You created a new number, <code>3</code>, by giving <code>1</code> and <code>2</code> to the <code>add</code> action.  You then named the new number <code>addition-answer</code>.</p>\n<h3 id=\"-a-href-onclick-pub-loadhelppage-event-adding-numbers-previous-a-div-class-next-a-href-onclick-pub-loadhelppage-event-reusing-a-name-reusing-a-name-a-div-\"><a href=\"#\" onclick=\"pub.loadHelpPage(event, 'adding-numbers');\">← Previous</a> <div class=\"next\"><a href=\"#\" onclick=\"pub.loadHelpPage(event, 'reusing-a-name');\">Reusing a name →</a></div></h3>\n","slug":"naming-the-result-of-an-action"},"naming-things":{"string":"## Naming things\n\n\nEarlier, I suggested you make a line of ovals. You might have noticed that you were repeating numbers.\n\nDelete all the code on the left. Type in this code:\n\n```\ndraw-oval(200 200 30 40 \"filled\" \"blue\")\ndraw-oval(250 200 30 40 \"filled\" \"red\")\n```\n\nNotice how `200`, the description of how far down to draw an oval, appears twice.  `30`, the width of the ovals, appears twice. The height appears twice, too.\n\n### Name the distance from the top\n\nYou could name the distance of the ovals from the top like this:\n\n```\ntop-dist: 200\n```\n\nThen you could use the name in place of the distance.\n\nLet's do that. Delete all the code on the left. Type in this code:\n\n```\ntop-dist: 200\n\ndraw-oval(200 top-dist 30 40 \"filled\" \"blue\")\ndraw-oval(250 top-dist 30 40 \"filled\" \"red\")\n```\n\nNotice how the code sets `top-dist` to `200` and replaces the `200`s with `top-dist` in the `draw-oval` actions.\n\n### Change the distance from the top\n\nChange the number that `top-dist` describes. For example, you could change it to `300`.\n\n```\ntop-dist: 300\n\ndraw-oval(200 top-dist 30 40 \"filled\" \"blue\")\ndraw-oval(250 top-dist 30 40 \"filled\" \"red\")\n```\n\n### Naming something makes it easy to change\n\nNotice how easy it was to move both ovals at once.  You needed to change just one number.\n\n### Naming something describes it\n\nNotice how easy it was to figure out which number to change. Names describe the meaning of the numbers they represent.\n\n### Name the width\n\nAdd a name for the width and use it in your [`draw-oval`](#draw-oval) descriptions.\n\n### [← Previous](#draw-a-rectangle) <div class=\"next\">[Write text →](#write-text)</div>\n","html":"<h2 id=\"naming-things\">Naming things</h2>\n<p>Earlier, I suggested you make a line of ovals. You might have noticed that you were repeating numbers.</p>\n<p>Delete all the code on the left. Type in this code:</p>\n<pre><code>draw-oval(200 200 30 40 &quot;filled&quot; &quot;blue&quot;)\ndraw-oval(250 200 30 40 &quot;filled&quot; &quot;red&quot;)\n</code></pre><p>Notice how <code>200</code>, the description of how far down to draw an oval, appears twice.  <code>30</code>, the width of the ovals, appears twice. The height appears twice, too.</p>\n<h3 id=\"name-the-distance-from-the-top\">Name the distance from the top</h3>\n<p>You could name the distance of the ovals from the top like this:</p>\n<pre><code>top-dist: 200\n</code></pre><p>Then you could use the name in place of the distance.</p>\n<p>Let&#39;s do that. Delete all the code on the left. Type in this code:</p>\n<pre><code>top-dist: 200\n\ndraw-oval(200 top-dist 30 40 &quot;filled&quot; &quot;blue&quot;)\ndraw-oval(250 top-dist 30 40 &quot;filled&quot; &quot;red&quot;)\n</code></pre><p>Notice how the code sets <code>top-dist</code> to <code>200</code> and replaces the <code>200</code>s with <code>top-dist</code> in the <code>draw-oval</code> actions.</p>\n<h3 id=\"change-the-distance-from-the-top\">Change the distance from the top</h3>\n<p>Change the number that <code>top-dist</code> describes. For example, you could change it to <code>300</code>.</p>\n<pre><code>top-dist: 300\n\ndraw-oval(200 top-dist 30 40 &quot;filled&quot; &quot;blue&quot;)\ndraw-oval(250 top-dist 30 40 &quot;filled&quot; &quot;red&quot;)\n</code></pre><h3 id=\"naming-something-makes-it-easy-to-change\">Naming something makes it easy to change</h3>\n<p>Notice how easy it was to move both ovals at once.  You needed to change just one number.</p>\n<h3 id=\"naming-something-describes-it\">Naming something describes it</h3>\n<p>Notice how easy it was to figure out which number to change. Names describe the meaning of the numbers they represent.</p>\n<h3 id=\"name-the-width\">Name the width</h3>\n<p>Add a name for the width and use it in your <a href=\"#\" onclick=\"pub.loadHelpPage(event, 'draw-oval');\"><code>draw-oval</code></a> descriptions.</p>\n<h3 id=\"-a-href-onclick-pub-loadhelppage-event-draw-a-rectangle-previous-a-div-class-next-a-href-onclick-pub-loadhelppage-event-write-text-write-text-a-div-\"><a href=\"#\" onclick=\"pub.loadHelpPage(event, 'draw-a-rectangle');\">← Previous</a> <div class=\"next\"><a href=\"#\" onclick=\"pub.loadHelpPage(event, 'write-text');\">Write text →</a></div></h3>\n","slug":"naming-things"},"reusing-a-name":{"string":"## Reusing a name\n\n### Repeated additions\n\nDelete the code on the left. Type in this code:\n\n```\nfirst-number: 1\nwrite(first-number 600 200 \"black\")\n\nsecond-number: add(first-number 2)\nwrite(second-number 600 230 \"black\")\n```\n\nYou created `second-number` by giving `first-number` and `2` to the `add` action.  That is, you created a number from an existing name and gave that number a new name.\n\n### Reusing a name\n\nBut why bother making a new name? Why not just reuse the old one? Change the code on the left to this:\n\n```\nnumber: 1\nwrite(number 600 200 \"black\")\n\nnumber: add(number 2)\nwrite(number 600 230 \"black\")\n```\n\nDo you see how `number` was reused as the name of the result of adding `number` and `2`? Why is that useful? Let's find out...\n\n### [← Previous](#naming-the-result-of-an-action) <div class=\"next\">[Doing an action a lot of times →](#doing-an-action-a-lot-of-times)</div>\n","html":"<h2 id=\"reusing-a-name\">Reusing a name</h2>\n<h3 id=\"repeated-additions\">Repeated additions</h3>\n<p>Delete the code on the left. Type in this code:</p>\n<pre><code>first-number: 1\nwrite(first-number 600 200 &quot;black&quot;)\n\nsecond-number: add(first-number 2)\nwrite(second-number 600 230 &quot;black&quot;)\n</code></pre><p>You created <code>second-number</code> by giving <code>first-number</code> and <code>2</code> to the <code>add</code> action.  That is, you created a number from an existing name and gave that number a new name.</p>\n<h3 id=\"reusing-a-name\">Reusing a name</h3>\n<p>But why bother making a new name? Why not just reuse the old one? Change the code on the left to this:</p>\n<pre><code>number: 1\nwrite(number 600 200 &quot;black&quot;)\n\nnumber: add(number 2)\nwrite(number 600 230 &quot;black&quot;)\n</code></pre><p>Do you see how <code>number</code> was reused as the name of the result of adding <code>number</code> and <code>2</code>? Why is that useful? Let&#39;s find out...</p>\n<h3 id=\"-a-href-onclick-pub-loadhelppage-event-naming-the-result-of-an-action-previous-a-div-class-next-a-href-onclick-pub-loadhelppage-event-doing-an-action-a-lot-of-times-doing-an-action-a-lot-of-times-a-div-\"><a href=\"#\" onclick=\"pub.loadHelpPage(event, 'naming-the-result-of-an-action');\">← Previous</a> <div class=\"next\"><a href=\"#\" onclick=\"pub.loadHelpPage(event, 'doing-an-action-a-lot-of-times');\">Doing an action a lot of times →</a></div></h3>\n","slug":"reusing-a-name"},"share-program":{"string":"## Share your program\n\nTo send your program to someone else, copy the link below and paste it into an email, tweet or Facebook update:\n\n<pre><code id=\"program-link\">No program to share</code></pre>\n\nAlternatively, at any time, you can copy the link in the address bar of your browser and send that.\n","html":"<h2 id=\"share-your-program\">Share your program</h2>\n<p>To send your program to someone else, copy the link below and paste it into an email, tweet or Facebook update:</p>\n<pre><code id=\"program-link\">No program to share</code></pre>\n\n<p>Alternatively, at any time, you can copy the link in the address bar of your browser and send that.</p>\n","slug":"share-program"},"suggestions-for-improvement":{"string":"## Suggestions for improvement\n\nHello! I'm Mary. I made Code Lauren. I'd love to hear any feedback you have.\n\nDid anything confuse you? Did the website behave weirdly? Would you like to learn to code in a different way? Would you like a tutorial on anything specific?\n\nPlease send any and all thoughts to [mary@maryrosecook.com](mailto:mary@maryrosecook.com)\n","html":"<h2 id=\"suggestions-for-improvement\">Suggestions for improvement</h2>\n<p>Hello! I&#39;m Mary. I made Code Lauren. I&#39;d love to hear any feedback you have.</p>\n<p>Did anything confuse you? Did the website behave weirdly? Would you like to learn to code in a different way? Would you like a tutorial on anything specific?</p>\n<p>Please send any and all thoughts to <a href=\"mailto:mary@maryrosecook.com\">mary@maryrosecook.com</a></p>\n","slug":"suggestions-for-improvement"},"tutorials":{"string":"## Tutorials\n\n1. [Your first program - an animation](#draw-an-oval)\n","html":"<h2 id=\"tutorials\">Tutorials</h2>\n<ol>\n<li><a href=\"#\" onclick=\"pub.loadHelpPage(event, 'draw-an-oval');\">Your first program - an animation</a></li>\n</ol>\n","slug":"tutorials"},"write-text":{"string":"## Write text\n\nYou can write text on the screen with the `write` action.  Delete all the code on the left. Type in this code:\n\n```\nwrite(\"hi\" 200 200 \"black\")\n```\n\nUsing the `write` action is a super-easy way to look at the number that a name is pointed at.  For example, change the code on the left so it looks like this:\n\n```\nnumber: 103\n\nwrite(number 200 200 \"black\")\n```\n\nWhy would you want to do this? You'll see!\n\n\n### [← Previous](#naming-things) <div class=\"next\">[Adding numbers →](#adding-numbers)</div>\n","html":"<h2 id=\"write-text\">Write text</h2>\n<p>You can write text on the screen with the <code>write</code> action.  Delete all the code on the left. Type in this code:</p>\n<pre><code>write(&quot;hi&quot; 200 200 &quot;black&quot;)\n</code></pre><p>Using the <code>write</code> action is a super-easy way to look at the number that a name is pointed at.  For example, change the code on the left so it looks like this:</p>\n<pre><code>number: 103\n\nwrite(number 200 200 &quot;black&quot;)\n</code></pre><p>Why would you want to do this? You&#39;ll see!</p>\n<h3 id=\"-a-href-onclick-pub-loadhelppage-event-naming-things-previous-a-div-class-next-a-href-onclick-pub-loadhelppage-event-adding-numbers-adding-numbers-a-div-\"><a href=\"#\" onclick=\"pub.loadHelpPage(event, 'naming-things');\">← Previous</a> <div class=\"next\"><a href=\"#\" onclick=\"pub.loadHelpPage(event, 'adding-numbers');\">Adding numbers →</a></div></h3>\n","slug":"write-text"}}
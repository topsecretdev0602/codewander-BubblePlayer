# codewander-plotlyScatterPlotPlayer
Qliksense Extension Animated Bubble chart
Here is the new qliksense extension - bubble chart animated. This is an inspiration from the <a href="https://plot.ly/javascript/gapminder-example/">animation with sliders example</a> of <a href="https://plot.ly/">plotly</a>. This is a basic extension quickly created to demonstrate the capability.
<iframe width="560" height="315" src="https://www.youtube.com/embed/siropQVs_GY" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
&nbsp;
<h1>Steps to use</h1>
<h2>Download and Install</h2>
<ul>
 	<li>You can download the extension from the below link. If you like to contribute you can also use the <a href="https://github.com/CodeAtRoost/codewander-plotlyScatterPlotPlayer" target="_blank" rel="noopener">GIT HUB</a></li>
 	<li>Extract and copy contents of the folder in the Extensions folder on your desktop or server. It usually is in the My Documents/Qlik/Sense/Extensions folder</li>
</ul>
<div style="width: 100%;">

<a style="background-color: #81d742; padding: 14px; color: white; display: inline-block; text-align: center; text-decoration: none;" href="http://www.codewander.com/download/?download_link=https://github.com/CodeAtRoost/codewander-plotlyScatterPlotPlayer/archive/1.2.zip&amp;download_title=Qliksense%20Extension%20Bubble%20Chart%20Animated" target="_blank" rel="noopener">Download Qliksense Animated Bubble Chart Extension </a><a style="display: inline-block; background-color: #ffbe0a; padding: 14px; color: white; text-align: center; text-decoration: none;" href="https://github.com/CodeAtRoost/codewander-plotlyScatterPlotPlayer" target="_blank" rel="noopener"> Clone from GIT HUB </a>

</div>
<h2>Add to the sheet and set measures and dimensions</h2>
The animated bubble chart will now be available under the custom visualization. The visualization required three measures and three dimensions.
<div style="wdth: 100%;"><a href="http://www.codewander.com/wp-content/uploads/2018/05/Qliksense-Extension-Animated-Bubble-Chart-Dimensions.png"><img class="size-medium wp-image-260 alignleft" src="http://www.codewander.com/wp-content/uploads/2018/05/Qliksense-Extension-Animated-Bubble-Chart-Dimensions-157x300.png" alt="Qliksense Extension Animated Bubble Chart-Dimensions" width="157" height="300" /></a><a href="http://www.codewander.com/wp-content/uploads/2018/05/Qliksense-Extension-Animated-Bubble-Chart-measures.png"><img class="size-medium wp-image-261 alignleft" src="http://www.codewander.com/wp-content/uploads/2018/05/Qliksense-Extension-Animated-Bubble-Chart-measures-140x300.png" alt="Qliksense Extension Animated Bubble Chart-measures" width="140" height="300" /></a></div>
<h3><a href="http://www.codewander.com/wp-content/uploads/2018/05/Qliksense-Extension-Animated-Bubble-Chart-Details.png"><img class="aligncenter size-full wp-image-259" src="http://www.codewander.com/wp-content/uploads/2018/05/Qliksense-Extension-Animated-Bubble-Chart-Details.png" alt="Qliksense Extension Animated Bubble Chart-Details" width="1333" height="375" /></a></h3>
<h3>Measures</h3>
<ul>
 	<li>The first measure the  x-axis</li>
 	<li>The second measure is the y-axis</li>
 	<li>The third measure is the size of the bubble</li>
</ul>
<h3>Dimensions</h3>
<ul>
 	<li>The first dimension is for the slider</li>
 	<li>The second dimension is for color code of the bubble</li>
 	<li>The third dimension is the dimension to compute the values of the measures</li>
</ul>
<h3>Options for the chart</h3>
<a href="http://www.codewander.com/wp-content/uploads/2018/05/Qliksense-Extension-Animated-Bubble-Chart-Options.png">
<img class="aligncenter size-full wp-image-262" src="http://www.codewander.com/wp-content/uploads/2018/05/Qliksense-Extension-Animated-Bubble-Chart-Options.png" alt="Qliksense Extension Animated Bubble Chart-Options" width="221" height="625" /></a>
Under Appearance section, you will see the custom options for this visualization
<ul>
 	<li>Transition Duration in milliseconds - This is the duration for the transition from one frame to another frame.</li>
 	<li>Play button text</li>
 	<li>Pause button text</li>
 	<li>Bubble size (25 to 100)</li>
</ul>
<h3>Features</h3>
<h4>Advanced built-in features</h4>
The plotly graphs comes with some advanced built-in options including lasso select, pan and zoom.You can also download the visualizations as png or export data

<a href="http://www.codewander.com/wp-content/uploads/2018/05/Qliksense-Extension-Animated-Bubble-Chart-Advanced-Features.png"><img class="aligncenter size-full wp-image-264" src="http://www.codewander.com/wp-content/uploads/2018/05/Qliksense-Extension-Animated-Bubble-Chart-Advanced-Features.png" alt="Qliksense Extension Animated Bubble Chart-Advanced Features" width="370" height="40" /></a>
<h4>Handling of large data</h4>
The default rendering can handle 1000 rows of data. This extension fetches data gradually when the total data exceeds 1000 records. However, the chart will render and refresh as per the data fetched. So the users will not have any delay in seeing the data

Please use it and share your comments.

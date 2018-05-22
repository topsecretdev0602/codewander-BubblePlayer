define( ["qlik", "text!./codewander-plotlyScatterPlotPlayer.ng.html", "css!./codewander-plotlyScatterPlotPlayer.css"
,"https://cdn.plot.ly/plotly-latest.min.js"],
	function ( qlik, template,css,Plotly ) {
		"use strict";
		return {
			template: template,
			initialProperties: {
				qHyperCubeDef: {
					qMode:"S",
					qDimensions: [],
					qMeasures: [],
					qInitialDataFetch: [{
						qWidth: 6	,
						qHeight: 1
					}]
				}
			},
			definition: {
				type: "items",
				component: "accordion",
				items: {
					dimensions: {
						uses: "dimensions",
						min: 3,
						max: 3
					},
					measures: {
						uses: "measures",
						min: 3,
						max: 3
					},
					settings:{
						uses: "settings",
						items:{
						transitionDuration:{
						ref:"transitionDuration",
						label: "Transition Duration (milliseconds)",
						type: "string",
						defaultValue:"500"						
						},
						playLabel:{
						ref:"playLabel",
						label: "Play button label",
						type: "string",
						defaultValue:"Play"						
						},
						pauseLabel:{
						ref:"pauseLabel",
						label: "Pause button label",
						type: "string",
						defaultValue:"Pause"						
						},
						maxBubbleSize:{
						ref:"maxBubbleSize",
						label: "Max Bubble Size",
						type: "string",
						defaultValue:"50"						
						}
						}
					
					},
					sorting: {
						uses: "sorting"
					}
				}
			},
			support: {
				snapshot: true,
				export: true,
				exportData: true
			},
			paint: function (layout) {
				var default_options=
				{
					transitionDuration:"2000",
					playLabel:"Play",
					pauseLabel:"Pause",
					maxBubbleSize:"50"					
				}
				var self =this;
				var min_x=0;
				var max_x=0;
				var min_y=0;
				var max_y=0;
				var max_z=1;
				var dataMatrix=[];
				var cols=[];
				var dimensions_count= this.$scope.layout.qHyperCube.qDimensionInfo.length;
				var measures_count=this.$scope.layout.qHyperCube.qMeasureInfo.length;
				$.each(this.$scope.layout.qHyperCube.qDimensionInfo,function(index,item){
				 	cols.push((item.title !=null && item.title!="")?item.title : item.qFallbackTitle);					
				});
				$.each(this.$scope.layout.qHyperCube.qMeasureInfo,function(index,item){
				 	cols.push((item.title !=null && item.title!="")?item.title : item.qFallbackTitle);					
				});				 
				
				

				 //loop through the rows we have and render
				 this.backendApi.eachDataRow( function ( rownum, row ) {
							self.$scope.lastrow = rownum;
							dataMatrix.push(row);
				 });
				var data=convert(dataMatrix);
				render(data);
				//needed for export
				this.$scope.selections = [];
				
				 if(this.backendApi.getRowCount() > self.$scope.lastrow +1){
						  var requestPage = [{
								qTop: self.$scope.lastrow + 1,
								qLeft: 0,
								qWidth: 10, //should be # of columns
								qHeight: Math.min( 1000, this.backendApi.getRowCount() - self.$scope.lastrow )
							}];

						   this.backendApi.getData( requestPage ).then( function ( dataPages ) {
									//when we get the result trigger paint again
									self.paint(layout );
						   } );
				 }
				
				function convert(Matrix)
				{
				 var data=[];
				 $.each(Matrix,function(index,item){
				 	data[index]={};
				 	$.each(cols,function(col_index,col){
						data[index][col]= col_index<= dimensions_count-1 ? item[col_index].qText : item[col_index].qNum;
					})
				 })
				 return data;
				
				}
			
				function render(data){
					//Plotly code begins
					try{
					if($($element).length == 0) {
					self.$($element).empty();
					}
					}catch(error){console.log(error);}
				  // Create a lookup table to sort and regroup the columns of data,
				  // first by First_Dim, then by Second_Dim:
				  var lookup = {};
				  function getData(First_Dim, Second_Dim) {
					var byFirst_Dim, trace;
					if (!(byFirst_Dim = lookup[First_Dim])) {;
					  byFirst_Dim = lookup[First_Dim] = {};
					}
					 // If a container for this First_Dim + Second_Dim doesn't exist yet,
					 // then create one:
					if (!(trace = byFirst_Dim[Second_Dim])) {
					  trace = byFirst_Dim[Second_Dim] = {
						x: [],
						y: [],
						id: [],
						text: [],
						marker: {size: []}
					  };
					}
					return trace;
				  }

				  // Go through each row, get the right trace, and append the data:
				  for (var i = 0; i < data.length; i++) {
					var datum = data[i];
					var trace = getData(datum[cols[0]], datum[cols[1]]);
					trace.text.push(datum[cols[2]]);
					trace.id.push(datum[cols[2]]);
					trace.x.push(datum[cols[3]]);
					trace.y.push(datum[cols[4]]);
					trace.marker.size.push(datum[cols[5]]);
					if (datum[cols[3]]> max_x)max_x=datum[cols[3]];
					if (datum[cols[3]]< min_x)min_x=datum[cols[3]];
					if (datum[cols[4]]> max_y)max_y=datum[cols[4]];
					if (datum[cols[3]]< min_y)min_y=datum[cols[4]];
					if (datum[cols[5]]> max_z)max_z=datum[cols[5]];
					
				  }

				  // Get the group names:
				  var First_Dims = Object.keys(lookup);
				  // In this case, every First_Dim includes every Second_Dim, so we
				  // can just infer the Second_Dims from the *first* First_Dim:
				  var firstFirst_Dim = lookup[First_Dims[0]];
				  var Second_Dims = Object.keys(firstFirst_Dim);

				  // Create the main traces, one for each Second_Dim:
				  var traces = [];
				  for (i = 0; i < Second_Dims.length; i++) {
					var data = firstFirst_Dim[Second_Dims[i]];
					 // One small note. We're creating a single trace here, to which
					 // the frames will pass data for the different First_Dims. It's
					 // subtle, but to avoid data reference problems, we'll slice
					 // the arrays to ensure we never write any new data into our
					 // lookup table:
					traces.push({
					  name: Second_Dims[i],
					  x: data.x.slice(),
					  y: data.y.slice(),
					  id: data.id.slice(),
					  text: data.text.slice(),
					  mode: 'markers',
					  marker: {
						size: data.marker.size.slice(),
						sizemode: 'area',
						sizeref: (2*max_z)/ Math.pow(self.$scope.layout.maxBubbleSize==null? default_options.maxBubbleSize: self.$scope.layout.maxBubbleSize,2)
					  }
					});
				  }
				  
				  
				  // Create a frame for each First_Dim. Frames are effectively just
				  // traces, except they don't need to contain the *full* trace
				  // definition (for example, appearance). The frames just need
				  // the parts the traces that change (here, the data).
				  var frames = [];
				  for (i = 0; i < First_Dims.length; i++) {
					frames.push({
					  name: First_Dims[i],
					  data: Second_Dims.map(function (Second_Dim) {
						return getData(First_Dims[i], Second_Dim);
					  })
					})
				  }

				  // Now create slider steps, one for each frame. The slider
				  // executes a plotly.js API command (here, Plotly.animate).
				  // In this example, we'll animate to one of the named frames
				  // created in the above loop.
				  var sliderSteps = [];
				  for (i = 0; i < First_Dims.length; i++) {
					sliderSteps.push({
					  method: 'animate',
					  label: First_Dims[i],
					  args: [[First_Dims[i]], {
						mode: 'immediate',
						transition: {duration: self.$scope.layout.transitionDuration==null? default_options.transitionDuration: self.$scope.layout.transitionDuration},
						frame: {duration: self.$scope.layout.transitionDuration==null? default_options.transitionDuration: self.$scope.layout.transitionDuration, redraw: false},
					  }]
					});
				  }
				  var layout = {
					xaxis: {
					  title: cols[3],
					  range: [min_x, max_x]
					},
					yaxis: {
					  title: cols[4],
					  range:[min_y,max_y]//,
					 // type: 'log'
					},
					hovermode: 'closest',
					 // We'll use updatemenus (whose functionality includes menus as
					 // well as buttons) to create a play button and a pause button.
					 // The play button works by passing `null`, which indicates that
					 // Plotly should animate all frames. The pause button works by
					 // passing `[null]`, which indicates we'd like to interrupt any
					 // currently running animations with a new list of frames. Here
					 // The new list of frames is empty, so it halts the animation.
					updatemenus: [{
					  x: 0,
					  y: 0,
					  yanchor: 'top',
					  xanchor: 'left',
					  showactive: false,
					  direction: 'left',
					  type: 'buttons',
					  pad: {t: 87, r: 10},
					  buttons: [{
						method: 'animate',
						args: [null, {
						  mode: 'immediate',
						  fromcurrent: true,
						  transition: {duration: self.$scope.layout.transitionDuration==null? default_options.transitionDuration: self.$scope.layout.transitionDuration},
						  frame: {duration: self.$scope.layout.transitionDuration==null? default_options.transitionDuration: self.$scope.layout.transitionDuration, redraw: false}
						}],
						label: self.$scope.layout.playLabel==null? default_options.playLabel: self.$scope.layout.playLabel
					  }, {
						method: 'animate',
						args: [[null], {
						  mode: 'immediate',
						  transition: {duration: 0},
						  frame: {duration: 0, redraw: false}
						}],
						label: self.$scope.layout.pauseLabel==null? default_options.pauseLabel: self.$scope.layout.pauseLabel
					  }]
					}],
					 // Finally, add the slider and use `pad` to position it
					 // nicely next to the buttons.
					sliders: [{
					  pad: {l: 130, t: 55},
					  currentvalue: {
						visible: true,
						prefix: cols[0] + ":",
						xanchor: 'right',
						font: {size: 20, color: '#666'}
					  },
					  steps: sliderSteps
					}]
				  };

				  // Create the plot:
				  Plotly.newPlot('myDiv', {
					data: traces,
					layout: layout,
					frames: frames,
				  });
				  }
				
				//Plotly Code Ends
			
			
			
			
				//needed for export
				//this.$scope.selections = [];
				//return qlik.Promise.resolve();
			},
			controller: ["$scope", "$element", function ( $scope ) {
				$scope.getPercent = function ( val ) {
					return Math.round( (val * 100 / $scope.layout.qHyperCube.qMeasureInfo[0].qMax) * 100 ) / 100;
				};
				
				
				$scope.lastrow = 0;
				
				$scope.selections = [];

				$scope.sel = function ( $event ) {
					if ( $event.currentTarget.hasAttribute( "data-row" ) ) {
						var row = parseInt( $event.currentTarget.getAttribute( "data-row" ), 10 ), dim = 0,
							cell = $scope.$parent.layout.qHyperCube.qDataPages[0].qMatrix[row][0];
						if ( cell.qIsNull !== true ) {
							cell.qState = (cell.qState === "S" ? "O" : "S");
							if ( $scope.selections.indexOf( cell.qElemNumber ) === -1 ) {
								$scope.selections.push( cell.qElemNumber );
							} else {
								$scope.selections.splice( $scope.selections.indexOf( cell.qElemNumber ), 1 );
							}
							$scope.selectValues( dim, [cell.qElemNumber], true );
						}
					}
				};
			}]
		};

	} );

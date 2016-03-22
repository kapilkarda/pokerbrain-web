angular.module('myscore.controllers', ['tc.chartjs'])

.controller('MyscoreCtrl', function($scope, $ionicPlatform, $localstorage, $ionicLoading, GetScoreService, $filter, $state, $ionicHistory) {
	$ionicPlatform.ready(function(){
		try{
			$scope.userId = $localstorage.get("UserId");
			$scope.myScore=0;

			$scope.dataShowOnApp = [
				{'name':'SB', 'right':'0', 'wrong':'0'},
				{'name':'UTG', 'right':'0', 'wrong':'0'},
				{'name':'UTG + 1', 'right':'0', 'wrong':'0'},
				{'name':'MP', 'right':'0', 'wrong':'0'},
				{'name':'MP + 1', 'right':'0', 'wrong':'0'},
				{'name':'HJ', 'right':'0', 'wrong':'0'},
				{'name':'CO', 'right':'0', 'wrong':'0'},
				{'name':'BTN', 'right':'0', 'wrong':'0'}
			];
			
			$scope.MyScores=function(){
				$ionicLoading.show();
				GetScoreService.GetScore($scope.userId).then(function (data) {
					if(data.data!=''){

						$scope.rightCount = 0;
						$scope.wrongCount = 0;

						for(var i=0;i<data.data.length;i++){
							$scope.myScore=Number($scope.myScore)+Number(data.data[i].point);

							if(data.data[i].isTrue){
								console.log(data.data[i].isTrue);
								$scope.rightCount = Number($scope.rightCount)+1;
							}else{
								$scope.wrongCount = Number($scope.wrongCount)+1;
							}
							if(data.data[i].question_id!=null){
								if(data.data[i].question_id.position==1){
									$scope.printTableData(i, 7, data.data);
								}else if(data.data[i].question_id.position==2){
									$scope.printTableData(i, 0, data.data);
								}else if(data.data[i].question_id.position==3){
									$scope.printTableData(i, 1, data.data);
								}else if(data.data[i].question_id.position==4){
									$scope.printTableData(i, 2, data.data);
								}else if(data.data[i].question_id.position==5){
									$scope.printTableData(i, 3, data.data);
								}else if(data.data[i].question_id.position==6){
									$scope.printTableData(i, 4, data.data);
								}else if(data.data[i].question_id.position==7){
									$scope.printTableData(i, 5, data.data);
								}else if(data.data[i].question_id.position==8){
									$scope.printTableData(i, 6, data.data);
								}
							}

							if(data.data.length-1==i){
								$scope.loadChart(Number($scope.rightCount), Number($scope.wrongCount));
							}
						}

						//alert(JSON.stringify($scope.myScores));
						$ionicLoading.hide();
						
					}else{
						$ionicLoading.hide();
						alert("Please Play First.");
						$ionicHistory.nextViewOptions({
							disableBack: true
						});
						$ionicHistory.clearHistory();
						$state.go('nav.home');
					}
				});	
			};

			$scope.printTableData = function(i, k, data){
				if(data[i].isTrue){
					$scope.dataShowOnApp[k].right=Number($scope.dataShowOnApp[k].right)+1;
				}else{
					$scope.dataShowOnApp[k].wrong=Number($scope.dataShowOnApp[k].wrong)+1;
				}
			}

			$scope.MyScores();

			$scope.loadChart = function(val1, val2){

				console.log(val1);
				console.log(val2);
			 	// Chart.js Data
			    $scope.data = [
			      {
			        value: val2,
			        color: '#EA4D4D',
			        highlight: '#EA4D4D',
			        label: 'Wrong'
			      },
			      {
			        value: val1,
			        color:'#70c652',
			        highlight: '#70c652',
			        label: 'Right'
			      }
			      
			    ];

			    // Chart.js Options
			    $scope.options =  {

			      	// Sets the chart to be responsive
			      	responsive: true,

			      	//Boolean - Whether we should show a stroke on each segment
			      	segmentShowStroke : false,

			      	//String - The colour of each segment stroke
			      	segmentStrokeColor : '#fff',

			      	//Number - The width of each segment stroke
			      	segmentStrokeWidth : 1,

			      	//Number - The percentage of the chart that we cut out of the middle
			      	percentageInnerCutout : 80, // This is 0 for Pie charts

			      	//Number - Amount of animation steps
			      	animationSteps : 100,

			      	//String - Animation easing effect
			      	animationEasing : 'easeOutBounce',

			      	//Boolean - Whether we animate the rotation of the Doughnut
			      	animateRotate : true,

			      	showTooltips: false,

			      //Boolean - Whether we animate scaling the Doughnut from the centre
			      //animateScale : false,
			        onAnimationComplete: function () {

			        	this.chart.ctx.beginPath();

			        	console.log(this.chart);

			        	var canvas = document.getElementById("chartData");
					  	var cx = this.chart.width/2;
					  	var cy = this.chart.height/2;


						this.chart.ctx.arc( cx , cy, cy-15, 0, 2*Math.PI);
						this.chart.ctx.fillStyle = '#fff';
						this.chart.ctx.fill();
						this.chart.ctx.lineWidth = 0;
						this.chart.ctx.strokeStyle = '#fff';
						this.chart.ctx.stroke();
						this.chart.ctx.fillStyle = '#fff';

				        //setup the font and center it's position
				        this.chart.ctx.font = 'Normal 45px Montserrat-Regular';
				        this.chart.ctx.fillStyle = $scope.data[1].color;//'#fff';
				        this.chart.ctx.textAlign = 'center';
				        this.chart.ctx.textBaseline = 'middle';
				        //put the pabel together based on the given 'skilled' percentage
				        var valueLabel = $scope.data[1].value;//this.segments[0].value + '%';
				        //find the center point
				        var x = this.chart.canvas.clientWidth  / 2;
				        var y = this.chart.canvas.clientHeight / 2.5;
				        //hack to center different fonts
				        var x_fix = 0;
				        var y_fix = 2;
				        //render the text
				        this.chart.ctx.fillText(valueLabel, x + x_fix, y + y_fix);

				        this.chart.ctx.font = 'Normal 20px Montserrat-Regular';
				        this.chart.ctx.fillStyle = '#5d6e88';
				        this.chart.ctx.textAlign = 'center';
				        this.chart.ctx.textBaseline = 'middle';
				        var Total = Number($scope.data[0].value)+Number($scope.data[1].value);
				        //put the pabel together based on the given 'skilled' percentage
				        var valueLabel = "out of "+ Total;
				        //find the center point
				        var x = this.chart.canvas.clientWidth / 2;
				        var y = this.chart.canvas.clientHeight / 1.5;
				        //hack to center different fonts
				        var x_fix = 0;
				        var y_fix = 2;
				        //render the text
				        this.chart.ctx.fillText(valueLabel, x + x_fix, y + y_fix);
				    }
			    };
			}

			$scope.calculateClass = function(right, wrong){
				var input=Number(right)/(Number(right)+Number(wrong));
				$data = $filter('number')(input * 100, 0);
				if($data<50){
					return 'color_red';
				}else{
					return 'color_green';
				}
			}

		}catch(err){
			alert(err.message);
		}
	});
});

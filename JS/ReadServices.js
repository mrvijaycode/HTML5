var barGraphArray = new Array();
var Webservice="http://192.168.0.111/SSBAQATest/FirmSufficiency.asmx";
//var Webservice = "http://localhost:82/FirmSufficiency.asmx";
//var Webservice="http://firmsufficiency.pg.com/FirmSufficiency.asmx";
var GBU;
var subGBU;
var category;
var LYCum=[];
var TYCum=[];
var Firm=[];
var Weeks=[];
var BOP=[];
var LYShip = [];
var FirmTemp = [];
var LYCumTemp = [];
var BOPTemp = [];
var LYShipTemp = [];
var stretchTemp = [];
var firmUpper=[];
var firmLower=[];
var stretchUpper=[];
var stretchLower=[];
var consUpper=[];
var consLower=[];
var lyconsUpper=[];
var lyconsLower=[];
var stretch=[];
var btnF=[];
var btnL=[];
var topF=[];
var topL=[];
var topcategory=[]
var bottomcategory = []
var btnFinal=new Array();
var topFinal=new Array();
//var lineColor = ['red','green','blue','brown','orange','yellow','black'];
var bottomData = [];
var newTop=[];
var newBtm=[];
var btmCatFinal = new Array();
var gutterLeft = 67;
var gutterRight = 40;
var gutterTop = 45;
var toolTips = Weeks;
var canvas = $('#cvs');
var btmchart=1;
var topchart=1;
var BoptopFinal=[];
var BopbtmFinal=[];
var BopbtmLabel=[];
var BopTopLabel=[];
 
 
function showDiv(){
	$('#progTemplate').show()
	$('#progDisplay').show()
}

function hideDiv(){
	$('#progTemplate').hide()
	$('#progDisplay').hide()
}

$(document).ready(function(){
	
	//debugger
	//$("#mainDDDv").html("Please select GBU");
	//showDiv()

	$.ajax({
              type: "POST",
              url: Webservice+"/GetGBUs",
              data: "{}",
              contentType:"application/json; charset=utf-8",
              dataType: "json",
              success: GBUCallSucceed,
          	  failure: GBUCallFailed
			 
          });
          //Fetch Sub GBU data 
		   
          $("#ddlgbu").change(function () {
			  //debugger;
			  	showDiv()
			    clearVal()
				resetAll();			   
				
				
				RGraph.Reset(canvas);
			  GBU = $('#ddlgbu').val();
			  subGBU='ALL';
			  category='ALL'
			  $("#ddlSubgbus").html("");
              $("#ddlCategory").html("");
			  GraphData();
			  getFooterData();
              
			  $.ajax({
                  type: "POST",
                  url: Webservice+"/GetSubGBUs",
                  data: "{gbu:'" + GBU + "'}",
                  contentType: "application/json; charset=utf-8",
                  dataType: "json",
                  success: SubGBUCallSucceed,
                  failure: SubGBUCallFailed
              });
			  
				hideDiv();
              //Fetch Category data 
             // $("#ddlSubgbus").change(function () {});
			 
              });
			  
			  
		  category =   $('#ddlCategory').val();
		  $('#ddlCategory').change(function(){
			 showDiv(); 
			resetAll();
			clearVal();
			
			RGraph.Reset(canvas);
			category =   $('#ddlCategory').val();
			GraphData();
			getFooterData();
			/*$('#Btm5Items').click(function(){
				if($('#catetop5').is(":visible") )
				});*/
			hideDiv()
		});
		  //if(GBU==null||GBU=='Please Select'){
		 	//GBU='ALL';
			
		 // }
		  if(subGBU==null){subGBU='ALL';}
		  if(category==null){category='ALL'}
			
	 		//GraphData();	 
			//getFooterData();
					 $('#BtmTitle').html('Bottom 5 Categories vs. IYA')
					 $('#TopTitle').html('Top 5 Categories vs. IYA')
			$('#ulow').change(function(){
				var UpLW = $('#ulow option:selected').val();
				selectUPorLW(UpLW);
				});
				$("#bottomMain").show();
				$('#Btm5Items').click(function(){
						debugger
						 $('#catebtm5').addClass('animated bounceOutLeft');
						
						setTimeout(function ()
						{
							RGraph.Reset(document.getElementById("catebtm5"));
			
							if (btmchart == 2) {
								barGraphChart(btnFinal, 'catebtm5', newBtm);
								 $('#BtmTitle').html('Bottom 5 Categories vs. IYA')
								btmchart = 1;
							} else {
								barGraphChart(BopbtmFinal,'catebtm5', BopbtmLabel);
								btmchart = 2;
								$('#BtmTitle').html('Bottom 5 BOP vs Cons (YTD)')
							}
			
							$('#catebtm5').removeClass('bounceOutLeft');
							$('#catebtm5').addClass('bounceInLeft');
						}, 750)
					});
					$('#Top5Items').click(function(){
						
						
						 $('#catetop5').addClass('animated bounceOutLeft');
						
						setTimeout(function ()
						{
							RGraph.Reset(document.getElementById("catetop5"));
			
							if (topchart == 2) {
								 barGraphChart(topFinal, 'catetop5', newTop);
								 $('#TopTitle').html('Top 5 Categories vs. IYA')
								topchart = 1;
							} else {
								barGraphChart(BoptopFinal ,'catetop5', BopTopLabel);
								topchart = 2;
								$('#TopTitle').html('Top 5 BOP vs Cons (YTD)')
							}
			
							$('#catebtm5').removeClass('bounceOutLeft');
							$('#catebtm5').addClass('bounceInLeft');
						}, 750)
					});
					hideDiv();
	
});

function pageloadcontrol(GBU)
{
			    $.ajax({
                  type: "POST",
                  url: Webservice+"/GetSubGBUs",
                  data: "{gbu:'" + GBU + "'}",
                  contentType: "application/json; charset=utf-8",
                  dataType: "json",
                  success: SubGBUCallSucceed,
                  failure: SubGBUCallFailed
              });
			  GraphData();
			  getFooterData();
	}

function getsubgbu()
{
    clearVal();
	resetAll();
	RGraph.Reset(canvas);
	subGBU = $('#ddlSubgbus').val();
	//alert(subGBU)
	$("#ddlCategory").html("");
	category='ALL'
	GraphData();
	getFooterData();
	           $.ajax({
				   type: "POST",
				   url: Webservice+"/GetCategory",
                   data: "{gbu:'"+GBU+"',subGBU:'" + subGBU + "'}",
                   contentType: "application/json; charset=utf-8",
                   dataType: "json",
                   success: CategoryCallSucceed,
                   failure: CategoryCallFailed
                  });
}
function drawlines(LYCum,TYCum,Bop,Firm,stretch,LYShip,Upper,Lower){
	
	//debugger
	var context = document.getElementById("cvs").getContext('2d');
	context.translate(0.5, 0.5);
	RGraph.Reset(canvas);
	var nameofCategory = $("#dvalue").html(); 
	var toolTips = ['']
	
	           var tycumMax = Math.max.apply(null, TYCum)
				var lycumMax = Math.max.apply(null, LYCum)
				var bopMax = Math.max.apply(null, BOP)
				var firmMax = Math.max.apply(null, Firm)
				var stretchMax = Math.max.apply(null, stretch)
				var lyShipMax = Math.max.apply(null, LYShip)
				if(Upper.length>0)
				{
					var firmUpMax = Math.max.apply(null, Upper)
					var firmLowMax = Math.max.apply(null, Lower)
				}
				else
				{
					 var firmUpMax = Math.max.apply(null, TYCum)
					var firmLowMax = Math.max.apply(null, LYCum)
				}
				
				var maxValue =[tycumMax,lycumMax,bopMax,firmMax,stretchMax,firmUpMax,firmLowMax,lyShipMax] 
				var yaxisMax = Math.max.apply(null, maxValue)
				//alert(firmUpper+"maxlimit"+firmUpMax)
				//alert(firmLower+"maxLImit-lower"+firmLowMax)
				//alert("maxvalue:" + bopMax)
				filterTY = TYCum.filter(function(n){ return n != undefined });
				var tycumMin =Math.min.apply(null,filterTY)
				filterLY = LYCum.filter(function(n){ return n != undefined });
				var lycumMin = Math.min.apply(null, filterLY)
				filterbop = BOP.filter(function(n){ return n != undefined });
				var bopMin = Math.min.apply(null, filterbop)
				filterfirm = Firm.filter(function(n){ return n != undefined });
				var firmMin = Math.min.apply(null, filterfirm)
				filterstretch = stretch.filter(function(n){ return n != undefined 
				});
				var stretchMin = Math.min.apply(null, filterstretch)
				filterlyship = LYShip.filter(function(n){ return n != undefined 
					});
				
				if(Upper.length>0)	{
					filterupper = Upper.filter(function(n){ return n != undefined });
					var firmUpMin = Math.min.apply(null, filterupper)
					filterlower = Lower.filter(function(n){ return n != undefined });
					var firmLowMin = Math.min.apply(null, filterlower)
			   	}
				else
				{
					var firmUpMin =Math.min.apply(null,filterTY)
					filterLY = LYCum.filter(function(n){ return n != undefined });
					var firmLowMin = Math.min.apply(null, filterLY)
					filterbop = BOP.filter(function(n){ return n != undefined });
				}
				var lyShipMin = Math.min.apply(null, filterlyship)
				var minValue =[tycumMin,lycumMin,bopMin,firmMin,stretchMin,firmUpMin,firmLowMin,lyShipMin] 
				var yaxisMin = Math.min.apply(null, minValue)
				
				//alert("minmu value"+ yaxisMin)
				//alert("Max VAlue:"+yaxisMax)
				//alert(Upper)
				//alert(Lower)
				
				if (yaxisMin == 'Infinity')
				    yaxisMin = 0;
				
	
	
	
	var line1 = new RGraph.Line('cvs',LYCum)
				//.set('ymax', 35000000)
			 	.set('ymax', yaxisMax)
				.set('ymin',yaxisMin)
				.set('numticks',50)
				.set('numyticks',20)
			    .set('hmargin',5)
                .set('gutter.right', gutterRight)
                .set('gutter.left', gutterLeft)
				.set('scale.zerostart', true)
				 //.set('key.background', 'rgba(255,255,255,0.8)')
				 .set('text.size', 8)
				 .set('text.font', 'Arial')
				  //.set('background.grid.autofit.numhlines', 14)
				.set('labels', Weeks)
                .set('tooltips',toolTips)
                .set('colors', ['red','green','#d908d2','blue','brown','#ffc000','#ffc000','black'])
                .set('key', ['LY Cum','TY Cum', 'Firm','BOP','Stretch','FirmUpper','FirmLower','LY Shipment'])
                .set('key.position', 'gutter')
                .set('key.position.gutter.boxed', false)
                .set('key.position.x', 175)
				.set('gutter.bottom',70)
				.set('text.angle', 90)
				.set('ylabels', false)
				.set('ylabels.count',20)				
                .set('shadow', false)
				.set('tickmarks', 'dot')
                .set('tickmarks', function (obj, data, value, index, x, y, color, prevX, prevY)
                {
                    obj.context.beginPath()
                    obj.context.lineWidth = 2;
                    obj.context.strokeStyle = 'red'
                    obj.context.arc(x, y, 3, 0, RGraph.TWOPI, false)
                    obj.context.fill()
                    obj.context.stroke()
                })
                .set('linewidth',2)
				//.trace2({frames:15})
                .draw();
				
	var line2 = new RGraph.Line('cvs',TYCum)
			 	.set('ymax',yaxisMax)
				.set('ymin',yaxisMin)
					//.set('numticks',50)
					.set('numyticks',20)
				//.set('ymax', 3500000)
			    .set('hmargin',5)
                .set('gutter.right', gutterRight)
                .set('gutter.left', gutterLeft)
				 .set('text.size', 8)
				 .set('text.font', 'Arial')
				// .set('labels', Weeks)
               	.set('tooltips',toolTips)
                .set('colors', ['green'])
                .set('key.position', 'gutter')
                .set('key.position.gutter.boxed', false)
                .set('key.position.x', 165)
				.set('gutter.bottom',70)
				.set('text.angle', 90)
                .set('shadow', false)
				.set('tickmarks', 'dot')
                .set('tickmarks', function (obj, data, value, index, x, y, color, prevX, prevY)
                {
                    obj.context.beginPath()
                    obj.context.lineWidth = 2;
                    obj.context.strokeStyle = '#058384'
                    obj.context.arc(x, y, 2, 0, RGraph.TWOPI, false)
                    obj.context.fill()
                    obj.context.stroke()
                })
                .set('linewidth',2)
				.draw();
				
				
				
				
				var line3 = new RGraph.Line('cvs',Bop)
			 	.set('ymax', yaxisMax)
				.set('ymin',yaxisMin)
					//.set('numticks',50)
					.set('numyticks',20)
				//.set('ymax', 3500000)
			    .set('hmargin',5)
                .set('gutter.right', gutterRight)
                .set('gutter.left', gutterLeft)
				 .set('text.size', 8)
				 .set('text.font', 'Arial')
				// .set('labels', Weeks)
               	.set('tooltips',toolTips)
                .set('colors', ['blue'])
                .set('key.position', 'gutter')
                .set('key.position.gutter.boxed', false)
                .set('key.position.x', 165)
				.set('gutter.bottom',70)
				.set('text.angle', 90)
                .set('shadow', false)
				.set('tickmarks', 'dot')
                .set('tickmarks', function (obj, data, value, index, x, y, color, prevX, prevY)
                {
                    obj.context.beginPath()
                    obj.context.lineWidth = 2;
                    obj.context.strokeStyle = 'blue'
                    obj.context.arc(x, y, 3, 0, RGraph.TWOPI, false)
                    obj.context.fill()
                    obj.context.stroke()
                })
                .set('linewidth',2)
				.draw();
		
				//var line3 = GraphIt(Bop,['blue'],yaxisMax,yaxisMin);
				var line4 = GraphIt(Firm,['#d908d2'],yaxisMax,yaxisMin);
				var line5 = GraphIt(stretch,['brown'],yaxisMax,yaxisMin);
				var line6 = GraphIt(Upper,['#ffc000'],yaxisMax,yaxisMin);
				var line7 = GraphIt(Lower,['#ffc000'],yaxisMax,yaxisMin);
			var line8 = GraphIt(LYShip,['black'],yaxisMax,yaxisMin);
				
				
	
	line1.onclick = function (e, shape){
		$("#bottomMain").show();
		}
	line2.onclick = function (e, shape){

		$("#bottomMain").show();
		
		}
	hideDiv()	
	}


	function GraphIt(Array,color,scale1,scale2){

	var CurrentLine = new RGraph.Line('cvs',Array)
				.set('ymax',scale1)
				.set('ymin',scale2)
				.set('background.grid', false)
                .set('colors', color)
                .set('hmargin', 5)
                .set('gutter.right', gutterRight)
                .set('gutter.left', gutterLeft)
                .set('gutter.top', gutterTop)
                .set('tooltips',toolTips)
                .set('ylabels', false)
				.set('text.size',8)
                .set('noaxes', true)
                .set('shadow', false)
                .draw();

}	



function barGraphChart(Array,ID,labelbar){

	//alert(labelname)
		//debugger	  
		//RGraph.Reset('top5');
		//RGraph.Reset('btm5');
    //resetAll();
    RGraph.Reset('ID');
    var barGraph = new RGraph.Bar(ID,Array)
            .set('colors', ['#1f78b4', '#ff800f'])
			//.set('labels',labelbar)
			.set('text.angle', 45)
			.set('gutter.bottom',70)
			.set('gutter.top',15)
            .set('labels', labelbar)
			 .set('key', ['This year','Last year'])
             .set('key.colors', ['#1f78b4','#ff800f'])
            .set('key.position', 'gutter')
            .set('key.position.gutter.boxed', false)
            .set('strokestyle', 'rgba(0,0,0,0)')
			 .set('gutter.left', 40)
			.set('text.size',7)
			.set('font','12')
	         .grow();
			
			
}
function fillBotomData(CurrentData){
	//debugger
	var table = "";
	
	$('#btmOne').html('');
	table+= '<table width="290" border="0" cellspacing="1" cellpadding="0" bgcolor="#f0d29c">'+
				'<tr><td width="110" height="25" bgcolor="#f8ecd4" ><strong>&nbsp;Category</strong></td>'+
				'<td width="50" align="center" bgcolor="#f8ecd4"  ><strong>CY</strong></td>'
				+'<td width="50" align="center" bgcolor="#f8ecd4" ><strong>LY</strong></td>'
				+'<td width="45" align="center" bgcolor="#f8ecd4" ><strong>Diff</strong></td>'
				+'<td width="35" align="center" bgcolor="#f8ecd4" ><strong>%Chg</strong></td>'
				+'</tr>';
		
	for(var i=0;i<CurrentData.length;i++)
	{
		var ArrayVal = CurrentData[i].split('~');
		//alert(ArrVal[0]);
		table+='<tr><td height="18" bgcolor="#FFFFFF"  style="padding-left:5px;">'+ArrayVal[0]+'</td>';
		table+='<td height="18" align="center" bgcolor="#FFFFFF" style="padding:5px;">'+ArrayVal[1]+'</td>';
		table+='<td height="18" align="center" bgcolor="#FFFFFF" >'+ArrayVal[2]+'</td>';
		table+='<td height="18" align="center" bgcolor="#FFFFFF"  >'+ArrayVal[3]+'</td>';
		table+='<td height="18" align="center" bgcolor="#FFFFFF"  >'+ArrayVal[4]+'</td></tr>';
		
	}
	table+='</table>';
	//alert(table)
	$('#btmOne').html(table);
}
 //show hide lines
 
function showhidefirm(id){
var currentID = $('#'+id).val();

if (currentID == 'off' && id == 'firm')
     Firm = [];
else if (currentID == 'on' && id == 'firm')
    Firm = FirmTemp;
if (currentID == 'off' && id == 'stretch') 
     stretch = [];
else if(currentID == 'on' && id == 'stretch') 
    stretch = stretchTemp;
if (currentID == 'off' && id == 'bop') 
    BOP = [];
else if (currentID == 'on' && id == 'bop')
    BOP = BOPTemp;
if (currentID == 'off' && id == 'lycons') 
    LYCum = [];
else if (currentID == 'on' && id == 'lycons') 
   LYCum = LYCumTemp;
if (currentID == 'off' && id == 'shipment') 
     LYShip = [];
else if(currentID == 'on' && id == 'shipment') 
    LYShip = LYShipTemp;

var UpLW = $('#ulow option:selected').val();
selectUPorLW(UpLW)
	

}
function selectUPorLW(UpLW){
	
	
	if(UpLW=='F'){
		drawlines(LYCum,TYCum,BOP,Firm,stretch,LYShip,firmUpper,firmLower);
	}
	else if(UpLW=='S'){
		alert(stretchUpper+'--'+stretchLower)
		drawlines(LYCum,TYCum,BOP,Firm,stretch,LYShip,stretchUpper,stretchLower);
	}
	else if(UpLW=='C'){
		drawlines(LYCum,TYCum,BOP,Firm,stretch,LYShip,consUpper,consLower);
	}
	else if(UpLW=='L'){
		drawlines(LYCum,TYCum,BOP,Firm,stretch,LYShip,lyconsUpper,lyconsLower);
	}
	else
	drawlines(LYCum,TYCum,BOP,Firm,stretch,LYShip,'','');
				
}
function UpperLimitSucceed(response){
	 $(".myLoader").hide();

	var GraphData=eval('('+ response.d+')')
	getData(GraphData)
	
}
 function upperLimitFail(error){
 alert('Error in fetching Data: ' + error);
 }
 function GBUCallSucceed(response) {
            var gbuinfo = eval('(' + response.d + ')');
			//alert(gbuinfo);
            pareseGBUResults(gbuinfo);
        }
  function GBUCallFailed(error) {

            alert('GBU fetching error: ' + error);
        }
		
		

function SubGBUCallSucceed(response) {
	//debugger;
           
            var subgbuinfo = eval('(' + response.d + ')');
            pareseSubGBUResults(subgbuinfo);
			
			
        }
 function SubGBUCallFailed(error) {

            alert('Sub GBU fetching error: ' + error);

        }
		
function upperLimitFail(){
	alert ('subgbu fetching');
}

        function CategoryCallSucceed(response) {
            // debugger;
            var Categoryinfo = eval('(' + response.d + ')');
            pareseCategoryResults(Categoryinfo);
        }
        function CategoryCallFailed(error) {
            alert('Category fetching error: ' + error);
        }

        function pareseGBUResults(msg) {
            $.each(msg, function () {
                $("#ddlgbu").append($("<option></option>").html(this['GBU']));

            });
			GBU=$("#ddlgbu").val();
			pageloadcontrol(GBU);
			//alert(GBU)
        }

        function pareseSubGBUResults(msg) {
            $.each(msg, function () {

               // $("#ddlSubgbus").empty().append($("<option></option>").val("ALL").html("ALL"));
				
                $("#ddlSubgbus").append($("<option></option>").html(this['SubGBU']));

            });
			$("#ddlCategory").empty().append($("<option></option>").val

("ALL").html("ALL"));
			
        }

        function pareseCategoryResults(msg) {
            $.each(msg, function () {
                //$("#ddlCategory").empty().append($("<option></option>").val("ALL").html("ALL"));
                $("#ddlCategory").append($("<option></option>").html(this['Category']));

            });
			
        }
		
	function getData(Data){
		 $.each(Data,function () {
			 if(this['LYCum']!=0)
			   LYCum.push(Number(this['LYCum']));
			  
			  else
			   LYCum.push(null);
			   
			  if(this['TYCum']!=0){
			   TYCum.push(Number(this['TYCum']));
			  }else {
				  TYCum.push(null);
			  }
			  
			 if(this['Firm']!=0){
			   Firm.push(Number(this['Firm']));
			  }else {
				  Firm.push(null);
			  }
			  if(this['Stretch']!=0){
			   stretch.push(Number(this['Stretch']));
			  }else {
				  stretch.push(null);
			  }
			   
			  if(this['WeekEndDate']!=0){
			    Weeks.push(this['WeekEndDate']);
			  }else {
				  Weeks.push(null);
			  }
			   
			  if(this['BOP']!=0){
			    BOP.push(Number(this['BOP']));
			  }else {
				  BOP.push(null);
			  }
			  
			  if(this['LYShipments']!=0){
			     LYShip.push(Number(this['LYShipments']));
			  }else {
				  LYShip.push(null);
			  }
			    
			if(this['FirmUpperLimit']!=0){
			     firmUpper.push(Number(this['FirmUpperLimit']));
			  }else {
				  firmUpper.push(null);
			  }
			  
			  if(this['FirmLowerLimit']!=0){
			     firmLower.push(Number(this['FirmLowerLimit']));
			  }else {
				  firmUpper.push(null);
			  }
			  
			 if(this['StretchUpperLimit']!=0){
			     stretchUpper.push(Number(this['StretchUpperLimit']));
			  }else {
				  stretchUpper.push(null);
			  }
			   
			   if(this['StretchLowerLimit']!=0){
			      stretchLower.push(Number(this['StretchLowerLimit']));
			  }else {
				  stretchLower.push(null);
			  }
			  	 
				if(this['ConsUpper']!=0){
			     consUpper.push(Number(this['ConsUpper']));
			  }else {
				  consUpper.push(null);
			  }
			   
			   if(this['ConsLower']!=0){
			     consLower.push(Number(this['ConsLower']));
			  }else {
				  consLower.push(null);
			  }
			 /* consUpper.push(Number(this['ConsUpper']));
			  consLower.push(Number(this['ConsLower']));*/
			   if(this['LYConsUpper']!=0){
			     lyconsUpper.push(Number(this['LYConsUpper']));
			  }else {
				  lyconsUpper.push(null);
			  }
			   
			  if(this['LYConsLower']!=0){
			     lyconsLower.push(Number(this['LYConsLower']));
			  }else {
				  lyconsLower.push(null);
			  }
			  FirmTemp = Firm;
			  LYCumTemp = LYCum;
			  BOPTemp = BOP;
				LYShipTemp = LYShip;
				stretchTemp = stretch;
			   
			 
	});
	
		//alert(stretchUpper)  
		//clear values
		var UpLW = $('#ulow option:selected').val();	
		selectUPorLW(UpLW);
		 
		}
function GraphData(){
	showDiv();
		 $.ajax({
              type: "POST",
              url: Webservice+"/GetFirmSufficiency",
              data: "{customer:'WALMART US',segmentationType:'Team',gbu:'"+GBU+"',subGBU:'"+subGBU+"',category:'"+category+"'}",
			  //data: "{customer:'customer1' ,gbu:'ALL', subGBU:'ALL', category:'ALL' }",
              contentType: "application/json; charset=utf-8",
  			  dataType: "json",
              success: UpperLimitSucceed,
			  failure: upperLimitFail
	   });
}

function getFooterData(){
	
	  $.ajax({
              type: "POST",
  url: Webservice+"/GetBottom5Categories",data: "{customer:'WALMART US',segmentationType:'Team',gbu:'"+GBU+"',subGBU:'"+subGBU+"',category:'"+category+"'}",
              //data: "{customer:'customer1',segmentationType:'Global',gbu:'ALL', subGBU:'ALL', category:'ALL' }",
              contentType: "application/json; charset=utf-8",
       		 dataType: "json",
              success: BottomSucceed,
     		 failure: BottomFail
  
          });
		$.ajax({
              type: "POST",
              url: Webservice+"/GetTop5Categories", data: "{customer:'WALMART US',segmentationType:'Team',gbu:'"+GBU+"',subGBU:'"+subGBU+"',category:'"+category+"'}",
              //data: "{customer:'customer1',segmentationType:'Global',gbu:'ALL', subGBU:'ALL', category:'ALL' }",
              contentType: "application/json; charset=utf-8",
       		 dataType: "json",
             success: TopSucceed,
     		 failure: TopFail
  
          });
		  
		  $.ajax({
              type: "POST",
              url: Webservice+"/GetCategoriesDeviation",
			 // data: "{customer:'customer1',segmentationType:'Global',gbu:'"+GBU+"',subGBU:'"+subGBU+"',category:'"+category+"'}",
              data: "{customer:'WALMART US',segmentationType:'Team',gbu:'"+GBU+"',subGBU:'"+subGBU+"',category:'"+category+"' }",
              contentType: "application/json; charset=utf-8",
       		 dataType: "json",
             success: btmCatSucceed,
     		 failure: btmCatFail
  
          });
		  $.ajax({
              type: "POST",
              url: Webservice+"/GetTop5BOP", 
			  data: "{customer:'WALMART US',segmentationType:'Team',gbu:'"+GBU+"',subGBU:'"+subGBU+"',category:'"+category+"'}",
              //data: "{customer:'customer1',segmentationType:'Global',gbu:'ALL', subGBU:'ALL', category:'ALL' }",
              contentType: "application/json; charset=utf-8",
       		 dataType: "json",
             success: BopTopSucceed,
     		 failure: BopTopFail
  
          });
		  $.ajax({
              type: "POST",
              url: Webservice+"/GetBottom5BOP", 
			  data: "{customer:'WALMART US',segmentationType:'Team',gbu:'"+GBU+"',subGBU:'"+subGBU+"',category:'"+category+"'}",
              //data: "{customer:'customer1',segmentationType:'Global',gbu:'ALL', subGBU:'ALL', category:'ALL' }",
              contentType: "application/json; charset=utf-8",
       		 dataType: "json",
             success: BopbtmSucceed,
     		 failure: BopbtmFail
  
          });
		  
		  $.ajax({
              type: "POST",
              url: Webservice+"/GetSummaryDetails",data: "{customer:'WALMART US',segmentationType:'Team',gbu:'"+GBU+"',subGBU:'"+subGBU+"',category:'"+category+"'}",
             // data: "{customer:'WALMART US',segmentationType:'Team',gbu:'ALL', subGBU:'ALL', category:'ALL' }",
              contentType: "application/json; charset=utf-8",
       		 dataType: "json",
             success: sumdetailsSucceed,
     		 failure: sumdetailsFail
  
          });
		  
		  
}
function sumdetailsSucceed(response){
		var btmcatData=eval('('+ response.d+')')
		sumDetails(btmcatData);
		calculateship()
		
	}
		
	function calculateship(){
		$('#addship').keyup(function() {
		   var quantity = $("#addship").val();
		   var iPrice = $("#tycon").val();
		   var total = Number(iPrice)+(iPrice*(quantity)/100) ;
		   $("#expship").val(total);
		  
  		 });
		
	}
function sumdetailsFail(error){
			alert(error)
		}

function sumDetails(sumData){
	var mydesign=""
	$.each(sumData,function(){
	    mydesign += '<p><div  id="details">Date Thru</div><div id="dvalue1" class="resultTxt">' + this['DataThru'] + '</div></p>'
	    mydesign += '<p><div  id="details" >BOP</div><div id="dvalue3" class="resultTxt"> ' 

+ this['BOP'] + '</div></p>'
	    mydesign += '<p><div  id="details">Firm</div><div id="dvalue4" class="resultTxt"> ' + this['Firm'] + '</div></p>' 
		mydesign += '<p><div  id="details">Stretch</div><div id="dvalue5" class="resultTxt"> ' + this['Stretch'] + '</div></p>'
       mydesign+='<p><div  id="details" class="resultTxt">TY Consumption</div><div id="dvalue2" class="resultTxt"><input type="text" id="tycon" class="myInputBox" size=10 readonly="readonly"  value="'+this['TY_Consumption'] +'"/></div></p>'
mydesign+='<p><div  id="details">LY Consumption</div><div id="dvalue6" class="resultTxt">'+this['LY_Consumption'] +'</div></p>'
mydesign+='<p><div  id="details">LY Shipments</div><div id="dvalue7" class="resultTxt">'+this['LY_Shipments'] +'</div></p>'
mydesign+='<p><div  id="details">FYTD Cons</div><div id="dvalue8" class="resultTxt">'+this['FYTD_Cons'] +'</div></p>'
mydesign+='<p><div  id="details">IYA (FYTD Cons)</div><div id="dvalue9" class="resultTxt">'+this['IYA_FYTD_Cons'] +'</div></p>'
mydesign+='<p><div  id="details">IYA (BOP vs LY Ship)</div><div id="dvalue10" class="resultTxt">'+this['UTA_BOPvsLYShip'] +'</div></p>'
mydesign+='<p><div  id="details">LY Ship - Cons</div><div id="dvalue11" class="resultTxt">'+this['LY_ShipminusCons'] +'</div></p>'
mydesign+='<p><div  id="details">Added Ship %</div><div id="dvalue11" class="resultTxt"><input type="text" id="addship" size="10"/></div></p>'
mydesign+='<p><div  id="details">Expected Ship</div><div id="dvalue11"class="resultTxt"><input type="text" id="expship" class="myInputBox"  size="10"/></div></p>'
});
//mydesign+='<p><div  id="details">Added Ship%</div><div id="dvalue12" class="resultTxt">'+this['DataThru'] +'</div></p>'
//mydesign+='<p><div  id="details">Expected Ship</div><div id="dvalue13" class="resultTxt">'+this['DataThru'] +'</div></p>'
$('#dvalue').html(mydesign);
}

//--------------start of data on footer -------------------------
function btmCatSucceed(response){
		var btmcatData=eval('('+ response.d+')')
		btmCat(btmcatData);
	}
function btmCatFail(error){
			alert(error)
		}
		
function btmCat(Data){
	bottomData.length=0;
	$.each(Data,function(i) {
		bottomData.push(this['Category']+'~'+this['TYConsumption']+'~'+this['LYConsumption']+'~'+this['Deviation']+'~'+this['ChangePercentage'])
});

fillBotomData(bottomData);
bottomData.length=0;
//bottomData=[]
}

//-------------End of Data on footer--------------
//--This is for Bottom five categories----------
function BottomSucceed(response){
	var btm5Data=eval('('+ response.d+')')
	//getData(GraphData)
	getfiveItems(btm5Data);
}
function BottomFail(error){
	alert(error);
}
function getfiveItems(Data){
		newBtm=[];
	$.each(Data,function (i) {
			btnF.push(Number(this['LYConsumption']));
			btnL.push(Number(this['TYConsumption']));
			bottomcategory.push(this['Category']);
	});
		
	for(var i=0;i<btnF.length;i++){
		btnFinal[i]=[btnF[i],btnL[i]];
		newBtm[i]=[bottomcategory[i]];
	}
	
	//barGraphChart(btnFinal, 'btm5', bottomcategory);
setTimeout(function () {barGraphChart(btnFinal, 'catebtm5', newBtm)},50);
}

//-----End of bottom five--------------------------
//------start of top five---------------------------
function TopSucceed(response){
	var btmData=eval('('+ response.d+')')
		top5Data(btmData);
	}
	function TopFail(){
		alert(error)
	}
function top5Data(Data){
	//debugger
	 newTop=[];
		//var btnFinal=new Array();
		$.each(Data,function (i) {
			topF.push(Number(this['LYConsumption']));
			topL.push(Number(this['TYConsumption']));
			topcategory.push(this['Category']);
		});
		
		for(var i=0;i<topF.length;i++){
			topFinal[i]=[topF[i],topL[i]];
			newTop[i] = [topcategory[i]];
		}
		//resetAll();
		//barGraphChart(topFinal, 'top5', topcategory);
setTimeout(function () { barGraphChart(topFinal, 'catetop5', newTop); }, 70);
	}
//-------------------End of top 5----------------------------
//-------------------TopBopData------------------------------
function BopTopSucceed(response){
var btmData=eval('('+ response.d+')')
		top5BopData(btmData);
		
}
function BopTopFail(){
alert('Error Found')
}
function top5BopData(Data){
	debugger
	 BopTopLabel=[];
	 var BopF=[];
	 var BopL=[];
	 var BopTop=[];
		//var btnFinal=new Array();
		$.each(Data,function (i) {
			BopF.push(Number(this['TYConsumption']));
			BopL.push(Number(this['BOPQUANTITY']));
			BopTop.push(this['Category']);
		});
		
		for(var i=0;i<BopF.length;i++){
			BoptopFinal[i]=[BopF[i],BopL[i]];
			BopTopLabel[i] = [BopTop[i]];
		}
		//resetAll();
		//barGraphChart(topFinal, 'top5', topcategory);
//setTimeout(function () { barGraphChart(BoptopFinal, 'catetop5', BopTopLabel); }, 250);
	}
//-------------------End of TopBOP------------------------------
//-------------------btmBopData------------------------------
function BopbtmSucceed(response){
	var btmData=eval('('+ response.d+')')
		btm5BopData(btmData);
}
function btm5BopData(Data){
	debugger
	 BopbtmLabel=[];
	 var BopF=[];
	 var BopL=[];
	 var Bopbtm=[];
		//var btnFinal=new Array();
		$.each(Data,function (i) {
			BopF.push(Number(this['TYConsumption']));
			BopL.push(Number(this['BOPQUANTITY']));
			Bopbtm.push(this['Category']);
		});
		
		for(var i=0;i<BopF.length;i++){
			BopbtmFinal[i]=[BopF[i],BopL[i]];
			BopbtmLabel[i] = [Bopbtm[i]];
		}
		//resetAll();
		//barGraphChart(topFinal, 'top5', topcategory);
//setTimeout(function () { barGraphChart(BopbtmFinal, 'catebtm5', BopbtmLabel); }, 150);
	}
function BopbtmFail(){
	alert('Error Found');
	}
//-------------------End of btmBOP------------------------------
//-------------------Clearing All Variables------------------
function clearVal(){
			LYCum.length=0;
			TYCum.length=0;
			Firm.length=0;
			stretch.length=0;
			Weeks.length=0;
			BOP.length=0;
			LYShip.length=0;
			firmUpper.length=0;
			firmLower.length=0;
			stretchUpper.length=0;
			stretchLower.length=0;
			consUpper.length=0;
			consLower.length=0;
			lyconsUpper.length=0;
			lyconsLower.length=0;
			btnF.length=0;
			btnL.length=0;
			topF.length=0;
			topFinal.length=0;
			btnFinal.length=0;
			topL.length=0;
			topcategory.length=0;
			bottomcategory.length = 0;
			  
		}
		  
function resetAll(){

	RGraph.Reset('catetop5');
 	RGraph.Reset('catebtm5');
	RGraph.Reset('Boptop5');
 	RGraph.Reset('Bopbtm5');

	$('#btmThree canvas').each(function(idx, item) {
        var context = item.getContext("2d");
        context.clearRect(0, 0, item.width, item.height);
        context.beginPath();        
    });
	
	$('#btmTwo canvas').each(function(idx, item) {
        var context = item.getContext("2d");
        context.clearRect(0, 0, item.width, item.height);
        context.beginPath();        
    });
}
//--------------------------End of clearing Variables------------------

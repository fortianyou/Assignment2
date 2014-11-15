var width=900,height=650;
var color=d3.scale.category20();
var force=d3.layout.force().charge(-150).linkDistance(50).size([width,height]);
var svg=d3.select("body").append("svg").attr("width",width).attr("height",height);

d3.json("sushe.json",function(error,dataSet){
//	�����dataSet.nodes��dataSetpaths�ֱ��������еĽڵ��·������Դ������Ĭ��Ϊ�գ���Ҫ���߾����jason�������ġ�����������д��ʱ��Ҫ��һ��
	force.nodes(dataSet.nodes).links(dataSet.links).start();
	
	//����ڵ���ɫ��ȡֵ����Ϊd.group,��ȻҲ�������ͼƬ�����ݣ����߾����json���ݽ����޸ģ���д�뾶�Ĵ�С������Ĭ����д15
	var node=svg.selectAll(".node").data(dataSet.nodes).enter().append("circle").attr("class","node").attr("r",15).style("fill",function(d){return color(d.group);}).call(force.drag);
	//�����·��������ʽ��������d.target�����棬��Ȼ������Ҳ�������ߵȵȣ�����Ĭ��Ϊֱ�ߣ������ȡֵҪ����json���ݽ����޸�
	var link =svg.selectAll(".link").data(dataSet.links).enter().append("line").attr("class","link").style("stroke-width",function(d){return Math.sqrt(d.value);}).style("stroke",function(d){return color(d.value);});
	//�����d.name�ǽڵ�node���nameֵ��Ҫ���忴���ݣ����jason������û�У�Ҫ�޸�
	var text=svg.selectAll(".text").data(dataSet.nodes).enter().append("text").text(function(d){return d.name;}).style("fill",function(d){return color(d.group);}).style("font-size",function(d){return d.group;}).call(force.drag);
	
	force.on("tick",function(){
			
			link.attr("x1",function(d){return d.source.x;})
			    .attr("y1",function(d){return d.source.y;})
				.attr("x2",function(d){return d.target.x;})
				.attr("y2",function(d){return d.target.y;});
			
			node.attr("cx",function(d){return d.x;})
			    .attr("cy",function(d){return d.y;});

            text.attr("x",function(d){return d.x;})
			    .attr("y",function(d){return d.y;});
							 
			});


			
	});
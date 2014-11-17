// JavaScript source code
var w = 1024;
var h = 800;

//
var dataset;
d3.json("json/Force.json", function (error, data) {//���json����
    if (error) return console.warn(error);
    dataset = data;

    var force = d3.layout.force()
        .nodes(dataset.nodes)
        .links(dataset.edges)
        .size([w, h])
        .linkDistance([300])
        .charge([-100])
        .start();

    var colors = d3.scale.category10();//�������������ߺͰ���4����ɫ�������Χ

    //����SVG
    var svg = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h)
        .style("fill", "green");


    //�� svg �в��� line
    var edges = svg.selectAll("line")
        .data(dataset.edges)
        .enter()
        .append("line")
        .style("stroke", function (d) {//	�����ߵ���ɫ
            return colors(d.color);
        })
        .style("stroke-width", 1);


    //�� svg �в��� circle
    var nodes = svg.selectAll("circle")
        .data(dataset.nodes)
        .enter()
        .append("circle")
        .attr("r", function (d) {
            return Math.log(d.weight) * 3;
        })
        .style("fill", function (d, i) {
            return colors(d.weight * d.weight * d.weight);
        })
        .on("mouseover", function (d) {
            highlight(d, this);
        })
        .on("mouseout", mouseout)
        .call(force.drag);

    nodes.attr("class", function (d) {
        return "circles" + " cid" + d.index;
    });
    nodes.append("title").text(function (d) {//��ʾid
        return dataset.nodes[d.index].id;
    });


    force.on("tick", function () {
        edges.attr("x1", function (d) {
            return d.source.x;
        })
            .attr("y1", function (d) {
                return d.source.y;
            })
            .attr("x2", function (d) {
                return d.target.x;
            })
            .attr("y2", function (d) {
                return d.target.y;
            })
            .attr("class", function (d) {
                return "links" + " eid" + d.source.index + " eid" + d.target.index
            });
        nodes.attr("cx", function (d) {
            return d.x;
        })
            .attr("cy", function (d) {
                return d.y;
            });
    })


    //������ʾ
    function highlight(d, node) {
        var index = d.index;
        d3.select(node).style("fill", "#FFFF00");
        for (var m = 0; m < dataset.edges.length; m++) {
            if (dataset.edges[m].source.index == index || dataset.edges[m].target.index == index) {
                svg.selectAll(".eid" + index).style("stroke", "#FFFFCC")
                    .style("stroke-width", 2);
                if (dataset.edges[m].source.index == index) {
                    svg.select(".cid" + dataset.edges[m].target.index).style("fill", "#FFFF00");
                }
                else {
                    svg.select(".cid" + dataset.edges[m].source.index).style("fill", "#FFFF00");
                }
            }
        }
    }


    //����뿪
    function mouseout() {
        d3.select(this).select("circle").transition()
        .duration(750)
        .attr("r", function (d) {  //�ָ�Բ��뾶                      
            return Math.log(d.weight) * 3;
        })

        svg.selectAll("circle")
        .style("fill", function (d) {
            return colors(d.weight * d.weight * d.weight);
        });
        svg.selectAll("line")
        .style("stroke", function (d) {//	�����ߵ���ɫ
            return colors(d.color);
        })
    }

  

});
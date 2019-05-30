let svgGreen = d3.select("#traits_green"),
    widthG = +svgGreen.attr("width"),
    heightG = +svgGreen.attr("height");

let deltaG = 0.000000000000000000000001,
    iG = 0,
    nG = 200, // Total number of random points.
    kG = 1; // Number of points to replace per frame.

let rxG = d3.randomNormal(widthG / 1, 2000),
    ryG = d3.randomNormal(heightG / 16, 2000),
    pointsG = d3.range(nG).map(function() { return [rxG(), ryG()]; });

let colorG = d3.scaleSequential(d3.interpolateLab("white", "#33E0B2"))
    .domain([0, 12]);

let hexbinG = d3.hexbin()
    .radius(12.5)
    .extent([[0, 0], [widthG, heightG]]);

let hexagonG = svgGreen.selectAll("path")
  .data(hexbinG(pointsG))
  .enter().append("path")
    .attr("d", hexbinG.hexagon(13.5))
    .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
    .attr("fill", function(d) { return colorG(d.length); });

d3.timer(function(elapsed) {
  rxG = d3.randomNormal(width / 500 + 80 * Math.cos(elapsed * deltaG), 20),
  ryG = d3.randomNormal(height / 6 + 80 * Math.sin(elapsed * deltaG), 20);
  for (let j = 0; j < kG; ++j, iG = (iG + 1) % nG) pointsG[iG][0] = rxG(), pointsG[iG][1] = ryG();

  hexagonG = hexagonG
    .data(hexbinG(pointsG), function(d) { return d.x + "," + d.y; });

  hexagonG.exit().remove();

  hexagonG = hexagonG.enter().append("path")
      .attr("d", hexbinG.hexagon(12))
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
    .merge(hexagonG)
      .attr("fill", function(d) { return colorG(d.length); });
});

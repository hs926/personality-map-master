svgYellow = d3.select("#traits_blue"),
    widthY = +svgYellow.attr("width"),
    heightY = +svgYellow.attr("height");

let deltaY = 0.000000000000000000000001,
    iY = 0,
    nY = 200, // Total number of random points.
    kY = 1; // Number of points to replace per frame.

let rxY = d3.randomNormal(widthY / 1, 2000),
    ryY = d3.randomNormal(heightY / 16, 2000),
    pointsY = d3.range(nY).map(function() { return [rxY(), ryY()]; });

let colorY = d3.scaleSequential(d3.interpolateLab("white", "steelblue"))
    .domain([0, 12]);

let hexbinY = d3.hexbin()
    .radius(12.5)
    .extent([[0, 0], [widthY, heightY]]);

let hexagonY = svgYellow.selectAll("path")
  .data(hexbinY(pointsY))
  .enter().append("path")
    .attr("d", hexbinY.hexagon(13.5))
    .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
    .attr("fill", function(d) { return colorY(d.length); });

d3.timer(function(elapsed) {
  rxY = d3.randomNormal(width / 500 + 80 * Math.cos(elapsed * deltaY), 20),
  ryY = d3.randomNormal(height / 6 + 80 * Math.sin(elapsed * deltaY), 20);
  for (let j = 0; j < kY; ++j, iY = (iY + 1) % nY) pointsY[iY][0] = rxY(), pointsY[iY][1] = ryY();

  hexagonY = hexagonY
    .data(hexbinY(pointsY), function(d) { return d.x + "," + d.y; });

  hexagonY.exit().remove();

  hexagonY = hexagonY.enter().append("path")
      .attr("d", hexbinY.hexagon(12))
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
    .merge(hexagonY)
      .attr("fill", function(d) { return colorY(d.length); });
});

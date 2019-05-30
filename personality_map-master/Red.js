 svgRed = d3.select("#traits_red"),
    widthR = +svgRed.attr("width"),
    heightR = +svgRed.attr("height");

let deltaR = 0.000000000000000000000001,
    iR = 0,
    nR = 200, // Total number of random points.
    kR = 40; // Number of points to replace per frame.

let rxR = d3.randomNormal(widthR / 1, 2000),
    ryR = d3.randomNormal(heightR / 16, 2000),
    pointsR = d3.range(nR).map(function() { return [rxR(), ryR()]; });

let colorR = d3.scaleSequential(d3.interpolateLab("white", "red"))
    .domain([0, 18]);

let hexbinR = d3.hexbin()
    .radius(12.5)
    .extent([[0, 0], [widthR, heightR]]);

let hexagonR = svgRed.selectAll("path")
  .data(hexbinR(pointsR))
  .enter().append("path")
    .attr("d", hexbinR.hexagon(13.5))
    .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
    .attr("fill", function(d) { return colorR(d.length); });

d3.timer(function(elapsed) {
  rxR = d3.randomNormal(width / 500 + 80 * Math.cos(elapsed * deltaR), 20),
  ryR = d3.randomNormal(height / 6 + 80 * Math.sin(elapsed * deltaR), 20);
  for (let j = 0; j < kR; ++j, iR = (iR + 1) % nR) pointsR[iR][0] = rxR(), pointsR[iR][1] = ryR();

  hexagonR = hexagonR
    .data(hexbinR(pointsR), function(d) { return d.x + "," + d.y; });

  hexagonR.exit().remove();

  hexagonR = hexagonR.enter().append("path")
      .attr("d", hexbinR.hexagon(12))
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
    .merge(hexagonR)
      .attr("fill", function(d) { return colorR(d.length); });
});

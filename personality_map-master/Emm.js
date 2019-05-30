let svgEmm = d3.select("#traits_emm"),
    widthN = +svgEmm.attr("widthN"),
    heightN = +svgEmm.attr("height");

let deltaN = 0.000000000000000000000001,
    iN = 0,
    nN = 200, // Total number of random points.
    kN = 200; // Number of points to replace per frame.

let rxN = d3.randomNormal(widthN / 1, 2000),
    ryN = d3.randomNormal(heightN / 16, 2000),
    pointsN = d3.range(nN).map(function() { return [rxN(), ryN()]; });

let colorN = d3.scaleSequential(d3.interpolateLab("yellow", "#A747BB"))
    .domain([0, 18]);

let hexbinN = d3.hexbin()
    .radius(12.5)
    .extent([[0, 0], [widthN, heightN]]);

let hexagonN = svgEmm.selectAll("path")
  .data(hexbinN(pointsN))
  .enter().append("path")
    .attr("d", hexbinN.hexagon(13.5))
    .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
    .attr("fill", function(d) { return colorN(d.length); });

d3.timer(function(elapsed) {
  rxN = d3.randomNormal(width / 500 + 80 * Math.cos(elapsed * deltaN), 20),
  ryN = d3.randomNormal(height / 6 + 80 * Math.sin(elapsed * deltaN), 20);
  for (let j = 0; j < kN; ++j, iN = (iN + 1) % nN) pointsN[iN][0] = rxN(), pointsN[iN][1] = ryN();

  hexagonN = hexagonN
    .data(hexbinN(pointsN), function(d) { return d.x + "," + d.y; });

  hexagonN.exit().remove();

  hexagonN = hexagonN.enter().append("path")
      .attr("d", hexbinN.hexagon(12))
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
    .merge(hexagonN)
      .attr("fill", function(d) { return colorN(d.length); });
});

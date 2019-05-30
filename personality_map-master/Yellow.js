svgY = d3.select("#traits_yellow"),
    widthy = +svgY.attr("width"),
    heighty = +svgY.attr("height");

let deltay = 0.000000000000000000000001,
    iy = 0,
    ny = 200, // Total number of random points.
    ky = 100; // Number of points to replace per frame.

let rx_y = d3.randomNormal(widthy / 1, 2000),
    ry_y = d3.randomNormal(heighty / 16, 2000),
    points_y = d3.range(ny).map(function() { return [rx_y(), ry_y()]; });

let colory = d3.scaleSequential(d3.interpolateRgb("white","#FFDD02"))
    .domain([0, 24]);

// let colory = d3.scaleSequential(d3.interpolateLab("white","yellow"))
//     .domain([0, 12]);//"#F69800"

let hexbin_y = d3.hexbin()
    .radius(12.5)
    .extent([[0, 0], [widthy, heighty]]);

let hexagon_y = svgY.selectAll("path")
  .data(hexbin_y(points_y))
  .enter().append("path")
    .attr("d", hexbin_y.hexagon(13.5))
    .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
    .attr("fill", function(d) { return colory(d.length); });

d3.timer(function(elapsed) {
  rx_y = d3.randomNormal(width / 500 + 80 * Math.cos(elapsed * deltay), 20),
  ry_y = d3.randomNormal(height / 6 + 80 * Math.sin(elapsed * deltay), 20);
  for (let j = 0; j < ky; ++j, iy = (iy + 1) % ny) points_y[iy][0] = rx_y(), points_y[iy][1] = ry_y();

  hexagon_y = hexagon_y
    .data(hexbin_y(points_y), function(d) { return d.x + "," + d.y; });

  hexagon_y.exit().remove();

  hexagon_y = hexagon_y.enter().append("path")
      .attr("d", hexbin_y.hexagon(12))
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
    .merge(hexagon_y)
      .attr("fill", function(d) { return colory(d.length); });
});

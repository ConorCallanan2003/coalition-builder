/*

Credit to Daniel Kao (https://github.com/dkaoster) for the original code! Had to make a few changes and only needed one fully so easier to just copy it into the repo.

*/

/**
 *  ___ ____    ___          _ _                    _       ___ _             _
 * |   \__ /   | _ \__ _ _ _| (_)__ _ _ __  ___ _ _| |_    / __| |_  __ _ _ _| |_
 * | |) |_ \   |  _/ _` | '_| | / _` | '  \/ -_) ' \  _|  | (__| ' \/ _` | '_|  _|
 * |___/___/   |_| \__,_|_| |_|_\__,_|_|_|_\___|_||_\__|   \___|_||_\__,_|_|  \__|
 *
 * A d3 plugin for making semi-circle parliament charts.
 */

const generatePartial = ({
  seats,
  startRad,
  endRad,
  seatRadius,
  rowHeight,
  graphicHeight,
  sectionGap,
}) => {
  // Calculate the radius of the graph, because we don't want the poitns to extend
  // beyond the width of the graphic
  const graphRadius = graphicHeight - seatRadius;

  // Final Array
  let points = [];

  // Which row we are currently drawing
  let currentRow = 0;

  // Create all the points
  while (points.length < seats) {
    // The radius of the row we are currently drawing
    const currentRowRadius = graphRadius - rowHeight * currentRow;

    // We need to also justify for the gap of the section, which radians value varies per row
    const currentRowGapRad = Math.atan(
      (seatRadius + sectionGap / 2) / currentRowRadius
    );
    const currentRowStartRad = startRad + currentRowGapRad;
    const currentRowEndRad = endRad - currentRowGapRad;

    // If our data doesn't fit inside the row or the graph, we just stop
    if (currentRowEndRad <= currentRowStartRad || currentRowRadius <= 0) break;

    // Find the minimum size step given the radius
    const currRadStep = Math.atan((2.5 * seatRadius) / currentRowRadius);

    // Find how many seats are in this row
    const rowSeats = Math.min(
      Math.floor((currentRowEndRad - currentRowStartRad) / currRadStep),
      seats - points.length - 1
    );

    // Get adjusted step size so that things are justified evenly
    // edge case if there is only one seat in this row
    const roundedRadStep = rowSeats
      ? (currentRowEndRad - currentRowStartRad) / rowSeats
      : 0;

    // Add all the seats in this row
    for (let currSeat = 0; currSeat <= rowSeats; currSeat += 1) {
      // Get the current angle of the seat we are drawing
      const currentAngle = rowSeats
        ? currSeat * roundedRadStep + currentRowStartRad
        : // edge case if there is only one seat in this row, we put it in the middle
          (currentRowStartRad + currentRowEndRad) / 2;

      // convert the angle to x y coordinates
      points = points.concat([
        {
          x:
            Math.cos(currentAngle) * (graphRadius - rowHeight * currentRow) +
            graphicHeight,
          // flip the y coordinates
          y:
            graphicHeight -
            (Math.sin(currentAngle) * (graphRadius - rowHeight * currentRow) +
              seatRadius) +
            // Add seatRadius and any sectionGap / 4 so that we vertically center
            seatRadius +
            sectionGap / 4,
          angle: currentAngle,
        },
      ]);
    }
    currentRow += 1;
  }
  return points;
};

var getParliamentPoints = (
  totalPoints,
  { sections, sectionGap, seatRadius, rowHeight },
  graphicWidth
) => {
  // Calculate the graphic height
  const graphicHeight = graphicWidth / 2;

  // Get the number of final sections
  const finalSections = Math.min(totalPoints, sections);

  // Angle step per section in radians
  const radStep = Math.PI / finalSections;

  // Divide the seats evenly among the sections, while also calculating
  // the start radians and end radians.
  const sectionObjs = Array(finalSections)
    // First evenly divide the seats into each section
    .fill({ seats: Math.floor(totalPoints / finalSections) })
    // add the start and end radians
    .map((a, i) => ({
      ...a,
      startRad: i * radStep,
      endRad: (i + 1) * radStep,
    }));

  // There are leftover seats that we need to fit into sections
  // Calculate how many there are
  let leftoverSeats = totalPoints % finalSections;

  // If leftover seats is 0, we can skip this entire section
  if (leftoverSeats !== 0) {
    // We want to add the leftover seats to the center section first, then move outward
    // We do this by separating the sections into two arrays, left and right
    const right = Array(finalSections)
      .fill(null)
      .map((c, i) => i);
    const left = right.splice(0, Math.floor(finalSections / 2)).reverse();

    // Add the seats
    while (leftoverSeats > 0) {
      // Whichever array is longer, we pop from that array and add to that section first
      if (left.length >= right.length) sectionObjs[left.shift()].seats += 1;
      else sectionObjs[right.shift()].seats += 1;

      // decrement leftoverSeats by one
      leftoverSeats -= 1;
    }
  }

  // Call the section partial generation tool for each section
  return (
    sectionObjs
      .map((s) =>
        generatePartial({
          ...s,
          seatRadius,
          rowHeight,
          graphicHeight,
          sectionGap,
        })
      )
      // flatten the array
      .reduce((acc, val) => [...acc, ...val], [])
      // sort by angle
      .sort((a, b) => b.angle - a.angle)
      // remove angle from returned dataset
      .map((r) => {
        const { angle, ...rest } = r;
        return rest;
      })
  );
};

export default (data = [], width = 0) => {
  // Dimensions of the graphic
  let graphicWidth = parseFloat(width);

  // clean out any x and y values provided in data objects.
  let rawData = data.map(({ x, y, ...restProps }) => restProps);

  // visual options
  const options = {
    sections: 4, // Number of sections to divide the half circle into
    sectionGap: 60, // The gap of the aisle between sections
    seatRadius: 12, // The radius of each seat
    rowHeight: 42, // The height of each row
  };

  // Whether we should draw the debug lines or not
  let debug = false;

  // //////////////////////////////////////////////////////////////////////////
  // Selection call
  //
  // This function gets called on instances such as:
  //    d3.select('g').call(parliamentChart())
  const parliamentChart = (selection) => {
    if (graphicWidth === 0) {
      // Sets the graphicWidth based on our selected container
      graphicWidth = selection.node().getBoundingClientRect().width;
    }

    // Get the processed data (filter for entries that have x and y locations)
    const processedData = parliamentChart.data().filter((r) => r.x && r.y);

    // Remove existing chart
    selection.select("g.parliament-chart").remove();

    // Add new chart
    const innerSelection = selection
      .append("g")
      .attr("class", "parliament-chart");

    return innerSelection
      .selectAll("circle")
      .data(processedData)
      .enter()
      .insert("circle")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("r", options.seatRadius)
      .attr("fill", (d) => {
        const color = d.color;
        const colorArray = color.split(")").concat([", 0.2)"]);
        const rgbaColor = colorArray.join("");
        return d.selected ? d.color : rgbaColor;
      });
  };

  // //////////////////////////////////////////////////////////////////////////
  // Getters and Setters

  // Sets the width and the height of the graphic
  parliamentChart.width = (w) => {
    // eslint-disable-next-line no-restricted-globals
    if (!isNaN(w)) {
      // parse the width
      graphicWidth = parseFloat(w);
    }
    return parliamentChart;
  };

  // Create getters and setters for sections, sectionGap, seatRadius, and rowHeight
  Object.keys(options).forEach((attr) => {
    parliamentChart[attr] = (s) => {
      // eslint-disable-next-line no-restricted-globals
      if (!isNaN(s)) {
        options[attr] = parseInt(s, 10);
        return parliamentChart;
      }
      return options[attr];
    };
  });

  // enable / disable debug mode
  parliamentChart.debug = (b) => {
    debug = !!b;
    return parliamentChart;
  };

  // //////////////////////////////////////////////////////////////////////////
  // Data Processing
  //
  // Gets the data processed data with x and y coordinates or sets
  // the raw data.
  parliamentChart.data = (d) => {
    // If an argument with new data is provided
    if (d) {
      // clean out any x and y values provided in data objects.
      rawData = d.map(({ x, y, ...restProps }) => restProps);
      return parliamentChart;
    }

    // If width is not set, don't calculate this instance
    if (graphicWidth <= 0 || rawData.length <= 0) return rawData;

    // Check if we have already run this instance
    if (rawData.every((r) => r.x && r.y)) return rawData;

    // The number of points we need to fit
    const totalPoints = rawData.length;

    // The locations of all the points
    const locations = getParliamentPoints(totalPoints, options, graphicWidth);

    // Add locations to the rawData object
    locations.forEach(
      (coords, i) => (rawData[i] = { ...rawData[i], ...coords })
    );

    // return the data
    return rawData;
  };

  // Instead of passing in an array of every single point, we pass in an array of objects
  // that each have a key `seats` that specifies the number of seats. This function can only
  // set, not get.
  parliamentChart.aggregatedData = (d) => {
    rawData = d.reduce((acc, val) => {
      const { seats = 0, x, y, ...restProps } = val;
      return [...acc, ...Array(seats).fill(restProps)];
    }, []);

    return parliamentChart;
  };

  return parliamentChart;
};

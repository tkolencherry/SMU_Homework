// The code for the chart is wrapped inside a function that
// automatically resizes the chart
function makeResponsive() {

    // if the SVG area isn't empty when the browser loads,
    // remove it and replace it with a resized version of the chart
    var svgArea = d3.select("body").select("svg");

    // clear svg is not empty
    if (!svgArea.empty()) {
        svgArea.remove();
    }

    // SVG wrapper dimensions are determined by the current width and
    // height of the browser window.
    var svgWidth = window.innerWidth;
    var svgHeight = window.innerHeight;

    var margin = {
        top: 20,
        right: 40,
        bottom: 80,
        left: 100
    };

    var height = svgHeight - margin.top - margin.bottom;
    var width = svgWidth - margin.left - margin.right;

    // Append SVG element
    var svg = d3
        .select("#scatter")
        .append("svg")
        .attr("height", svgHeight)
        .attr("width", svgWidth);

    // Append group element
    var chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Initial Axes
    var xAxisActive = "poverty";
    var yAxisActive = "healthcare";

    // FUNCTIONS 
    // Generate Scales 
    // f(x): Generate the X Scale - Given the data and the chosen value for the X-axis...
    function createScaleX(indicatorData, xAxisActive) {
        // ...create a linear scale with a domain as a multiple of the minimum and maximum values of the data 
        var xScale = d3.scaleLinear()
            // Put. The. Brackets. In. The. Domain. 
            .domain([d3.min(indicatorData, d => d[xAxisActive]) * 0.8, d3.max(indicatorData, d => d[xAxisActive]) * 1.2])
            .range([0, width]);
        return xScale;
    }

    // f(x): Generate the Y Scale - Given the data and the chosen value for the Y-axis...
    function createScaleY(indicatorData, yAxisActive) {
        // ...create linear scale. Note that domain starts at zero bc there are no negative values in dataset
        var yScale = d3.scaleLinear()
            .domain([0, d3.max(indicatorData, d => d[yAxisActive])])
            .range([height, 0]);

        return yScale;
    }

    // f(x): Create X Axis given the new scale and the new x axis
    function createAxisX(xScaleNew, xAxis) {
        var bottomAxis = d3.axisBottom(xScaleNew);
        xAxis.transition()
            // the .duration function will cha-cha slide that axis over 
            .duration(1000)
            .call(bottomAxis);

        return xAxis;

    }
    // f(x): Create Y Axis given the new scale and the new x axis
    function createAxisY(yScaleNew, yAxis) {
        var leftAxis = d3.axisLeft(yScaleNew);
        yAxis.transition()
            .duration(1000)
            .call(leftAxis);

        return yAxis;

    }

    // f(x): Grab the X-Coordinate for the circles 
    function createCircles_XCoord(circlesGroup, xScaleNew, xAxisActive) {
        circlesGroup.transition()
            .duration(1000)
            .attr("cx", d => xScaleNew(d[xAxisActive]));
        return circlesGroup;
    }

    // f(x): Grab the Y-Coordinate for the circles 
    function createCircles_YCoord(circlesGroup, yScaleNew, yAxisActive) {
        circlesGroup.transition()
            .duration(1000)
            .attr("cy", d => yScaleNew(d[yAxisActive]));
        return circlesGroup;
    }

    // f(x): Grab the X-Coordinate for the state labels 
    function stateLabels_XCoord(textGroup, xScaleNew, xAxisActive) {

        textGroup.transition()
            .duration(1500)
            .attr("dx", d => xScaleNew(d[xAxisActive]))

        return textGroup;
    }

    // f(x): Grab the Y-Coordinate for the state labels 
    function stateLabels_YCoord(textGroup, yScaleNew, xAxisActive) {

        textGroup.transition()
            .duration(1500)
            .attr("dy", d => yScaleNew(d[xAxisActive]));

        return textGroup;
    }

    // f(x): Update the Tooltip

    function updateTooltip(xAxisActive, yAxisActive, circlesGroup) {
        var xlabel;

        if (xAxisActive === "poverty") {
            xlabel = "Poverty Rate %:";
        } else if (xAxisActive === "age") {
            xlabel = "Median Age";
        } else {
            xlabel = "Median Income ($)"
        };

        var ylabel;
        if (yAxisActive === "healthcare") {
            ylabel = "Lack of Access to Healthcare (% of Population)";
        } else if (yAxisActive === "obesity") {
            ylabel = "Obesity Rate (%)";
        } else {
            ylabel = "Smoker Rate (%)"
        };

        var toolTip = d3.tip()
            .attr("class", "d3-tip")
            // .offset([80, -60])
            .html(function(d) {
                return (`<h5>${d.state}</h5><hr>  <p> ${xlabel} : ${d[xAxisActive]} <p> <p> ${ylabel} : ${d[yAxisActive]} <p>`)
            });

        circlesGroup.call(toolTip);

        circlesGroup.on("mouseover", function(data) {
                toolTip.show(data, this);
                toolTip.style("top", (d3.mouse(this)[1]) + (width / 8) + "px")
                    .style("left", (d3.mouse(this)[0]) + (width / 8) + "px")

                d3.select(this)
                    .transition()
                    .duration(1000)
                    .attr("fill", "pink")
                    .attr("r", "45");
            })
            // onmouseout event
            .on("mouseout", function(data, index) {
                toolTip.hide(data);

                d3.select(this)
                    .transition()
                    .duration(1000)
                    .attr("fill", "gold")
                    .attr("r", "19");
            });

        return circlesGroup;
    }

    // f(x): Update text within tooltip
    function updateToolTip_Text(xAxisActive, yAxisActive, textGroup) {

        var xlabel;

        // Change the label depending on the active axis
        if (xAxisActive === "poverty") {
            xlabel = "Poverty Rate %:";
        } else if (xAxisActive === "age") {
            xlabel = "Median Age";
        } else {
            xlabel = "Median Income ($)"
        };

        var ylabel;
        if (yAxisActive === "healthcare") {
            ylabel = "Lack of Access to Healthcare (% of Population)";
        } else if (yAxisActive === "obesity") {
            ylabel = "Obesity Rate (%)";
        } else {
            ylabel = "Smoker Rate (%)"
        };

        // creeate the tooltip
        var toolTip = d3.tip()
            .attr("class", "d3-tip")
            .html(function(d) {
                return (`<h5>${d.state}</h5><hr>  <p> ${xlabel} : ${d[xAxisActive]} <p><p> ${ylabel} : ${d[yAxisActive]} <p>`);
            });

        textGroup.call(toolTip);

        // Show and hide the tooltip on hover
        textGroup.on("mouseover", function(data) {
                toolTip.show(data, this);
                toolTip.style("top", (d3.mouse(this)[1]) + (width / 8) + "px")
                    .style("left", (d3.mouse(this)[0]) + (width / 8) + "px")

                d3.select(this)
                    .attr("cursor", "default");

                d3.select(this)
                    .transition()
                    .duration(1000)
                    .attr("fill", "black")
                    .attr("font-size", "12px");
            })
            // onmouseout event
            .on("mouseout", function(data, index) {
                toolTip.hide(data);

                d3.select(this)
                    .transition()
                    .duration(1000)
                    .attr("fill", "black")
                    .attr("font-size", "12px");
            });

        return textGroup;
    }


    // INITIALIZE PAGE 
    // Load CSV
    d3.csv("assets/data/data.csv").then(function(indicatorData) {

        // console.log(indicatorData);
        // parse data

        indicatorData.forEach(function(indicator) {
            indicator.id = +indicator.id;
            indicator.poverty = +indicator.poverty;
            indicator.age = +indicator.age;
            indicator.income = +indicator.income;
            indicator.healthcare = +indicator.healthcare;
            indicator.obesity = +indicator.obesity;
            indicator.smokes = +indicator.smokes;

            // This was just in case I wanted to be extra, but I didn't. 
            indicator.healthcareLow = +indicator.healthcareLow;
            indicator.healthcareHigh = +indicator.healthcareHigh;
            indicator.obesityLow = +indicator.obesityLow;
            indicator.obesityHigh = +indicator.obesityHigh;
            indicator.smokesLow = +indicator.smokesLow;
            indicator.smokesHigh = +indicator.smokesHigh;
        });

        // CREATE

        // Scales
        var xScale = createScaleX(indicatorData, xAxisActive);
        var yScale = createScaleY(indicatorData, yAxisActive);

        // Axes
        var xAxisNew = d3.axisBottom(xScale);
        var yAxisNew = d3.axisLeft(yScale);

        // X-Axis Labels
        var xLabelsGroup = chartGroup.append("g")
            .attr("transform", `translate(${width / 2}, ${height + 20})`);

        // Y-Axis Labels
        var yLabelsGroup = chartGroup.append("g")
            .attr("transform", "rotate(-90)");

        // Circles
        var emptyCirclesGroup = chartGroup.selectAll("circle")
            .data(indicatorData)
            .enter();

        // State Labels - Container for Text
        var stateLabels = chartGroup.selectAll(null)
            .data(indicatorData)
            .enter();

        // APPEND
        // Axes
        var xAxis = chartGroup.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(xAxisNew);

        var yAxis = chartGroup.append("g")
            .call(yAxisNew);

        // Axis Labels

        // X-AXIS LABELS
        var povertyAxis = xLabelsGroup.append("text")
            .attr("x", 0)
            .attr("y", 20)
            .attr("value", "poverty")
            .classed("active", true)
            .text("Poverty Rate (%)");

        var ageAxis = xLabelsGroup.append("text")
            .attr("x", 0)
            .attr("y", 40)
            .attr("value", "age")
            .classed("inactive", true)
            .text("Median Age");

        var incomeAxis = xLabelsGroup.append("text")
            .attr("x", 0)
            .attr("y", 60)
            .attr("value", "income")
            .classed("inactive", true)
            .text("Median Household Income");

        // Y-AXIS LABELS
        var healthcareAxis = yLabelsGroup.append("text")
            .attr("text-anchor", "end")
            .attr("y", 0 - margin.left)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .attr("value", "healthcare")
            .attr("class", "aText")
            .classed("active", true)
            .text("Lack of Access to Healthcare (% of Population)");

        var obesityAxis = yLabelsGroup.append("text")
            .attr("text-anchor", "end")
            .attr("y", 20 - margin.left)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .attr("value", "obesity")
            .attr("class", "aText")
            .classed("inactive", true)
            .text("Obesity Rate (%)");

        var smokerAxis = yLabelsGroup.append("text")
            .attr("text-anchor", "end")
            .attr("y", 40 - margin.left)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .attr("value", "smokes")
            .attr("class", "aText")
            .classed("inactive", true)
            .text("Smoking Rate (%)");


        // Circles
        var circlesGroup = emptyCirclesGroup
            .append("circle")
            .attr("r", "19")
            .attr("fill", "gold")
            .attr("stroke-width", "1");

        circlesGroup
            .transition()
            .duration(1000)
            .attr("cx", d => xScale(d[xAxisActive]))
            .attr("cy", d => yScale(d[yAxisActive]));

        // State Labels - ORDER MATTERS
        var textGroup = stateLabels.append("text")
            .text(d => d.abbr)
            .attr("dx", d => xScale(d[xAxisActive]))
            .attr("dy", d => yScale(d[yAxisActive]))
            .attr("font-size", "12px")
            .attr("class", "stateText")
            .attr("text-anchor", "middle");

        // Update ToolTIp
        circlesGroup = updateTooltip(xAxisActive, yAxisActive, circlesGroup);
        textGroup = updateToolTip_Text(xAxisActive, yAxisActive, textGroup);


        // EVENT LISTENERS
        // X-AXIS
        xLabelsGroup.selectAll("text").on("click",
            function() {
                var value = d3.select(this).attr("value");

                // Set Selected element value as the chosen x-axis
                if (value !== xAxisActive) {
                    xAxisActive = value;

                    // Create Scale
                    xScale = createScaleX(indicatorData, xAxisActive);

                    // Create Axis
                    xAxis = createAxisX(xScale, xAxis);

                    // Create Circles
                    circlesGroup = createCircles_XCoord(circlesGroup, xScale, xAxisActive);

                    // Create Labels
                    textGroup = stateLabels_XCoord(textGroup, xScale, xAxisActive);

                    // Update Tooltip
                    circlesGroup = updateTooltip(xAxisActive, yAxisActive, circlesGroup);
                    textGroup = updateToolTip_Text(xAxisActive, yAxisActive, textGroup);

                    // Change Active Toggle
                    if (xAxisActive === "age") {
                        ageAxis
                            .classed("active", true)
                            .classed("inactive", false);
                        povertyAxis
                            .classed("active", false)
                            .classed("inactive", true);
                        incomeAxis
                            .classed("active", false)
                            .classed("inactive", true);
                    } else if (xAxisActive === "poverty") {
                        ageAxis
                            .classed("active", false)
                            .classed("inactive", true);
                        povertyAxis
                            .classed("active", true)
                            .classed("inactive", false);
                        incomeAxis
                            .classed("active", false)
                            .classed("inactive", true);
                    } else {
                        ageAxis
                            .classed("active", false)
                            .classed("inactive", true);
                        povertyAxis
                            .classed("active", false)
                            .classed("inactive", true);
                        incomeAxis
                            .classed("active", true)
                            .classed("inactive", false);
                    }
                }
            })

        yLabelsGroup.selectAll("text").on("click",
            function() {
                var value = d3.select(this).attr("value");

                if (value !== xAxisActive) {
                    yAxisActive = value;

                    yScale = createScaleY(indicatorData, yAxisActive);

                    yAxis = createAxisY(yScale, yAxis);

                    circlesGroup = createCircles_YCoord(circlesGroup, yScale, yAxisActive);
                    textGroup = stateLabels_YCoord(textGroup, yScale, yAxisActive);

                    circlesGroup = updateTooltip(xAxisActive, yAxisActive, circlesGroup);
                    textGroup = updateToolTip_Text(xAxisActive, yAxisActive, textGroup);

                    if (yAxisActive === "healthcare") {
                        healthcareAxis
                            .classed("active", true)
                            .classed("inactive", false);
                        obesityAxis
                            .classed("active", false)
                            .classed("inactive", true);
                        smokerAxis
                            .classed("active", false)
                            .classed("inactive", true);
                    } else if (yAxisActive === "obesity") {
                        healthcareAxis
                            .classed("active", false)
                            .classed("inactive", true);
                        obesityAxis
                            .classed("active", true)
                            .classed("inactive", false);
                        smokesLabel
                            .classed("active", false)
                            .classed("inactive", true);
                    } else {
                        healthcareAxis
                            .classed("active", false)
                            .classed("inactive", true);
                        obesityAxis
                            .classed("active", false)
                            .classed("inactive", true);
                        smokerAxis
                            .classed("active", true)
                            .classed("inactive", false);
                    }

                }
            })

    });
}

// When the browser loads, makeResponsive() is called.
makeResponsive();

// When the browser window is resized, makeResponsive() is called.
d3.select(window).on("resize", makeResponsive);
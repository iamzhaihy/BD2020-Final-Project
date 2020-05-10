function countryLevelMap(geoJSON, data, div) {
    const updateGraphData = (data_index, selected_date) => {
        stringency_data = geoJSON.features.map(f => {
            const ccode = f.properties.ISO_A3;
            if (data_index[selected_date].hasOwnProperty(ccode)) {
                const { stringency_index } = data_index[selected_date][ccode];
                if (stringency_index !== undefined && stringency_index > 0)
                    return { ...f, 'properties': {...f.properties, stringency_index} };
            }
            return { ...f };
        });

        case_numbers = Object.keys(data_index[selected_date])
            .filter(d => data_index[selected_date][d]['confirmed'] !== undefined)
            .map(d => data_index[selected_date][d]['confirmed']);

        case_numbers = [...new Set(case_numbers)].sort()

        case_data = geoJSON.features.map(f => {
            const ccode = f.properties.ISO_A3;
            if (data_index[selected_date].hasOwnProperty(ccode)) {
                const { confirmed } = data_index[selected_date][ccode];
                if (confirmed !== undefined && confirmed > 0)
                    return { ...f, 'properties': {...f.properties, confirmed} };
            }
            return { ...f };
        });
    }
    
    const updateDataOnMap = (graph_data, group, colorScale, valueName) => {
        group.selectAll('.border')
            .data(graph_data, d => d.properties.ISO_A3)
            .join('path')
            .attr('class', 'border')
            .attr('d', path)
            .attr('fill', d => {
                const val = d.properties[valueName];
                return val !== undefined ? colorScale(val) : 'white';
            })
            .style('opacity', d => {
                const val = d.properties[valueName];
                return val !== undefined ? 1.0 : 0.5;
            })
            .attr('stroke', '#dcdcdc');

        if (d3.select(`#${valueName}-map-outline`).empty()) {
            const mapOutline = d3.geoGraticule()
                .outline();

            group.append('path')
                .datum(mapOutline)
                .attr('d', path)
                .attr('stroke', '#dcdcdc')
                .attr('fill', 'none')
                .attr('id', `${valueName}-map-outline`)
        }

        if (d3.select(`#legend-${valueName}`).empty()) {
            const legendG = group.append("g")
                .attr("id", `legend-${valueName}`)
                .attr("transform", `scale(0.6 0.6) translate(${0.6 * layout.bandwidth()}, ${0.05*visWidth})`)
        
            const legend = d3.legendColor()
                .shapeWidth(50)
                .scale(colorScale)
                .title(valueName)
                .orient('horizontal')
                .labelFormat(d3.format(".0s"))
            
            legendG
                .call(legend);
        }
    }

    let data_index = {};
    let max_confirmed = 0;

    let all_timestamps = new Set();

    data.forEach(element => {
        element.date = String(element.date);
        const { date, country_code, confirmed, stringency_index } = element;

        all_timestamps.add(date);

        if (!data_index.hasOwnProperty(date))
            data_index[date] = {};

        if (!data_index[date].hasOwnProperty(country_code))
            data_index[date][country_code] = {};
    
        if (stringency_index !== undefined && stringency_index > 0)
            data_index[date][country_code]['stringency_index'] = +stringency_index;

        if (confirmed !== undefined && confirmed > 0) {
            max_confirmed = Math.max(+confirmed, max_confirmed);
            data_index[date][country_code]['confirmed'] = +confirmed;
        }
    });

    all_timestamps = [...all_timestamps].sort();


    const slider_div = div.append('div')
        .style('width', '100%')
        .style('margin', '0 auto');

    const slider = slider_div.append('input')
        .attr('type', 'range')
        .attr('width', '100%')
        .attr('class', 'slider')
        .attr('height', '25px')
        .attr('min', 0)
        .attr('max', all_timestamps.length-1)
        .attr('value', 1)
        .on('input', function(d) {
            let selected_date = all_timestamps[this.value];

            info_text.html(selected_date);
            updateGraphData(data_index, selected_date);
            updateDataOnMap(stringency_data, mapLeft, colorStringency, 'stringency_index');
            updateDataOnMap(case_data, mapRight, colorConfirmed, 'confirmed');
        })

    const margin = { top: 20, right: 20, bottom: 20, left: 20 };

    const visWidth = 1500 - margin.left - margin.right;
    const visHeight = 600 - margin.top - margin.bottom;

    const colorStringency = d3.scaleSequential([1,100], d3.interpolateBlues);
    const colorConfirmed = d3.scaleSequentialLog([1, max_confirmed] , d3.interpolateReds);

    const svg = div.append('svg')
        .attr('width', visWidth + margin.left + margin.right)
        .attr('height', visHeight + margin.top + margin.bottom);

    const layout = d3.scaleBand()
        .domain([0, 1])
        .range([0, visWidth])
        .paddingInner(0.05)

    const info_text = svg.append('text')
        .attr('x', 0.5 * visWidth)
        .attr('y', margin.top + 10)
        .html(all_timestamps[0])

    const maps = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const mapLeft = maps.append('g')
        .attr('transform', `translate(${layout(0)}, 0)`);

    const mapRight = maps.append('g')
        .attr('transform', `translate(${layout(1)}, 0)`);

    const projection = d3.geoNaturalEarth1()
        .fitSize([layout.bandwidth(), visHeight], geoJSON);

    const path = d3.geoPath().projection(projection);

    let stringency_data, case_numbers, case_data;

    updateGraphData(data_index, all_timestamps[0]);
    updateDataOnMap(stringency_data, mapLeft, colorStringency, 'stringency_index');
    updateDataOnMap(case_data, mapRight, colorConfirmed, 'confirmed');
}
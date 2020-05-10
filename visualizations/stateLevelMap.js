function stateLevelMap(geoJSON, data, div) {

    const formatTimeStamp = (timestamp) => {
        return `${timestamp.slice(0,4)}-${timestamp.slice(4,6)}-${timestamp.slice(6,8)}`;
    }

    const updateToolTip = (datum, coords) => {
        let valName;
        if (datum.properties.hasOwnProperty('confirmed'))
            valName = 'confirmed';
        else
            valName = 'stringency_index';
        
        let val = datum.properties[valName]

        d3.select('#state-tooltip')
            .style('top', coords[1])
            .style('left', coords[0])
            .style('display', 'block')
            .html(`${datum.properties.NAME}<br>${valName} : ${val}`)
    }

    const updateGraphData = (data_index, selected_date) => {
        stringency_data = geoJSON.features.map(f => {
            const scode = f.properties.NAME;
            if (data_index[selected_date].hasOwnProperty(scode)) {
                const { stringency_index } = data_index[selected_date][scode];
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
            const scode = f.properties.NAME;
            if (data_index[selected_date].hasOwnProperty(scode)) {
                const { confirmed } = data_index[selected_date][scode];
                if (confirmed !== undefined && confirmed > 0)
                    return { ...f, 'properties': {...f.properties, confirmed} };
            }
            return { ...f };
        });
    }
    
    const updateDataOnMap = (graph_data, group, colorScale, valueName) => {
        group.selectAll('.border')
            .data(graph_data, d => d.properties.NAME)
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
            .attr('stroke', '#dcdcdc')
            .on('mouseenter', d => {
                updateToolTip(d, [d3.event.clientX, d3.event.clientY]);
            })
            .on('mousemove', d => {
                updateToolTip(d, [d3.event.clientX, d3.event.clientY]);
            })
            .on('mouseleave', d => {
                d3.select('#state-tooltip').style('display', 'none')
            })

        if (d3.select(`#state-legend-${valueName}`).empty()) {
            const legendG = group.append("g")
                .attr("id", `state-legend-${valueName}`)
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
        const { date, state_name, stringency_index, confirmed } = element;

        all_timestamps.add(date);

        if (!data_index.hasOwnProperty(date))
            data_index[date] = {};

        if (!data_index[date].hasOwnProperty(state_name))
            data_index[date][state_name] = {};
    
        if (stringency_index !== undefined && stringency_index > 0)
            data_index[date][state_name]['stringency_index'] = +stringency_index;

        if (confirmed !== undefined && confirmed > 0) {
            max_confirmed = Math.max(+confirmed, max_confirmed);
            data_index[date][state_name]['confirmed'] = +confirmed;
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

            info_text.html(formatTimeStamp(selected_date));
            updateGraphData(data_index, selected_date);
            updateDataOnMap(stringency_data, mapLeft, colorStringency, 'stringency_index');
            updateDataOnMap(case_data, mapRight, colorConfirmed, 'confirmed');
        })

    const tooltip = div.append('div')
        .attr('id', 'state-tooltip')
        .style('border', 'solid 1px black')
        .style('padding', '5px')
        .style('position', 'absolute')
        .style('display', 'none')
        .html('tooltip')

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
        .attr('x', '50%')
        .attr('y', '10%')
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .style('font', 'bold 30px serif')
        .html(formatTimeStamp(all_timestamps[0]))

    const maps = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const mapLeft = maps.append('g')
        .attr('transform', `translate(${layout(0)}, 0)`);

    const mapRight = maps.append('g')
        .attr('transform', `translate(${layout(1)}, 0)`);

    const projection = d3.geoAlbersUsa()
        .fitSize([layout.bandwidth(), visHeight], geoJSON);

    const path = d3.geoPath().projection(projection);

    let stringency_data, case_numbers, case_data;

    updateGraphData(data_index, all_timestamps[0]);
    updateDataOnMap(stringency_data, mapLeft, colorStringency, 'stringency_index');
    updateDataOnMap(case_data, mapRight, colorConfirmed, 'confirmed');
}
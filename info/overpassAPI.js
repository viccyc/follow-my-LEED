const axios = require('axios');

// get all ways around a certain address
axios.get('http://overpass-api.de/api/interpreter?[out:json];way(around:400,51.041853,-114.072356);out;')
  .then(results => {
    results = results.data.elements.filter(element => {
      return element.hasOwnProperty('tags') &&
        element.tags.hasOwnProperty('highway') &&
        !element.tags.hasOwnProperty('bridge') &&
        // !element.tags.hasOwnProperty('cycleway') &&
        !(element.tags.hasOwnProperty('service') && (element.tags.service === 'parking_aisle' || element.tags.service === 'driveway' || element.tags.service === 'alley')) &&
        // element.tags.highway !== 'service' &&
        // element.tags.highway !== 'traffic_signals' &&
        element.tags.highway !== 'cycleway' &&
        element.tags.highway !== 'footway'
    })

    console.log(results);
    return results;
  })
  // remove duplicate nodes within a certain way
  // to prep data for the next step
  .then(elements => {
    elements.forEach(element => {
      element.nodes = element.nodes.sort().filter((node, pos, array) => {
        return !pos || node !== array[pos-1];
      })
    });
    return elements;
  })
  // put all nodes in one array
  // filter out all nodes that only appear once
  // output a list of unique node ids
  .then(newElements => {
    let nodes = {};
    // newElements.forEach(newElement => {
    //   nodes = nodes.concat(newElement.nodes);
    // })

    newElements.forEach(newElement => {
      newElement.nodes.forEach(node => {
        if (!nodes.hasOwnProperty(node)) {
          nodes[node] = [newElement.tags.name? newElement.tags.name : newElement.id];
        } else {
          nodes[node].push(newElement.tags.name? newElement.tags.name : newElement.id);
        }
      })
    })
    
    let list = [];
    for (let node in nodes) {
      nodes[node] = nodes[node].filter((item, index, array) => {
        return !(array.indexOf(item) === index && array.lastIndexOf(item) !== index);
      });
      if (nodes[node].length > 1) {
        list.push(node);
      }
    }

    console.log(list.length);
    
    return list;
  })
  .then(nodes => {
    let intersections = [];

    axios.get('http://overpass-api.de/api/interpreter?[out:json];node(around:400,51.041853,-114.072356);out;')
      .then(results => {
        // console.log(results.data.elements);
        // console.log(nodes);
        intersections = results.data.elements.filter(element => {
          return nodes.indexOf(element.id.toString()) !== -1;
        });
        // console.log(intersections);
        console.log(intersections.length);

        let list = [];
        intersections.forEach(intersection => {
          list.push(intersection.id);
        })
        // console.log(list);
        return intersections;
      })

  })
// Create a detached DOM using document.createElement
// Render the passed in child using React.render(React.Children.only(props.children), detachedDOM)
// Pass the detachedDOM into InfoWindow({content: detachedDOM})
// create a function which creates out the html - in the return, builds the html
// this function could be in a different file
// pass in the data (item) and call this function from the googleMaps loop
// import React from 'react';

// class InfoContent extends Component {

const createInfoHTML = (item) => {
  return (
    `<div>
      <p> Hello InfoContent! </p>
    </div>`
  );
}

// }

// export module InfoContent;
exports.createInfoHTML = createInfoHTML;
// module.exports = createInfoHTML;

// import moment from 'moment';
const moment = window.moment;

const certLevel = {
  1: 'LEED Certified',
  2: 'LEED Silver',
  3: 'LEED Gold', 
  4: 'LEED Platinum'
};

const createInfoHTML = (item) => {
  // console.log("item: ", item);
  return (
    `<div>
      <p> ${item.name}. Project # ${item.number} </p>
      <p> Address: ${item.address} </p>
      <p> ${certLevel[item.certification_level_id]}. Date certified: ${moment(item.cert_date).format("MMM DD YYYY")} </p>
      <p> ${item.rating_system}. V: ${item.version}</p>
      <p> Building size: ${item.size} </p>
      <p> Building type: ${item.type} </p>
      </div>`
  );
}

exports.createInfoHTML = createInfoHTML;


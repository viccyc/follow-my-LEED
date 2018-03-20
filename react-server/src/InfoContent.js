import leedCgbc from './images/leedCgbc.png';
import './InfoContent.css';
const moment = window.moment;
const googleMaps = window.google.maps;

// const createPhotoMarker = (building) => {
//   const photos = building.photos;
//   if (!photos) {
//     return;
//   }

//   const googlePhoto = new googleMaps.Marker({
//     icon: photos[0].getUrl({'maxWidth': 35, 'maxHeight': 35})
//   });
// }

const certLevel = {
  1: 'LEED Certified',
  2: 'LEED Silver',
  3: 'LEED Gold', 
  4: 'LEED Platinum'
};

// can't get this imported image to work??
// <tr><img src={leedCgbc} class="image" height=150 width=450 />

const createInfoHTML = (item) => {
  return (
    `<table class="table table-bordered" >
      <tbody>
        <tr>
          <img class="image" src="https://s3-ca-central-1.amazonaws.com/cdnarchitect/wp-content/uploads/2016/10/CaGBC-logo_new-3-e1477500943100.jpg" height=150 width=150 />
        </tr>
        <tr class="table-row">
          <td>${item.name}. Project # ${item.number} </td>
        </tr>
        <tr class="table-row">
          <td>Address: ${item.address} </td>
        </tr>
        <tr class="table-row">
          <td>${certLevel[item.certification_level_id]}. Date certified: ${moment(item.cert_date).format("MMM DD YYYY")}</td>
        </tr>
        <tr class="table-row">
          <td>${item.rating_system}. V: ${item.version}</td>
        </tr>
        <tr class="table-row">
          <td>Building size: ${item.size} </td>
        </tr>
        <tr class="table-row">
          <td>Building type: ${item.type} </td>
        </tr>
      </tbody>
    </table>`
  );
}

export default createInfoHTML;


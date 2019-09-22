let companyData = [
  {
    city: "Kyiv",
    name: "Global Message Services Ukraine LLC",
    address: "Kyiv, Stepan Bandera, 33",
    postcode: "02066",
    country: "Ukraine",
    lat: 50.509951,
    lng: 30.804953
  },
  {
    city: "New York",
    name: "Global Message Services USA LLC",
    address: "New York, 79st St, 132 E",
    postcode: "10075",
    country: "USA",
    lat: 40.775118,
    lng: -73.959516
  },
  {
    city: "Barcelona",
    name: "Global Message Services Spain LLC",
    address: "Barcelona, Passeig de Sant Joan, 33",
    postcode: "08010",
    country: "Spain",
    lat: 41.393379,
    lng: 2.177051
  },
  {
    city: "Rome",
    name: "Global Message Services Italy LLC",
    address: "Rome, Via Quattro Novembre, 139",
    postcode: "00187",
    country: "Italy",
    lat: 41.897259,
    lng: 12.484464
  }
]

Vue.component('company-info', {
  props: ['index'],
  data: function () {
    return {
      companyData: companyData
    }
  },
	template: `
    <div>
      <div>{{ companyData[index].name }}</div>
      <div>{{ companyData[index].address }}</div>
      <div>{{ companyData[index].postcode }}</div>
      <div>{{ companyData[index].country }}</div>
    </div>
  `
});

let app = new Vue({
  el: '#app',
  data: {
    companyData: companyData,
    currentTab: 0,
    name: '',
    email: '',
    caps: '',
    response: '',
    activeClass: 'active',
    phone: '',
    buttonDisable: false,
    responseStatus: null
  },
  methods: {
    buttonClick: function (index) {
      this.currentTab = index;
      initMap();
    },
    submitForm() {
      this.buttonDisable = true;

      axios.post('//httpbin.org/post', {
        name: this.name,
        email: this.email,
        phone: this.phone
      }).then(response => {
        this.buttonDisable = false;
        console.log(response.status);
      })
    }
  }
})

function initMap() {
  let cityInfo = companyData[app.currentTab];
  let pos = { lat: cityInfo.lat, lng: cityInfo.lng }
  let opt = {
    center: pos,
    zoom: 11
  }

  let myMap = new google.maps.Map(document.getElementById('map'), opt);

  let marker = new google.maps.Marker({
    position: pos,
    map: myMap
  });
}

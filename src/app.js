const path = require('path')
const express = require('express')
const hbs = require('hbs')
const cors = require('cors');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const NextCloud = require('./config')

const app = express()
NextCloud.init();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
// app.use(cors({origin: 'https://nc.efam.cloud'}));
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(cors());
app.use(express.static(publicDirectoryPath))

// app.use(function (req, res, next) {

//   // express.static(publicDirectoryPath);

//   // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin', 'https://nc.efam.cloud');

//   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//   // Request headers you wish to allow
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', true);

//   // Pass to next layer of middleware
//   next();
// });

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Andrew Mead'
    })
})

app.get('/weather', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const photos = [
    'https://nc.efam.cloud/s/cEkg96at8JSoQDM/preview',
    'https://nc.efam.cloud/s/NxdwjqBDGro5g8i/preview',
    'https://nc.efam.cloud/s/Q6aYswoxPHNoRpP/preview',
    'https://nc.efam.cloud/s/DETDoMLQzEbNEWs/preview'
  ];
    if (!req.query.number) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    // NextCloud.getFiles().then(result => {
      // console.log(JSON.parse(JSON.stringify(result[0].name)))
      // for (var i = 0, len = result.length; i < len; i++) {
        // console.log(result[i])
        // console.log('------------------------------------');
        // console.log(result[i].client.webDAVUrl + result[i].name);
        // console.log('------------------------------------');
        // photos.push(result[i].client.webDAVUrl + result[i].name)
      // }
      // console.log(photos)


      res.render('index', {
        title: 'Weather',
        name: 'Photos App',
        numOfImgs: photos.length,
        currentImg: photos[req.query.number],
        nextImg: photos[req.query.number + 1]
    })
    // })

  //   console.log(photos)


  //   res.render('index', {
  //     title: 'Weather',
  //     name: 'Photos App',
  //     img: photos[req.query.number]
  // })
    // geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    //     if (error) {
    //         return res.send({ error })
    //     }

    //     forecast(latitude, longitude, (error, forecastData) => {
    //         if (error) {
    //             return res.send({ error })
    //         }

    //         res.send({
    //             forecast: forecastData,
    //             location,
    //             address: req.query.address
    //         })
    //     })
    // })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
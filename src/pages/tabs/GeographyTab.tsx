import React, { useMemo, useContext, useRef, useState, useEffect } from 'react';
import { GoogleMap, LoadScript, useLoadScript, Circle, DrawingManager } from '@react-google-maps/api';
import { Box, Grid, Typography, FormControlLabel, RadioGroup, Radio, MenuItem } from '@mui/material';
import { HeaderText, StyledButton, StyledTextField } from '@/components/generalComponents';
import { MyContext } from '@/context/myContext';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 54.024003,
  lng: -3.901981
};

const libraries = ["drawing"]

let mapRef = undefined

let shapes = []

// const drawingManager = useRef()
let drawingManager = { current: undefined }

const handlerLoadDrawingManager = (drawingManagerInstance) => {
  drawingManager.current = drawingManagerInstance
}

function handleOverlayComplete(e) {
  const shape = e.overlay
  shape.type = e.type
  // google.maps.event.addListener(shape, "click", () => {
  //   this.toggleSelection(shape);
  // });
  // this.toggleSelection(shape);
  // setShapes([...shapes, shape])
  shapes.push(shape)
  drawingManager.current.setDrawingMode(null)
  drawingManager.current.setOptions({ drawingControl: false })
}

let countryLayer = null

const onMapLoad = (map) => {
  mapRef = map
  countryLayer = map.getFeatureLayer('COUNTRY')
}

function handleCountrySelection(country) {
  const countryInfo = {
    Serbia: {
      placeId: 'ChIJlYCJ8t8dV0cRXYYjN-pQXgU',
      center: {
        lat: 44.194459,
        lng: 20.800463,
      },
      zoom: 7,
    }
  }

  const featureStyleOptions: google.maps.FeatureStyleOptions = {
    strokeColor: '#000000',
    strokeOpacity: 1.0,
    strokeWeight: 2.0,
    fillColor: '#8d9da6',
    fillOpacity: 0.1
  };

  // Apply the style to a single boundary.
  if (!countryInfo[country]) {
    console.log('bad country passed to function handleCountrySelection')
    return
  }

  mapRef.setCenter(countryInfo[country].center)
  mapRef.setZoom(countryInfo[country].zoom)

  countryLayer.style = (options: { feature: { placeId: string; }; }) => {
    if (options.feature.placeId == countryInfo[country].placeId) {
      return featureStyleOptions;
    }
  };
}

function resetContrySelection() {
  countryLayer.style = null;
}

let drawingControlOptionsChangeable = {
  position: undefined,
  drawingModes: [''],
}

function changeDrawingModes(drawingModes: string[]) {
  drawingControlOptionsChangeable.drawingModes = drawingModes
  drawingManager.current.setOptions({
    drawingControlOptionsChangeable
  })
}

const RenderMap = () => {
  drawingControlOptionsChangeable = {
    position: google.maps.ControlPosition.TOP_RIGHT,
    drawingModes: ['marker'],
  }

  const svgMarker = {
    path: "M-1.547 12l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM0 0q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
    fillColor: "black",
    fillOpacity: 0.8,
    strokeWeight: 0,
    rotation: 0,
    scale: 2,
    anchor: new google.maps.Point(0, 20),
  };

  const drawingManagerOptions = {
    drawingControl: true,
    drawingControlOptions: drawingControlOptionsChangeable,
    markerOptions: {
      icon: svgMarker,
      draggable: true,
    },
    circleOptions: {
      fillColor: '#8d9da6',
      fillOpacity: 0.1,
      strokeWeight: 2,
      draggable: true,
      editable: true,
    },
    rectangleOptions: {
      fillColor: '#8d9da6',
      fillOpacity: 0.1,
      strokeWeight: 2,
      draggable: true,
      editable: true,
    },
    polygonOptions: {
      fillColor: '#8d9da6',
      fillOpacity: 0.1,
      strokeWeight: 2,
      draggable: true,
      editable: true,
    },
  };

  const mapControlOptions = {
    mapId: '42160077f16ba2d',
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: true,
    fullscreenControlOptions: {
      position: google.maps.ControlPosition.LEFT_TOP,
    },
  }

  return (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={6}
        options={mapControlOptions}
        onLoad={onMapLoad}
      >
        <DrawingManager
          onLoad={handlerLoadDrawingManager}
          onOverlayComplete={handleOverlayComplete}
          options={drawingManagerOptions}
        />
        {/* <Circle
            center={center}
            options={options}
            draggable={true}
            // onDragStart={}
            onDragEnd={(event) => console.log(event.latLng.toString())}
          /> */}
      </GoogleMap>
    </>
  )
}

function deleteShapes() {
  shapes.forEach(shape => shape.setMap(null))
  shapes = []
  drawingManager.current.setOptions({ drawingControl: true })
}

const RadioButtonsGeographyType = () => {
  const { geographyType, setGeographyType } = useContext(MyContext)
  const [country, setCountry] = useState('Serbia')

  const handleGeographyTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGeographyType(event.target.value)
    deleteShapes()
    resetContrySelection()
    drawingManager.current.setDrawingMode(null)
    switch (event.target.value) {
      case 'point':
        changeDrawingModes(['marker'])
        break
      case 'region':
        changeDrawingModes(['circle', 'rectangle', 'polygon'])
        break
      case 'country':
        changeDrawingModes([])
        handleCountrySelection(country)
        break
    }
  }

  const handleCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(event.target.value)
    resetContrySelection()
    handleCountrySelection(event.target.value)
  }

  return (
    <Box>
      <RadioGroup
        name="fallback-operator-radio-buttons-group"
        value={geographyType}
        onChange={handleGeographyTypeChange}
      >
        <FormControlLabel value="point" sx={{ mt: 0 }} control={
          <Radio style={{ color: 'black' }} />
        } label={
          <Typography>particular point, building</Typography>
        } />
        <FormControlLabel value="region" control={
          <Radio style={{ color: 'black' }} />
        } label={
          <Typography>selected region on the map</Typography>
        } />
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <FormControlLabel value="country" control={
            <Radio style={{ color: 'black' }} />
          } label={
            <Typography>country-wide</Typography>
          } />
          <StyledTextField disabled={geographyType !== 'country'}
            sx={{ ml: 1 }}
            size="small"
            select
            // label="Select"
            defaultValue="nothing"
            value={country}
            onChange={handleCountryChange}
          >
            <MenuItem key='Serbia' value='Serbia'>Serbia</MenuItem>
            <MenuItem key='country 2' value='country 2'>country 2</MenuItem>
            <MenuItem key='country 3' value='country 3'>country 3</MenuItem>
          </StyledTextField>
        </Box>
      </RadioGroup>
    </Box>
  )
}

function GeographyTab() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyA74mDjm325UirYKxs5ui-9xyWhSDzIDjc",
    libraries: libraries,
    language: 'en',
    version: 'beta',
    region: 'RS',
  })

  const Wrapper = ({ children }) => (
    <Grid container sx={{ width: '100%' }} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={12}>
        <HeaderText>Slice geography</HeaderText>
      </Grid>
      <Grid item xs={12} lg={9}>
        <Grid container columnSpacing={1}>
          <Grid item xs={12} lg={3} sx={{ mt: 1 }}>
            <Typography>Select one of 3 options:</Typography>
          </Grid>
          <Grid item xs={12} lg={9} sx={{ pb: 1}}>
            <RadioButtonsGeographyType />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} lg={3} sx={{ pb: 1, width: '100%', display: 'flex', alignItems: 'flex-end' }}>
        <StyledButton variant='outlined' onClick={deleteShapes} sx={{ marginLeft: 'auto' }}>Clear map</StyledButton>
      </Grid>
      <Grid item xs={12} sx={{ mt: 0, width: '100%', height: '65vh' }}>
        {children}
      </Grid>
    </Grid>
  )

  if (loadError) {
    return <Wrapper><Typography>Map cannot be loaded right now, sorry.</Typography></Wrapper>
  }

  return isLoaded ? <Wrapper>{<RenderMap />}</Wrapper> : <Wrapper><Typography>Loading...</Typography></Wrapper>;
}

export default React.memo(GeographyTab)
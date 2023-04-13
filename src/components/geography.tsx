import React, { useRef, useState } from 'react';
import { GoogleMap, LoadScript, useLoadScript, Circle, DrawingManager } from '@react-google-maps/api';
import { Grid, Typography } from '@mui/material';
import { HeaderText, StyledButton } from './generalComponents';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

const libraries = ["drawing"]

export default function Geography({ buttonsAtBottom }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyA74mDjm325UirYKxs5ui-9xyWhSDzIDjc",
    libraries: libraries,
  })

  const [shapes, setShapes] = useState<any[]>([])

  const drawingManager = useRef()

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

  function deleteShapes() {
    shapes.forEach(shape => shape.setMap(null))
    drawingManager.current.setOptions({ drawingControl: true })
  }

  const Wrapper = ({ children }) => (
    <Grid container sx={{ width: '100%' }} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={12}>
        <HeaderText>Slice geography</HeaderText>
      </Grid>
      <Grid item xs={12} lg={4}>
        <Typography>Select one of 3 options:</Typography>
        <Typography>- particular point, building (marker)</Typography>
        <Typography>- selected region (circle/rectangle/polygon)</Typography>
        <Typography>- country-wide</Typography>
      </Grid>
      <Grid item xs={12} lg={8} sx={{ mt: 2, width: '100%', display: 'flex', alignItems: 'flex-end' }}>
        <StyledButton variant='outlined' onClick={deleteShapes} sx={{ marginLeft: 'auto' }}>Clear map</StyledButton>
      </Grid>
      <Grid item xs={12} sx={{ mt: 2, width: '100%', height: '70vh' }}>
        {children}
      </Grid>
      {buttonsAtBottom}
    </Grid>
  )

  const renderMap = () => {
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
      drawingControlOptions: {
        // position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: ['marker', 'circle', 'rectangle', 'polygon'],
      },
      markerOptions: {
        icon: svgMarker,
        draggable: true,
      },
      circleOptions: {
        fillColor: '#fefefe',
        fillOpacity: 0.3,
        strokeWeight: 2,
        draggable: true,
        editable: true,
      },
      rectangleOptions: {
        fillColor: '#fefefe',
        fillOpacity: 0.3,
        strokeWeight: 2,
        draggable: true,
        editable: true,
      },
      polygonOptions: {
        fillColor: '#fefefe',
        fillOpacity: 0.3,
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
    }

    return (
      <>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={7}
          options={mapControlOptions}
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

  if (loadError) {
    return <Wrapper><Typography>Map cannot be loaded right now, sorry.</Typography></Wrapper>
  }

  return isLoaded ? <Wrapper>{renderMap()}</Wrapper> : <Wrapper><Typography>Loading...</Typography></Wrapper>;
}
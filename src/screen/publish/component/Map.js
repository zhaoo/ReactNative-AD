import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Overlay, MapView, Geolocation} from 'react-native-baidu-map';

const {Marker, Circle} = Overlay;

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: {
        zoom: 18,
        trafficEnabled: true,
      },
      center: {
        latitude: 30.2236,
        longitude: 120.0332,
      },
      latitude: this.props.latitude,
      longitude: this.props.longitude,
    };
  }

  onMapLoaded = () => {
    Geolocation.getCurrentPosition().then(res => {
      const {latitude, longitude} = res;
      this.props.handleChangeMap(latitude, longitude);
      this.setState({
        center: {
          latitude: latitude,
          longitude: longitude,
        },
        latitude: latitude,
        longitude: longitude,
      });
    });
  };

  onMapClick = e => {
    Geolocation.reverseGeoCode(e.latitude, e.longitude).then(res => {
      this.props.setAddress(res.address);
    });
    const latitude = parseFloat(e.latitude.toFixed(4));
    const longitude = parseFloat(e.longitude.toFixed(4));
    this.setState({
      latitude: latitude,
      longitude: longitude,
    });
    this.props.handleChangeMap(latitude, longitude);
  };

  render() {
    const {map, center, latitude, longitude} = this.state;
    return (
      <MapView
        zoom={map.zoom}
        trafficEnabled={map.trafficEnabled}
        center={center}
        style={styles.map}
        onMapLoaded={() => {
          this.onMapLoaded();
        }}
        onMapClick={e => {
          this.onMapClick(e);
        }}>
        {latitude &&
          longitude && (
            <Circle
              center={{
                longitude: longitude,
                latitude: latitude,
              }}
            />
          ) && (
            <Marker
              location={{
                longitude: longitude,
                latitude: latitude,
              }}
            />
          )}
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});

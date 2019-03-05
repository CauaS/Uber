import React,  { Component } from 'react';
import { View } from 'react-native';
import MapView from 'react-native-maps';

export default class Map extends Component {
    state = {
        region: null
    }
    async componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            ({ coords: { latitude, longitude }}) => {
                this.setState({ region: {
                    latitude,
                    longitude,
                    latitudeDelta: 0.0143,
                    longitudeDelta: 0.0134,
                }})
            }, //sucesso,
            () => {}, //erro
            {
                timeout: 2000, //2 sec pra cair no erro
                enableHighAccuracy: true, // utilizar gps
                maximumAge: 1000 //cash de localização de no maximo 1 seg, intervalo
            }
        );
    }
    render() {
        const { region } = this.state;
        return (
            <View style={{ flex: 1}}>
                <MapView 
                    style={{ flex: 1}}
                    region={region}
                    showsUserLocation
                    loadingEnabled
                />
            </View>
        );
    }
}
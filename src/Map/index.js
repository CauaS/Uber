import React,  { Component } from 'react';
import { View } from 'react-native';
import MapView from 'react-native-maps';
import Search from '../Search/index';
import Directions from '../Directions/index';

export default class Map extends Component {
    state = {
        region: null,
        destination: null
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
            (erro) => {console.log(erro)}, //erro
            {
                timeout: 2000, //2 sec pra cair no erro
                enableHighAccuracy: true, // utilizar gps
                maximumAge: 1000 //cache de localização de no maximo 1 seg, intervalo
            }
        );
    }
    handleLocationSelected = (data, { geometry }) => {
        const { location: { lat: latitude, lng: longitude }} = geometry 

        this.setState({
            destination: {
                latitude,
                longitude,
                title: data.structured_formatting.main_text,
            }
        })
    }
    
    render() {
        const { region, destination } = this.state;
        return (
            <View style={{ flex: 1}}>            
                <MapView 
                    style={{ flex: 1}}
                    region={{ 
                        latitude: -29.5820061, 
                        longitude: -51.0834943,
                        latitudeDelta: 0.0143,
                        longitudeDelta: 0.0134
                    }}
                    showsUserLocation
                    loadingEnabled
                >
                { destination && (
                    <Directions 
                        origin={{
                            latitude: -29.5820061, 
                            longitude: -51.0834943,
                            atitudeDelta: 0.0143,
                            longitudeDelta: 0.0134
                        }} 
                        destination={destination}
                        onReady={() => {}}
                    />
                )}
                </MapView> 
                <Search onLocationSelected={ this.handleLocationSelected}/>
            </View>
        );
    }
}
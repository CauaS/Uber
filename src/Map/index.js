import React,  { Component, Fragment } from 'react';
import { View, Text } from 'react-native';
import MapView,  { Marker } from 'react-native-maps';
import { getPixelSize } from '../utils';

import Search from '../Search/index';
import Directions from '../Directions/index';

import markerImage from '../assets/marker.png';

import { LocationBox, LocationText, LocationTimeBox, LocationTimeText, LocationTimeTextSmall } from '../Map/styles';

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
                console.log('-------', coords.latitude);
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
                    ref={el => this.MapView = el}
                >
                { destination && (
                    <Fragment>
                        <Directions 
                            origin={{
                                latitude: -29.5820061, 
                                longitude: -51.0834943,
                                atitudeDelta: 0.0143,
                                longitudeDelta: 0.0134
                            }} 
                            destination={destination}
                            onReady={result => {
                                this.MapView.fitToCoordinates(result.coordinates,  {
                                    edgePadding: {
                                        right: getPixelSize(50),
                                        left: getPixelSize(50), 
                                        top: getPixelSize(50),
                                        bottom: getPixelSize(50)
                                    }
                                })
                            }}
                        />
                        <Marker
                            coordinate={destination}
                            //anchor={{ x: 0, y: 0 }}
                            image={markerImage}
                        >
                            <LocationBox>
                                <LocationText>{destination.title}</LocationText>
                            </LocationBox>
                        </Marker>

                        <Marker
                            coordinate={{
                                latitude: -29.5820061, 
                                longitude: -51.0834943,
                                atitudeDelta: 0.0143,
                                longitudeDelta: 0.0134
                            }}
                            //anchor={{ x: 0, y: 0 }}
                            image={markerImage}
                        >
                             <LocationBox>
                                <LocationTimeBox>
                                    <LocationTimeText>31</LocationTimeText>
                                    <LocationTimeTextSmall>MIN</LocationTimeTextSmall>
                                </LocationTimeBox>
                                <LocationText> R. Otto Engelmman, 311</LocationText>
                            </LocationBox>
                        </Marker>
                    </Fragment>
                )}
                </MapView> 
                <Search onLocationSelected={ this.handleLocationSelected}/>
            </View>
        );
    }
}
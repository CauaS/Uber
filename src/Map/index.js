import React,  { Component, Fragment } from 'react';
import { View, Image  } from 'react-native';
import MapView,  { Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import Details from '../Details/index';

import { getPixelSize } from '../utils';

import Search from '../Search/index';
import Directions from '../Directions/index';

import markerImage from '../assets/marker.png';
import backImage  from '../assets/back.png';

import { LocationBox, LocationText, LocationTimeBox, LocationTimeText, LocationTimeTextSmall, Back } from '../Map/styles';

Geocoder.init('AIzaSyDD5BM8MmH_Fk7qVOR8gvYNlGvjHp45Xmo');

export default class Map extends Component {
    state = {
        region: null,
        destination: null,
        duration: null,
        location: null
    }
   async componentDidMount() {
        navigator.geolocation.getCurrentPosition(            
            async ({ coords: { latitude, longitude }}) => {

                const response = await Geocoder.from({ latitude, longitude });
                const address = response.results[0].formatted_address;
                const locationA = address.substring(0, address.indexOf(","));               

                this.setState({ region: {
                    locationA,
                    latitude,
                    longitude,
                    latitudeDelta: 0.0143,
                    longitudeDelta: 0.0134,
                }})
            }, //sucesso,
            (erro) => {console.log(erro)}, //erro
            {
                timeout: 10000, //2 sec pra cair no erro
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

    handleBack = () => {
        this.setState({ destination: null });
    };
    
    render() {
        const { region, destination, duration, locationA } = this.state;
        return (
            <View style={{ flex: 1}}>            
                <MapView 
                    style={{ flex: 1}}
                    region={region}
                    showsUserLocation
                    loadingEnabled
                    ref={el => this.MapView = el}
                >
                { destination && (
                    <Fragment>
                        <Directions 
                            origin={region} 
                            destination={destination}
                            onReady={result => {
                                this.setState({ duration: Math.floor(result.duration) });

                                this.MapView.fitToCoordinates(result.coordinates,  {
                                    edgePadding: {
                                        right: getPixelSize(50),
                                        left: getPixelSize(50), 
                                        top: getPixelSize(50),
                                        bottom: getPixelSize(350)
                                    }
                                })
                            }}
                        />
                        <Marker
                            coordinate={destination}
                            anchor={{ x: 0, y: 0 }}
                            image={markerImage}
                        >
                            <LocationBox>
                                <LocationText>{destination.title}</LocationText>
                            </LocationBox>
                        </Marker>

                        <Marker
                            coordinate={region}
                            anchor={{ x: 0, y: 0 }}
                            image={markerImage}
                        >
                             <LocationBox>
                                <LocationTimeBox>
                                    <LocationTimeText>{duration}</LocationTimeText>
                                    <LocationTimeTextSmall>MIN</LocationTimeTextSmall>
                                </LocationTimeBox>
                                <LocationText>{locationA}</LocationText>
                            </LocationBox>
                        </Marker>
                    </Fragment>
                )}
                </MapView> 
                 
                {destination ? (
                    <Fragment>
                        <Back onPress={this.handleBack}>
                        <Image source={backImage} />
                        </Back>
                        <Details />
                    </Fragment>
                    ) : (
                    <Search onLocationSelected={this.handleLocationSelected} />
                )}
                
            </View>
        );
    }
}
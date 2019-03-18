import React,  { Component } from 'react';
import { Platform } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default class Search extends Component {

    state = {
        searchFocused: false,
    }
    render(){
        const { onLocationSelected } = this.props;
        const { searchFocused } = this.state;

        return <GooglePlacesAutocomplete 
            placeholder = 'Para onde?'
            placeholderTextColor ='#333'
            onPress={onLocationSelected}
            query={{
                key: 'AIzaSyDD5BM8MmH_Fk7qVOR8gvYNlGvjHp45Xmo',
                language:'pt'
            }}
            textInputProps={{
                //autoCapitalize:'nome',
                onFocus:() => { this.setState({ searchFocused: true })},
                onBlur:() => { this.setState({ searchFocused: false })},
                autoCorrect: false
            }}
            listViewDisplayed={searchFocused}
            fetchDetails
            enablePoweredByContainer={false}
            styles={{
                container: { 
                    position: 'absolute',
                    top: Platform.select({ ios: 60, android: 40 }),
                    width: "100%"
                },
                textInputContainer: {
                    flex: 1,
                    backgroundColor: 'transparent',
                    height: 45,
                    marginHorizontal: 20,
                    borderTopWidth: 0,
                    borderBottomWidth:0
                },
                textInput: {
                    height: 45,
                    margin: 0,
                    borderRadius: 0,
                    paddingTop: 0,
                    paddingBottom: 0,
                    paddingLeft: 20,
                    paddingRight: 0,
                    marginTop: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    elevation: 5
                },
                listView: {
                    borderWidth: 1,
                    borderColor: '#DDD',
                    backgroundColor: '#FFF',
                    marginHorizontal: 20,
                    elevation: 5,
                    marginTop: 10
                },
                description: {
                    fontSize: 15
                },
                row: {
                    padding: 10,
                    height: 45
                }
            }}
        />
    }
}
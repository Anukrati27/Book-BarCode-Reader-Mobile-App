import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';

export class AboutScreen extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.view}>
                <ImageBackground source={require('./images/pink.jpg')} style={styles.backgroundImage}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}> { `Welcome to Anukrati's\n Book Barcode Reader`}  </Text>
                    </View>
                    <View >
                        <Text style={styles.textView}> {`
                                \nCreated By: Anukrati
                                \nVersion: 1.0
                                \nPlatform Used: React Native, Visual Code, Xde, Expo Client
                                \nDatabase Used: Sqlite
                                \nComponents Used: Stack Navigator(for switching screens),  BarCodeScanner(for scanning barcodes)
                                \nAPI Used: Google API for getting book details from ISBN  
				\nDesign Pattern: Singleton 
                            `}
                        </Text>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%'
    },
    textView:{
        fontSize: 15,
        lineHeight: 15,
        height: '70%',
        width: '90%',
        margin: 10,
        padding: 10,
    },
    backgroundImage: {
        width: '100%', 
        height: '100%',
    },
    header: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        height: '30%',
        width: '100%',                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
      },
      headerText: {
        color: 'black',
        flex: 1,
        padding: 20,
        fontSize: 30,
        fontWeight: 'bold',
        textShadowColor: 'white',
        fontFamily: 'Helvetica',
        alignItems: 'center',
        justifyContent: 'center',  
        height: '100%',
        width: '100%', 
      },
  });

import React from 'react';
import { Image, ImageBackground, TouchableOpacity, StyleSheet, Text, View } from 'react-native';


export class HomeScreen extends React.Component{
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.scanBarCode = this.scanBarCode.bind(this);
        this.showAllData = this.showAllData.bind(this);
    }

    render() {
        return (
            <View style={styles.view}>
                <ImageBackground source={require('./images/pink.jpg')} style={styles.backgroundImage}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}> { `Welcome to Anukrati's\n Book Barcode Reader`}  </Text>
                    </View>
                    <View style={styles.buttonView}>
                        <View style={styles.aboutButtonView}>
                            <TouchableOpacity onPress={this.submit}>
                                <Image style={styles.aboutButton} source={require('./images/about1.png')}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.rowView}>
                            <TouchableOpacity onPress={this.scanBarCode}>
                                <Image style={styles.scanButton} source={require('./images/scan.png')}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.showAllData}>
                                <Image style={styles.bookListButton} source={require('./images/books.png')}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    }

    submit()  {
        this.props.navigation.navigate('About');
    }

    scanBarCode()  {
        var database = this.database
        this.props.navigation.navigate('Scanner');
    }
    async showAllData()  {
        var database = this.database
        this.props.navigation.navigate('ShowAllData');
    }

}
const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width:'100%'
    },
    buttonView: {
        flex: 1,
        height: '70%',
        width:'100%',
        //padding: 10,
    },
    backgroundImage: {
        width: '100%', 
        height: '100%',
    },
    aboutButtonView:{
        flex:1,
        //backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        margin: 10,
        width: '50%',
    },
    aboutButton: {
        flex: 1,
        padding: 10,
        aspectRatio: 5,
        resizeMode: 'contain',
        margin: 10
    },
    rowView: {
        flex: 3,
        flexDirection: 'row',
        alignSelf: 'center',
        //backgroundColor: 'orange',
        justifyContent:'space-between',
        margin: 10,
        width: '100%',
    },
    scanButton: {
        flex: 1,
        padding: 5,
        aspectRatio: 1,
        resizeMode: 'contain',
        margin: 20
     },
     bookListButton: {
        flex: 1,
        padding: 5,
        aspectRatio: 1,
        resizeMode: 'contain',
        margin: 30
     },
    header: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        height: '30%',
        width: '100%', 
        margin: 10                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
      },
      headerText: {
        flex: 1,
        color: 'black',
        padding: 20,
        fontSize: 30,
        fontWeight: 'bold',
        textShadowColor: 'white',
        fontFamily: 'Helvetica',
        alignItems: 'center',
        justifyContent: 'center',   
      },
  });


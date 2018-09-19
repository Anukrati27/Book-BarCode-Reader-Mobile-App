import React from 'react';
import { Image, ImageBackground, StyleSheet, Button, Text, View, Alert, TouchableHighlight } from 'react-native';
import { ReactNativeSQLite2Test } from './database';
import { BarCodeScanner, Permissions } from 'expo';


export class ScannerScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            cameraAccess: null,
            status: true,
            scannedData: ''
        };
    }

    toggleStatus(){
        this.setState({ status:!this.state.status });
        console.log('toggle button handler: '+ this.state.status);
    }

    componentDidMount() {
        this.getCameraAccess();
    }

    async getCameraAccess() {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);

        if (status === 'granted'){
            this.setState( {"cameraAccess": true} );
        }
        else{
            this.setState( {"cameraAccess": false} );
        }
    }

    render() {
        console.log(this.state.cameraAccess);
        if( this.state.cameraAccess === null ){
            return(
                <View>
                    <Text> Waiting to get camera Access</Text>
                </View>
            );
        }
        if( this.state.cameraAccess === false ){
            return(
                <View>
                    <Text>{`User does not have camera Access. \nTry Restarting the application.`}</Text>
                </View>
            );
        }
        if( this.state.cameraAccess === true ){
            return(
                <View style={styles.view}>
                    <ImageBackground source={require('./images/pink.jpg')} style={styles.backgroundImage}>
                        <View style={styles.header}>
                            <Text style={styles.headerText}> { `Welcome to Anukrati's\n Book Barcode Reader`}  </Text>
                        </View>
                        <View style={styles.scannerPageView}>
                        {
                            this.state.status ?
                                <View style={styles.barCodeScannerView}>
                                    <BarCodeScanner onBarCodeRead={this.readBarCodeData}
                                        style={styles.barCodeScanner} /> 
                                </View>
                            :
                                <View style={styles.bookDetail}>
                                    <View style={styles.textView}>
                                        <Text style={styles.textViewHeading}>Book Details</Text>
                                        <Text style={styles.text}>{this.state.scannedData}</Text>
                                    </View>
                                    <View style={styles.buttonView}>
                                        <TouchableHighlight onPress={()=>this.toggleStatus()}>
                                            <Image style={styles.scanButton} source={require('./images/scan.png')}/>
                                        </TouchableHighlight>    
                                    </View>           
                                </View>
                        }
                        </View>
                    </ImageBackground>
                </View>
            );
        }
    }

    readBarCodeData = ( data) => {	
        this.setState({status: false}); 
        this.getBookDetails(data["data"]);
    }

    getBookDetails(isbn) {

        var url = "https://www.googleapis.com/books/v1/volumes?q=isbn:" + isbn + "&country=US";
        fetch(url)
           .then((response) => response.json())
           .then((responseData) => {

            if (responseData.totalItems) {
                var book = responseData.items[0];
                var title = (book["volumeInfo"]["title"]);
                var authors = (book["volumeInfo"]["authors"]);
                var pageCount = (book["volumeInfo"]["pageCount"]);
                var publisher = (book["volumeInfo"]["publisher"]);
               
                var author = ""
                if( authors) {
                    author = authors.toString() 
                   }
                if(author === "")
                   author = "unknown"
                data = [isbn, title, author, pageCount, publisher];
               
                ReactNativeSQLite2Test.getInstance().insertDataInDB(data);

                textData = "ISBN: "+ isbn + "\nTitle: " + title + "\nAuthor: "+ author +
                           "\nPage Count: " + pageCount + "\nPublisher: " + publisher + "\n"
                this.setState({scannedData: textData});
            }else{
                textData = "Google Book store has no book \n with ISBN: " + isbn;
                this.setState({scannedData: textData});
            }
           }).done();
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
    bookDetail:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textViewHeading: {
        flex: 1,
        fontSize: 20,
        fontWeight: 'bold',
        padding: 2,
    },
    text:{
        flex: 6,
        fontSize: 15,
        padding: 10,
    },
    buttonView:{
        flex: 1,
        padding: 20,
        margin:10,
    },
    textView:{
        flex: 5,
        padding: 10,
    },
    scanButton: {
        flex:1,
        padding: 5,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
     },
    scannerPageView: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    barCodeScannerView: {
        flex: 0.7,
        padding: 5, 
        alignItems: 'center',
        justifyContent: 'center',
        width: '70%',
    },
    barCodeScanner: { 
        flex: 1,
        padding: 5,
        aspectRatio: 1,
        margin: 20,
    },
    backgroundImage: {
        width:'100%',
        flex:1 ,
    },
    header: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
      },
      headerText: {
        color: 'black',
        flex: 1,
        padding: 20,
        fontSize: 28,
        fontWeight: 'bold',
        textShadowColor: 'white',
        fontFamily: 'Helvetica',
        alignItems: 'center',
        justifyContent: 'center',  
      },
  });
import React from 'react';
import { ScrollView, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { ReactNativeSQLite2Test } from './database';

export class ShowAllDataScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            textData: ''
        };
    }
    componentDidMount() {
        ReactNativeSQLite2Test.getInstance().fetchData().then((result) => {
            console.log("\n\n\nresult is ",result)
            var len = result.rows.length;
            textData = ""
            for (let i = 0; i < len; i++) {
                let row = result.rows.item(i);
                textData = textData + "\n\nBook Id: " + row.bookId + "\nISBN: "+ row.isbn + "\nTitle: " + row.title + "\nAuthor: "+ row.authors+
                           "\nPage Count: " + row.pageCount + "\nPublisher: " + row.publisher + "\n"
                console.log("\n\n\nrow is ",row)
            }
            this.setState({ textData: textData });
        })
      }
      
    render() {
        console.log("\n\n\ntextData is ",this.state.textData)
        return (
            
            <View style={styles.view}>
                <ImageBackground source={require('./images/pink.jpg')} style={styles.backgroundImage}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}> { `Welcome to Anukrati's\n Book Barcode Reader`}  </Text>
                    </View>
                    <View style={styles.textView}>
                        <ScrollView>
                            <Text style={styles.text}> {this.state.textData}</Text>
                        </ScrollView>
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
        width: '100%',
    },
    textView:{
        flex: 3,
        padding:20
    },
    text:{
        fontSize: 15,
        lineHeight: 15,
        flexWrap: "wrap"
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
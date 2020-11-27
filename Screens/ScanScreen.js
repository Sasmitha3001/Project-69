import React from 'react';
import { StyleSheet, Text, View,Image, TouchableOpacity} from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';
import { askAsync } from 'expo-permissions';

export default class ScanScreen extends React.Component{
    constructor(){
        super()
        this.state={
            cameraPermission:null,
            scanned:false,
            scannedData:'',
            buttonState:'normal'
        }
    }
    getCameraPermission=async()=>{
        const {status}=await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
            buttonState:'clicked',
            cameraPermission:status==='granted'
        })
        
        }
    

    handleBarCodeScanner=async(type,data)=>{
        this.setState({
            scanned:true,
            buttonState:'normal',
            scannedData:data
        })
    }



    render(){
        const cameraPermission= this.state.cameraPermission
        const scanned=this.state.scanned
        const buttonState=this.state.buttonState
        const scannedData=this.state.scannedData

       if(cameraPermission===true && buttonState==='clicked'){
           return(
               <BarCodeScanner
               onBarCodeScanned={scannedData ? undefined : this.handleBarCodeScanner()}
               style={StyleSheet.absoluteFillObject}
               />
           )

       }

       else if(buttonState==='normal'){
        return(
            <View style={styles.container}>
                <TouchableOpacity style={styles.header}>
                    <Text style={styles.headerText}>Bar Code Scanner</Text>
                </TouchableOpacity>

                <Image
                source={require('../assets/Barcode-scanner.jpg')}
                style={styles.image}
                />

                <TouchableOpacity 
                style={styles.scanButton}
                onPress={this.getCameraPermission}
                >
                    <Text style={styles.buttonText}>Scan Data</Text>
                </TouchableOpacity>

                <Text style={styles.text}>{cameraPermission===true ? this.state.scannedData:"Request Camera Permissions"} </Text>
            </View>

        )

       }
    }
}

const styles=StyleSheet.create({

    image:{
        width:200,
        height:200,
        alignSelf:'center',
        marginTop:'10%'
    },
    scanButton:{
        backgroundColor:"orange",
        width:150,
        height:50,
        marginTop:50,
        marginLeft:50,
        borderRadius:100
    },
    buttonText:{
        color:"white",
        textAlign:'center',
        fontWeight:'bold',
        alignItems:'center',
        fontSize:25,
        marginTop:5
    },
    container:{
        flex:1,
        alignItems:'center'
    },
    header:{
        backgroundColor:'red',
        width:'100%',
        height:85,
        marginTop:20
    },
    headerText:{
        color:"white",
        textAlign:'center',
        fontWeight:'bold',
        textAlign:'center',
        fontSize:35,
        marginTop:20
    },
    text:{
        marginTop:50,
        marginLeft:50,
        textAlign:'center',
        fontWeight:'bold',
        fontSize:25
    }

})
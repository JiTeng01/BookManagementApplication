import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Alert } from 'react-native';

import BarcodeScanner, {
    Exception,
    FocusMode,
    TorchMode,
    CameraFillMode,
    BarcodeType,
} from 'react-native-barcode-scanner-google';



export default class BarcodeApp extends Component {
    static navigationOptions =
 {
    title: 'Scan barcode',

 };
 componentWillUnmount() {
    this.props.navigation.state.params.barcode()
  }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <BarcodeScanner
                    style={{ flex: 1 }}
                    onBarcodeRead={({ data, type }) => {
                        this.props.navigation.navigate('Search_Isbn',{UserId:this.props.navigation.state.params.UserId, isbn:data});
                    }}
                    onException={exceptionKey => {
                        // check instructions on Github for a more detailed overview of these exceptions.
                        switch (exceptionKey) {
                            case Exception.NO_PLAY_SERVICES:
                            // tell the user they need to update Google Play Services
                            case Exception.LOW_STORAGE:
                            // tell the user their device doesn't have enough storage to fit the barcode scanning magic
                            case Exception.NOT_OPERATIONAL:
                            // Google's barcode magic is being downloaded, but is not yet operational.
                            default:
                                break;
                        }
                    }}
                    focusMode={FocusMode.AUTO /* could also be TAP or FIXED */}
                    torchMode={TorchMode.ON /* could be the default OFF */}
                    cameraFillMode={
                        CameraFillMode.COVER /* could also be FIT */
                    }
                    barcodeType={
                        BarcodeType.CODE_128 |
                        BarcodeType.EAN_13 |
                        BarcodeType.EAN_8 /* replace with ALL for all alternatives */
                    }
                />
            </View>
        );
    }
}

AppRegistry.registerComponent('BarcodeApp', () => BarcodeApp);

import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';


const styles = StyleSheet.create({
    baslik: {
        color: 'gray',
        fontSize: 30
    },
});

class Resim extends Component {

    constructor(props) {
        super(props);
        this.state = {
            goster: true,
        };
    }

    componentDidMount() {
        var headers = new Headers();
        headers.append("Authorization", "Basic YmVrY2lBcHA6MTIzNDEyMzQ=");

        fetch('https://burdursais.onlinecevre.com.tr/v1/site/69/channels', {
            method: 'GET',
            headers: headers,

        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({channels: responseJson.channels});
            })
            .catch((error) => {
                console.error(error);
            });


        function yenile() {

            fetch('https://burdursais.onlinecevre.com.tr/v1/site/69/instantaneous', {
                method: 'GET',
                headers: headers,

            })
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({instantaneous: responseJson.instantaneous});
                })
                .catch((error) => {
                    console.error(error);
                });
        }

        this.interval = setInterval(() => this.setState(yenile), 10000);
    };

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {

        console.log(this.state.instantaneous)
        var dataChannelss = this.state.instantaneous;

        if (dataChannelss === undefined) {
            return null;
        }

        return (

            <View>
                <View style><Text style={styles.baslik}>Burdur Sais</Text>
                </View>
                <FlatList
                    data={dataChannelss}
                    keyExtractor={item => item.channelId.toString()}
                    renderItem={({item}) => <View>
                        <Text>{item.channelId.toString()} - {item.value}</Text>
                    </View>}
                />
            </View>

            // <View style={{flex: 1, width: '100%'}}>
            //     <View style={{flex: 2, alignItems: "center"}}>
            //         <Text style={this.state.goster ? umyStyle.gri : umyStyle.siyah}>{this.props.channels} </Text>
            //     </View>
            // </View>

        );
    }
}

export default class HelloReact extends Component {

    render() {
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <Resim/>
            </View>
        );
    }
}
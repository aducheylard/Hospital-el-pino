import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, Button, Alert, TouchableOpacity, TextInput, TouchableHighlight } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { Divider } from 'react-native-elements';
//import { Table, Row, Rows } from 'react-native-table-component';

class visita extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nombre: '',
            rut: '',
            telefono: '22',
            edad: '',
            tableHead: ['Head', 'Head2', 'Head3', 'Head4'],
            tableData: [
                ['1', '2', '3', '4'],
                ['a', 'b', 'c', 'd'],
                ['1', '2', '3', '456\n789'],
                ['a', 'b', 'c', 'd']
            ]
        };
    };
    fetchData = async () => {
        const response = await fetch('http://localhost:1348/credenciales')
        const paciente = await response.json();
        var id_pac = this.props.navigation.state.params.id_paciente
        this.setState({ data: paciente, loading: false });
        for (var i = 0; i < paciente.length; i++) {
            if (paciente[i].id == id_pac) {
                //this.setState({ telefono: paciente[i].tel});
            }
        }
    }
    componentDidMount() {
        this.fetchData();
    }


    render() {
        return (
            <View>
                <View style={styles.container}>
                    <Image style={styles.logo1} source={require("../assets/perfil.png")}></Image>
                </View>
                <Divider style={{ backgroundColor: "#696969", height: 3, marginVertical: 7, marginHorizontal: 7 }}></Divider>
                <Text style={styles.titleitem}>Nombre: {this.props.navigation.state.params.nombre}</Text>
                <Text style={styles.titleitem}>Rut: {this.props.navigation.state.params.rut}</Text>
                <Text style={styles.titleitem}>Edad: {this.props.navigation.state.params.edad}</Text>
                <Text style={styles.titleitem}>Telefono: {this.state.telefono}</Text>
            </View>
        )
    }
}
export default visita
const styles = StyleSheet.create({
    form: {
        backgroundColor: 'white',
        marginVertical: 15,
        marginHorizontal: 10

    },
    textform: {
        paddingVertical: 5,
        paddingLeft: 5

    },
    titleitem: {
        marginVertical: 1,
        textAlign: "left",
        fontSize: 20,
        backgroundColor: "#808080",
        marginHorizontal: 10,
        color: "white",
        paddingLeft: 10
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: "flex-start",
        alignItems: "center",
    },
    logo1: {
        width: 150,
        height: 150,
        alignItems: "center",
        marginTop: 15,

    },
    button1: {
        elevation: 10,
        backgroundColor: "#009688",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginVertical: 10,
        minWidth: "70%",
        borderRadius: 30,
        marginHorizontal: 20
    },
    buttontext1: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
    logo: {
        width: 150,
        height: 150,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    head: {
        height: 40,
        backgroundColor: '#f1f8ff'
    },
    text: {
        margin: 6
    }

})
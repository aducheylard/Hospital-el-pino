import { Component } from 'react'
import { StyleSheet, Text, View, Image, Button, Alert, TouchableOpacity, requireNativeComponent } from 'react-native'
import React from 'react'
import { WebView, Linking } from 'react-native';
import { Divider } from 'react-native-elements';

class map extends Component {
    constructor(props) {
        super(props)
        this.state = {
            direcciones: [],
            pacientes: [],
            pacienteactual: [],
            posactual: "",
            id_ruta: "",
            loading: true
        };
    };
    fetchData = async () => {
        const response = await fetch('http://localhost:1348/rutas')
        const ruta = await response.json();
        var splitdir = ruta[ruta.length - 1].direcciones_ordenadas.substr(1, ruta[ruta.length - 1].direcciones_ordenadas.length - 2)
        this.setState({ posactual: ruta[ruta.length - 1].pos_actual })
        this.setState({ id_ruta: ruta[ruta.length - 1].id })
        var splitdir1 = splitdir.split("'")
        var direccioneslistas = []
        var k = 0
        for (var i = 1; i < splitdir1.length; i = i + 2) {
            direccioneslistas[k] = splitdir1[i]
            k = k + 1
        }
        this.setState({ direcciones: direccioneslistas });
        var pacientesavisitar = ruta[ruta.length - 1].pacientes
        var pacientesavisitar = pacientesavisitar.substr(1, pacientesavisitar.length - 2)
        var pacientesavisitarsplited = pacientesavisitar.split(",")
        const response1 = await fetch('http://localhost:1348/visitas')
        const paciente = await response1.json();
        var infopacientes = []
        var npaciente = 0
        for (var i = 0; i < paciente.length; i++) {
            for (var j = 0; j < pacientesavisitarsplited.length; j++) {
                if (paciente[i].id_paciente == pacientesavisitarsplited[j]) {
                    infopacientes[npaciente] = paciente[i]
                    npaciente++
                }
            }
        }
        this.setState({ pacientes: infopacientes })
        this.setState({ pacienteactual: infopacientes[ruta[ruta.length - 1].pos_actual] })
    }
    UpdateData = async () => {
        var posactualizada = this.state.posactual + 1
        var data = { pos_actual: posactualizada, id: this.state.id_ruta }
        const options = {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        }
        this.props.navigation.navigate('Detallevisita')
        const response = await fetch('http://localhost:1348/posactualedit', options);
    }
    generarmapa = () => {
        const iniciourl = "https://www.google.com/maps/dir/"
        var dir1 = this.state.direcciones[this.state.posactual]
        var dir2 = this.state.direcciones[this.state.posactual + 1]
        var urlmapa = iniciourl + dir1 + "/" + dir2
        window.open(urlmapa,'_blank')
    }
    componentDidMount() {
        this.fetchData();
    }

    render() {
        const uri = 'http://stackoverflow.com/questions/35531679/react-native-open-links-in-browser';
        return (
            <View style={styles.container}>
                <View style={styles.container}>
                    <Image style={styles.logo1} source={require("../assets/perfil.png")}></Image>
                </View>
                <Divider style={{ backgroundColor: "#696969", height: 3, marginVertical: 7, marginHorizontal: 7 }}></Divider>
                <Text style={styles.titleitem}>Nombre: {this.state.pacienteactual.nombre}</Text>
                <Text style={styles.titleitem}>Rut: {this.state.pacienteactual.rut}</Text>
                <Text style={styles.titleitem}>Domicilio: {this.state.pacienteactual.domicilio} {this.state.pacienteactual.num_domicilio}</Text>
                <View style={styles.buttoncontainer}>
                    <TouchableOpacity style={styles.button1} onPress={this.generarmapa} >
                        <Text style={styles.buttontext1} > Ver Mapa</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button1} onPress={this.UpdateData} >
                        <Text style={styles.buttontext1}>Iniciar Visita</Text>
                    </TouchableOpacity>
                    <Image style={styles.logo} source={require("../assets/logo.png")}></Image>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    buttoncontainer: {
        flex: 5,
        flexDirection: 'column',
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: 60

    },
    logo: {
        width: 300,
        height: 300,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    button1: {
        elevation: 10,
        backgroundColor: "#009688",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginVertical: 10,
        minWidth: "70%",
        borderRadius: 30
    },
    buttontext1: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
    negrita: {
        fontWeight: "bold"
    },
    header: {
        flex: 0.05,
        flexDirection: 'row',
        marginTop: 40,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#c1bfbf"
    },
    body: {
        flex: 0.2,
        alignItems: 'center',
        marginBottom: 150,
        marginTop: 0
    },
    footer: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: "flex-end",
        position: "relative",
        bottom: 0,
    },
    titleitem : {
        marginVertical : 1,
        textAlign : "left",
        fontSize : 20,
        backgroundColor : "#808080",
        marginHorizontal : 10,
        color : "white",
        paddingLeft : 10
    }
})

export default map

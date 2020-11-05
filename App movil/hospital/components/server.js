const { json } = require('express');
var express = require('express');
var app = express();
const { Client } = require('pg')
var bodyParser = require('body-parser');
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));

const connectionData = {
    host: 'hospital-db.crxchedgxtom.us-east-2.rds.amazonaws.com',
    port: '5432',
    user: 'postgres',
    password: '12344321',
    database: 'Hospital-DB'
}
const client = new Client(connectionData)


client.connect(function (error) {
    if (error) console.log(error);
    else console.log("connected");
})


var server = app.listen(1348, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("start");
});

app.get('/credenciales', function (req, res) {
    client.query('SELECT * FROM usuarios_perfil', function (error, rows, fields) {
        if (error) console.log(error);
        else {
            var fin = JSON.stringify(rows).indexOf("}]") - 50
            var consulta = JSON.stringify(rows).substr(JSON.stringify(rows).indexOf("["), fin)
            res.send(JSON.parse(consulta));
            console.log("envio credenciales")
            console.log(JSON.parse(consulta))
        }
    });
});
app.get('/perfil', function (req, res) {
    client.query('SELECT * FROM auth_user', function (error, rows) {
        if (error) console.log(error);
        else {
            var fin = JSON.stringify(rows).indexOf("}]") - 50
            var consulta = JSON.stringify(rows).substr(JSON.stringify(rows).indexOf("["), fin)
            res.send(consulta);
            console.log("envio perfi")
        }
    });
});
app.get('/personal', function (req, res) {
    client.query('SELECT * FROM usuarios_personal', function (error, rows) {
        if (error) console.log(error);
        else {
            var fin = JSON.stringify(rows).indexOf("}]") - 49
            var consulta = JSON.stringify(rows).substr(JSON.stringify(rows).indexOf("["), fin)
            res.send(consulta);
            console.log("envio personal")
        }
    });
});
app.get('/visitas', function (req, res) {
    client.query('SELECT * FROM public.visita_visita', function (error, rows) {
        if (error) console.log(error);
        else {
            var fin = JSON.stringify(rows).indexOf("}]") - 50
            var consulta = JSON.stringify(rows).substr(JSON.stringify(rows).indexOf("["), fin)
            res.send(consulta);
            console.log("envio visitas")
        }
    });
});
app.get('/rutas', function (req, res) {
    client.query('SELECT * FROM public.rutas_ruta where id=42;', function (error, rows) {
        if (error) console.log(error);
        else {
            var fin = JSON.stringify(rows).indexOf("}]") - 49
            var consulta = JSON.stringify(rows).substr(JSON.stringify(rows).indexOf("["), fin)
            res.send(consulta);
            console.log("envio rutas")
        }
    });
});
/*app.get('/penetracion', function (req, res) {
    console.log("penetrando weas!")
    client.query('INSERT INTO public.visita_tiempos(id, item, tiempo) VALUES (1, 1, 1);', function (error, rows) {
        if (error) console.log(error);
        else {
            var fin = JSON.stringify(rows).indexOf("}]") - 50
            var consulta = JSON.stringify(rows).substr(JSON.stringify(rows).indexOf("["), fin)
            res.send(consulta);
            console.log("envio perfi")
        }
    });
});*/
app.post('/perfiledit', (req, res) => {
    let data = req.body;
    var updatetel = "UPDATE public.usuarios_perfil SET tel="+data.telefono+" WHERE id="+data.id+";"
    var updateemail = "UPDATE public.auth_user SET email="+"\'"+data.email+"\'"+" WHERE id="+data.id+";"
    console.log(updateemail)
    //var insert = "INSERT INTO public.visita_tiempos(id, item, tiempo) VALUES ("+data.username+","+data.username+","+data.username+");"
    console.log(updatetel)
    //console.log(data.username);
    client.query(updateemail, function (error, rows) {
        if (error) console.log(error);
    });
    client.query(updatetel, function (error, rows) {
        if (error) console.log(error);
    });
    
});
app.post('/posactualedit', (req, res) => {
    let data = req.body;
    //var updatepos = "UPDATE public.usuarios_perfil SET tel="+data.telefono+" WHERE id="+data.id+";"
    var updatepos = "UPDATE public.rutas_ruta SET pos_actual="+data.pos_actual+ " WHERE id="+data.id+";"
    console.log(updatepos)
    client.query(updatepos, function (error, rows) {
        if (error) console.log(error);
    });
});

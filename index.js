const express = require('express');
const app = express();
const port = 3000;
//Loads the handlebars module
const handlebars = require('express-handlebars');
var path = require('path');
const axios = require('axios');

const bodyParser = require('body-parser');



//Sets our app to use the handlebars engine
app.set('view engine', 'handlebars');
//Sets handlebars configurations (we will go through them later on)
app.engine('handlebars', handlebars({
layoutsDir: __dirname + '/views/layouts',
}));
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
//Serves the body of the page aka "main1.handlebars" to the container //aka "index.handlebars"
res.render('main1');
});

app.get('/login', (req, res) => {
//Serves the body of the page aka "main1.handlebars" to the container //aka "index.handlebars"
res.render('login');
});

app.get('/main1', (req, res) => {
    //Serves the body of the page aka "main1.handlebars" to the container //aka "index.handlebars"
    res.render('main1');
    });

app.get('/register', (req, res) => {
    //Serves the body of the page aka "main1.handlebars" to the container //aka "index.handlebars"
    res.render('register');
    });

    app.get('/dlogin', (req, res) => {
        //Serves the body of the page aka "main1.handlebars" to the container //aka "index.handlebars"
        res.render('dlogin');
        });

app.get('/selectdoc', async(req, res) => {
    //Serves the body of the page aka "main1.handlebars" to the container //aka "index.handlebars"
    // const response = await axios.get('https://virtual-clinic-57b51.firebaseio.com/doctorInfo.json');
    // console.log(req.body)
    res.render('selectdoc');
    });


    app.post('/main1',async(req, res)=>{
        const response = await axios.get('https://virtual-clinic-57b51.firebaseio.com/userInfo.json');
        console.log(response.data);
        for(var key in response.data)
        {
            console.log(response.data[key])
            var user = response.data[key];
            if(user.email === req.body.email && user.password === req.body.password)
            {
                
                return res.render('main1',{email : req.body.email.toString()});
            }
        } 
    })

    app.post('/main2',async(req, res)=>{
        const response = await axios.get('https://virtual-clinic-57b51.firebaseio.com/doctorInfo.json');
        for(var key in response.data)
        {
            var user = response.data[key];
            if(user.emailid === req.body.email && user.pwd === req.body.password)
            {
                const response = await axios.get('https://virtual-clinic-57b51.firebaseio.com/userInfo.json');
                for(var key1 in response.data)
                {
                    var user1 = response.data[key1];
                    if(user1.email === user.pat1)
                    {
                        return res.render('main2',{email : user1.email, contact: user1.contact , symptoms: user1.symptoms  });
                    }
                } 
                
                
            }
        } 
    })



    app.post('/symptoms',async(req, res)=>{
        console.log(req.body);
        const response = await axios.get('https://virtual-clinic-57b51.firebaseio.com/userInfo.json');
        name1 = ''
        for(var key in response.data)
        {

            var user = response.data[key];
            if(user.email === req.body.token)
            {
                name1=key
                const obj = {
                    'symptoms': req.body.symptoms,
                }
                const response = await axios.patch(`https://virtual-clinic-57b51.firebaseio.com/userInfo/${name1}.json`, obj);
                
                console.log("Hi");
                return res.redirect('selectdoc');;           
             }
            } 
        
        
    })


    app.post('/sel1',async(req, res)=>{
        console.log(req.body.token)

        const obj = {
            'pat1': req.body.token,
        }
        const response1 = await axios.patch('https://virtual-clinic-57b51.firebaseio.com/doctorInfo/one.json',obj);
        
        const response = await axios.get('https://virtual-clinic-57b51.firebaseio.com/userInfo.json');
        name1 = ''
        for(var key in response.data)
        {

            var user = response.data[key];
            if(user.email === req.body.token)
            {
                name1=key
                const obj = {
                    'doctor': 'one',
                }
                const response = await axios.patch(`https://virtual-clinic-57b51.firebaseio.com/userInfo/${name1}.json`, obj);
                
                console.log("Hi");
             }
            } 


        return res.render('thankyou')




        
        
    })

    app.post('/sel2',async(req, res)=>{
        console.log(req.body.token)
        const obj = {
            'pat1': req.body.token2,
        }
        const response2 = await axios.patch('https://virtual-clinic-57b51.firebaseio.com/doctorInfo/two.json',obj);
        
        const response = await axios.get('https://virtual-clinic-57b51.firebaseio.com/userInfo.json');
        name1 = ''
        for(var key in response.data)
        {

            var user = response.data[key];
            if(user.email === req.body.token2)
            {
                name1=key
                const obj = {
                    'doctor': 'two',
                }
                const response = await axios.patch(`https://virtual-clinic-57b51.firebaseio.com/userInfo/${name1}.json`, obj);
                
                console.log("Hi");
             }
            } 
        
        return res.render('thankyou')
        
        
    })

    app.post('/sel3',async(req, res)=>{
        
        const obj = {
            'pat1': req.body.token3,
        }
        const response3 = await axios.patch('https://virtual-clinic-57b51.firebaseio.com/doctorInfo/three.json',obj);
        
        const response = await axios.get('https://virtual-clinic-57b51.firebaseio.com/userInfo.json');
        name1 = ''
        for(var key in response.data)
        {

            var user = response.data[key];
            if(user.email === req.body.token3)
            {
                name1=key
                const obj = {
                    'doctor': 'three',
                }
                const response = await axios.patch(`https://virtual-clinic-57b51.firebaseio.com/userInfo/${name1}.json`, obj);
                
                console.log("Hi");
             }
            } 
        
        
        return res.render('thankyou')
        
        
    })

    app.post('/register',async(req, res)=>{
        console.log(req.body);
        if(req.body.email === null || req.body.email.trim().length === 0)
        {
            console.log('Name should not be empty');
            return;
        }
        if(req.body.password === null || req.body.password.trim().length === 0)
        {
            console.log('Password should not be empty');
            return;
        }
        if(req.body.contact < 10 || req.body.conact > 10)
        {
            console.log('Contact can be less or greater than 10');
            return;
        }
    
        const obj = {
            'email': req.body.email,
            'password': req.body.password,
            'contact': req.body.contact,
            'symptoms': req.body.symptoms,
            'doctor': req.body.doctor
        }
        const response = await axios.post('https://virtual-clinic-57b51.firebaseio.com/userInfo.json', obj);
        console.log(response);
        return res.render('main1');
    })


app.listen(port, () => console.log(`App listening to port ${port}`));
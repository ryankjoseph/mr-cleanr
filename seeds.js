
require('dotenv').config();
require('./config/database');
const User = require('./models/user');

const Appointment = require('./models/appointment');

const service1={
    name: "Tier 1",
    price: 10,
    minimumHours: 4
};
const service2={
    name: "Tier 2",
    price: 20,
    minimumHours: 3
};
const service3={
    name: "Tier 3",
    price: 50,
    minimumHours: 2
};
const user1= {
    name: 'testUser',
    email: 'test@test.com',
    displayName: 'test',
    joined: Date.now(),
    password:"password",
    roles:[{role:'client'}],
    location:{
        address:"290 Bremner Blvd",
        city: "Toronto",
        region: "Ontario",
        country:"Canada",
        postalCode:"M5V 3L9"
    },
    latitude:43.642567,
    longitude:-79.387054,
};

const user2 = {
    name: 'clientUser',
    email: 'client@test.com',
    displayName: 'Client Only',
    joined: Date.now(),
    password:"password",
    roles:[{role:'client'}],
    location:{
        address:"24 Venn Crescent",
        city: "York",
        region: "Ontario",
        country:"Canada",
        postalCode:"M6M 1S4"
    },
    latitude:43.691390,
    longitude:-79.466690,
};


const user3 = {
    name: 'agentUser',
    email: 'agent@test.com',
    displayName: 'Agent Only',
    joined: Date.now(),
    services:[service1, service2, service3],
    password:"password",
    roles:[{role:'agent'}],
    location:{
        address:"100 King St W",
        unit:"CM5",
        city: "Toronto",
        region: "Ontario",
        country:"Canada",
        postalCode:"M5H 1T1"
    },
    latitude:43.649790,
    longitude:-79.382480,
};
const user4 = {
    name: 'dualUser',
    email: 'doubleAgent@test.com',
    displayName: 'Chanel',
    joined: Date.now(),
    password:"password",
    services:[service1, service2, service3],
    roles:[{role:'agent'},{role:'client'}],
    location:{
        address:"347 Lynnwood Dr",
        city: "Oakville",
        region: "Ontario",
        country:"Canada",
        postalCode:"L6H 1M7"
    },
    latitude:43.4687395,
    longitude:-79.6907081,
};


const user5={
    name: 'doubleAgent',
    email: 'agent2@test.com',
    displayName: 'WhichSide',
    services:[service1, service2, service3],
    joined: Date.now(),
    password:"password",
    roles:[{role:'agent'}],
    location:{
        address:"385 Fairway Rd S",
        unit:"205",
        city: "Kitchener",
        region: "Ontario",
        country:"Canada",
        postalCode:"N2C 2N9"
    },
    latitude:43.42013,
    longitude:-80.438676,
};
function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
(async function() {




    await User.deleteMany({});
    const users = await User.create([user1, user2, user3, user4, user5]);
    console.log(`USERS ----> ${users}`);
       // console.log(`Users----->${users}`)

    const agent1 = await User.findOne({"name": "agentUser"})._id
    const client1 = await User.findOne({'name':'testUser'})._id
    const agent2 = await User.findOne({"name": "doubleAgent"})._id
    const client2 = await User.findOne({"name": "clientUser"})._id
    await Appointment.deleteMany({})

    // /confirmed
    // pending
    // cancelled
    //today 4 hours
    const time1 = new Date();

    const time2 = new Date();
    const newHour = time2.getHours()+3;;
    time2.setHours(newHour);

    const time3 = new Date();
    const newDate = time3.getDate()+2;
    time3.setDate(newDate);

    const time4 = new Date();
    time4.setDate(newDate);
    const newHour2 = time3.getHours()+5;
    time4.setHours(newHour2);

    const time5 = new Date();
    const newDate2 = time5.getDate()+4;
    time5.setDate(newDate2);

    const time6 = new Date();
    time6.setDate(newDate2);
    const newHour3= time6.getHours()+3;
    time6.setHours(newHour3) ;

    const time7 = new Date();
    const newMonth = time7.getMonth() +1;
    time7.setMonth(newMonth);

    const time8 = new Date();
    time8.setMonth(newMonth);
    const newHour4 = time7.getHours()+4;
    time8.setHours(newHour4);


    const time9 = new Date();
    const newMonth1 = time9.getMonth() +1;
    time9.setMonth(newMonth1);
    const newDate3 = time9.getDate()+4;
    time9.setDate(newDate3);

    const time10 = new Date();
    time10.setMonth(newMonth1);
    time10.setDate(newDate3);
    const newHour5 = time10.getHours() +3;
    time10.setHours(newHour5);

    const appointment1 = {
        serviceName: service1.name,
        servicePrice:service1.price,
        startTime: time1,
        endTime: time2,
        status: 'confirmed',
        client: users[0],
        agent: users[3],

    };
    const appointment2 = {
        serviceName: service2.name,
        servicePrice:service2.price,
        startTime: time3,
        endTime: time4,
        status: 'pending',
        client: users[1],
        agent: users[3],

    };

    const appointment3 = {
        serviceName:service2.name,
        servicePrice:service2.price,
        startTime: time5,
        endTime: time6,
        status: 'cancelled',
        client: users[0],
        agent: users[3],
    };

    const appointment4 = {
        serviceName:service3.name,
        servicePrice:service3.price,
        startTime: time7,
        endTime: time8,
        status: 'confirmed',
        client:users[0],
        agent: users[3],
    };

    const appointment5 = {
        serviceName:service3.name,
        servicePrice:service3.price,
        startTime: time9,
        endTime: time10,
        status: 'pending',
        client: users[3],
        agent: users[1],
    };
try{
    const appointments = await Appointment.create([ appointment1, appointment2, appointment3, appointment4, appointment5]);
    console.log(`Appointments ---> ${appointments}`);
}
    catch{
        console.log('ERROR!')
    }


    process.exit();
    
})();
const db = connect("mongodb://localhost:27017/habits")

db.habits.drop()
db.users.drop()

let today = new Date;
let currentdate = `${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()}`;

db.habits.insertMany([
    { title: "Drink water", frequency: "daily", goal: 1, completed: true, streak: 2, startdate: currentdate, userId: "Aaron" },
    { title: "Exercise", frequency: "daily", goal: 1, completed: true, streak: 3, startdate: currentdate, userId: "Aaron" },
    { title: "Eat 5 fruit", frequency: "daily", goal: 5, completed: true, streak: 4, startdate: currentdate, userId: "Billie" },
    { title: "Go for a walk", frequency: "daily", goal: 1, completed: false, streak: 5, startdate: currentdate, userId: "Gio" },
    { title: "Exercise", frequency: "daily", goal: 1, completed: true, streak: 2, startdate: currentdate, userId: "Tom" }
])

db.users.insertMany([
    { username: "Aaron", email: "aaron@habits.com", passwordDigest: "needtogetahashedpassword" },
    { username: "Billie", email: "billie@habits.com", passwordDigest: "needtogetahashedpassword" },
    { username: "Gio", email: "gio@habits.com", passwordDigest: "needtogetahashedpassword" },
    { username: "Tom", email: "tom@habits.com", passwordDigest: "needtogetahashedpassword" }
])

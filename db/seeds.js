const db = connect("mongodb://localhost:27017/habitrabbits")

db.habits.drop()
db.users.drop()

// let today = new Date;
// let currentdate = `${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()}`;

db.habits.insertMany([
    { title: "Drink water", frequency: "Daily", goal: 1, current: 1, completed: true, streak: 2, userId: "62a1cb615a99baaac3eeedd1" },
    { title: "Exercise", frequency: "Weekly", goal: 1, current: 1, completed: true, streak: 3, userId: "62a1cb615a99baaac3eeedd1" },
    { title: "Eat 5 fruit", frequency: "Monthly", goal: 5, current: 5, completed: true, streak: 4, userId: "62a1cb615a99baaac3eeedd1" },
    { title: "Go for a walk", frequency: "Daily", goal: 5, current: 2, completed: false, streak: 5, userId: "62a1cb615a99baaac3eeedd1" },
    { title: "Exercise", frequency: "Daily", goal: 1, current: 1, completed: true, streak: 2, userId: "62a1bc285aa15bb7bda8bf5a" }
])

db.users.insertMany([
    { username: "Aaron", passwordDigest: "$2a$10$kKNAyCjbI.ZQQK16oI/s/OpoZg6dGbHEjmv1dNZMxAd/G/75nJfj.", prevDate:"6/9/2022" },
    { username: "Billie", passwordDigest: "needtogetahashedpassword", prevDate:"6/8/2022" },
    { username: "Gio", passwordDigest: "needtogetahashedpassword", prevDate:"6/8/2022" },
    { username: "Tom", passwordDigest: "needtogetahashedpassword", prevDate:"6/8/2022" }
])

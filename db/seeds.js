const db = connect("mongodb://localhost:27017/habits")

db.habits.drop()
db.users.drop()

db.habits.insertMany([
    { title: "water", completed: true, streak: 2},
    { title: "exercise", completed: true, streak: 3},
])

db.users.insertMany([
    { username: "Aaron", email: "aaron@habits.com" },
    { username: "Billie", email: "billie@habits.com" },
    { username: "Gio", email: "gio@habits.com" },
    { username: "Tom", email: "tom@habits.com" }
])

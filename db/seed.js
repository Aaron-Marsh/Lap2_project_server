const db = connect("mongodb://localhost:27017/habits")

db.habits.drop()
db.users.drop()

db.habits.insertMany([
    { habit: "water", completed: true, streak: 2},
    { habit: "exercise", completed: true, streak: 3},
])

db.users.insertMany([
    { name: "Aaron" },
    { name: "Billie" },
    { name: "Gio" },
    { name: "Tom" }
])

// const app = require("../../server")

describe('habits endpoints', () => {
    let api;
    // beforeEach(async () => {
    //     await resetTestDB()
    // })
    beforeAll(async () => {
        api = app.listen(4000, () => console.log('Test server running on port 5000'))

        // console.log(api)
    });
    
    afterAll(async () => {
        console.log('Gracefully stopping test server')
        await api.close()
    })

    it('should return a list of all habits in database', async () => {
        const res = await request(api).get('/habits')
        expect(res.body.habits).toHaveLength(5)
    });


    
    it('Creates habit correctly', async()=>{
        const res = await request(api).post('/habits/new').send({"title": "Example title", "frequency": "Daily", "goal": 5, "current": 0, "userId": "DummyUser"})
        expect(res.text.toString()).toContain('Habit was created')
    });
    
    
    let habitId 
    it('Gets habits based on user ID', async()=>{
        const res = await request(api).get('/habits/user/DummyUser')
        habitId = res.body.habits[0].id
        console.log(habitId)
        expect(res.body.habits).toHaveLength(1)
    })
    
    it('returns specific habit text based on habitid', async() =>{
        const res = await request(api).get(`/habits/${habitId}`)
        expect(res.body.title).toBe('Example title')
    });
    
    it('Patches habit based on habitId', async()=>{
        const res = await request(api).patch(`/habits/${habitId}`).send({"command": 1, "id": habitId})
        expect(res.status).toBe(200)
    })

    it("Deletes habit based on habit ID", async()=>{

        const res = await request(api).delete(`/habits/${habitId}`)
        expect(res.status).toBe(204)
    });

    



    // it('should retrive a dogs based on id', async () => {
    // });
    // it('should create a new dog ', async () => {
    // });
    // it('should delete a dog', async () => {
    // });
})

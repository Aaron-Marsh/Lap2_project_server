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


    it('returns specific habit text based on habitid', async() =>{
        const res = await request(api).get('/habits/62a20ea2ff593b1384662ab5')
        expect(res.body.title).toBe('Drink water')
    });

    it('Creates habits and returns habit ID', async()=>{
        const res = await request(api).post('/habits/new').send({"title": "Example title", "frequency": "Daily", "goal": 5, "current": 0, "userId": "Dummy user"})
        expect(res.text.toString()).toContain('Habit was created')
    });



    it("Deletes habit based on habit ID", async()=>{
        let idToDelete = "dummyId"

        const res = await request(api).delete(`/habits/${idToDelete}`)
        expect(res).toBe(5)
    });



    // it('should retrive a dogs based on id', async () => {
    // });
    // it('should create a new dog ', async () => {
    // });
    // it('should delete a dog', async () => {
    // });
})

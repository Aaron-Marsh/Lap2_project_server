// const app = require("../../server")

describe('habits endpoints', () => {
    let api;
    beforeEach(async () => {
        await resetTestDB()
    })
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
        expect(res.body).toHaveLength(5)
    });



    // it('should retrive a dogs based on id', async () => {
    // });
    // it('should create a new dog ', async () => {
    // });
    // it('should delete a dog', async () => {
    // });
})

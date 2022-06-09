
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

    let userId

    it('should return a list of all users in database', async () => {
        const res = await request(api).get('/users')

        userId = res.body.users[0].id

        expect(res.body.users).toHaveLength(4)
    });

    it('Show user by username', async ()=>{


        const res = await request(api).get(`/users/${userId}`)

        expect(res.body.id).toBe(userId)
    })


    it('Update user last date by userId', async()=>{
        const res = await request(api).patch(`/users/${userId}`).send({"id": userId}, {"newPrevDate": "1/1/1970"})

        expect(res.status).toBe(200)


    })

})

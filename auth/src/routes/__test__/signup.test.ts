import request from 'supertest'
import {app} from '../../app';

it('returns a 201 on sucessful signup',async() =>{
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password:'password'
        })
        .expect(201);
})


it('returns a 400 with an invalid email',async() =>{
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'teffe',
            password:'password'
        })
        .expect(400);
})

it('returns a 400 with an invalid password',async() =>{
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'teffe',
            password:'p'
        })
        .expect(400);
})

it('returns a 400 with an missing email and password',async() =>{
    return request(app)
        .post('/api/users/signup')
        .send({
            // email: 'teffe',
            // password:'p'
        })
        .expect(400);
})

it('disallows duplicate emails',async() =>{
    await request(app)
    .post('/api/users/signup')
    .send({
        email:'test@test.com',
        password:'password'
    })
    .expect(201);

    await request(app)
        .post('/api/users/signup')
        .send({
            email:'test@test.com',
            password:'password'
        })
        .expect(400);
})

it('set a cookie after successful signup',async() =>{
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email:'test@test.com',
            password:'password'
        })
        .expect(201);
    expect(response.get('Set-Cookie')).toBeDefined();
});

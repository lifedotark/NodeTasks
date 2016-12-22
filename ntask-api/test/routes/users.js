import jwt from "jwt-simple";

describe("Routes: Tasks", () => {
    const Users = app.db.models.Users;
    const jwtSecret = app.libs.config.jwtSecret;
    const name = "John";
    const email =  "john@mail.net";
    const passowrd = "123456";
    let token;

    beforeEach(done => {
        Users
            .destroy({where:{}})
            .then(() => Users.create({
                name: name,
                email: email,
                password: passowrd
            }))
            .then(user => {
                token = jwt.encode({id:user.id}, jwtSecret);
                done();
            })
    });

    describe("GET /user", () => {
        describe("status 200", () => {
            it("returns an authenticated user", done => {
                request.get("/user")
                    .set("Authorization", `JWT ${token}`)
                    .expect(200)
                    .end((err, res) => {
                        expect(res.body.name).to.eql(name);
                        expect(res.body.email).to.eql(email);
                        done(err);
                    });
            });
        });
    });

    describe("DELETE /user", () =>{
        describe("status 200", () => {
            it("deletes an authenticated user", done => {
                request.delete("/user")
                    .set("Authorization", `JWT ${token}`)
                    .expect(204)
                    .end((err, res) => done(err));
            })
        })
    });

    describe("POST /users", () => {
        describe("status 200", () => {
            it("creates a new user", done => {
                request.post("/users")
                    .send({
                        name: "Mary",
                        email: "mary@email.com",
                        password: "123456"
                    })
                    .expect(200)
                    .end((err, res) => {
                        expect(res.body.name).to.eql("Mary");
                        expect(res.body.email).to.eql("mary@email.com");
                        done(err);
                    })
            })
        })
    });
})
module.exports = app =>{
    const Users = app.db.models.Users;

    app.route("/user")    
        .all(app.auth.authenticate())
        /**
         * @api {get} /user Exibe usuario autenticado
         * @apiGroup Usuario
         * @apiHeader {String} Authorization Token Token de usuario
         * @apiHeader Example {json} Header
         *  {"Authorization":"JWT xew.asd.sew.zdsd"}
         * @apiSuccess {Number} id Id de registro
         * @apiSuccess {String} name Nome
         * @apiSuccess {String} email Email
         * @apiSucessExample {json} Sucesso
         *      HTTP/1.1 200 OK
         *      {
         *          "id":1,
         *          "name":"John Connor",
         *          "email":"john@connor.net"
         *      }
         * @apiErrorExample {json} Erro de consulta
         *      HTTP/1.1 412 Precondition Failed 	
         * 
         *  */    
        .get((req, res) => {
            Users.findById(req.user.id, {
                attributes:["id","name","email"]
            })
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
        })

        /**
         * @api {delete} /user Exclui usuario autenticado
         * @apiGroup Usuario
         * @apiHeader {String} Authorization Token Token de usuario
         * @apiHeader Example {json} Header
         *  {"Authorization":"JWT xew.asd.sew.zdsd"}
         * @apiSucessExample {json} Sucesso
         *      HTTP/1.1 204 No content
         * @apiErrorExample {json} Erro na exclusão
         *      HTTP/1.1 412 Precondition Failed 	
         * 
         *  */    
        .delete((req,res) => {
            Users.destroy(
                {
                    where:{ 
                        id: req.user.id
                    }
                })
                .then(result => res.sendStatus(204))
                .catch(error => {
                    res.status(412).json({msg: error.message});
                });
        });
    /**
     * @api {get} /user Exibe usuario autenticado
     * @apiGroup Usuario
     * @apiHeader {String} Authorization Token Token de usuario
     * @apiHeader Example {json} Header
     *  {"Authorization":"JWT xew.asd.sew.zdsd"}
     * @apiSuccess {Number} id Id de registro
     * @apiSuccess {String} name Nome
     * @apiSuccess {String} email Email
     * @apiSuccess {String} password Senha Criptografada
     * @apiSuccess {Date} updated_at Data de Atualização
     * @apiSuccess {Date} created_at Data de Cadastro
     * @apiSucessExample {json} Sucesso
     *      HTTP/1.1 200 OK
     *      {
     *          "id":1,
     *          "name":"John Connor",
     *          "email":"john@connor.net"
     *          "password":"$3weedasd@sd5sfas%"
     *          "updated_at":"2016-05-21T14:12:54.778Z"
     *          "created_at":"2016-05-21T14:12:54.778Z"
     *      }
     * @apiErrorExample {json} Erro no cadastro
     *      HTTP/1.1 412 Precondition Failed 	
     * 
     *  */    
    app.post("/users", (req,res)=>{
        Users.create(req.body)  
        .then(result => res.json(result))
        .catch(error => {
            res.status(412).json({msg: error.message});
        });
    });
}
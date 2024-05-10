
const bcrypt = require('bcrypt');
const authenticateToken = require('../middlewares/authenticateToken');
const router = require("express").Router();

const {User} = require('../sequelize');

/**
 * @swagger
 * /updatePassword:
 *   put:
 *     tags:
 *       - Users
 *     name: Update password logged in
 *     summary: Update password while user is already logged in
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           $ref: '#/definitions/User'
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *             password:
 *               type: string
 *         required:
 *           - username
 *           - password
 *     responses:
 *       '200':
 *         description: User's password successfully updated
 *       '403':
 *         description: User is not authorized to change their password
 *       '404':
 *         description: User is not found in db to update
 *
 */

const BCRYPT_SALT_ROUNDS = 12;

router.put('/updatePassword', authenticateToken, (req, res, next) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  }).then((userInfo) => {
    if (userInfo != null) {
      console.log('user found in db');
      bcrypt
        .hash(req.body.password, BCRYPT_SALT_ROUNDS)
        .then((hashedPassword) => {
          userInfo.update({
            password: hashedPassword,
          });
        })
        .then(() => {
          console.log('password updated');
          res
            .status(200)
            .send({ auth: true, message: 'password updated' });
        });
    } else {
      console.error('no user exists in db to update');
      res.status(404).json('no user exists in db to update');
    }
  });

});
    
  
   
module.exports = router;

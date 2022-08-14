const { Router } = require('express');
const { check } = require('express-validator');
const { users } = require('../controllers/user.controller');

const router = Router();

router.get('/', users.userGet);

router.put('/:id', users.userPut);

router.post('/', [
  check('correo', 'El correo no es valido').isEmail(),
],users.userPost );

router.delete('/', users.userDelete);

module.exports = router;
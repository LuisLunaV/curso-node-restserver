const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const { users } = require('../controllers/user.controller');

const router = Router();

router.get('/', users.userGet);


router.put('/:id',[
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom( existeUsuarioPorId ),
  check('rol').custom( rol => esRolValido(rol) ),

  validarCampos
], users.userPut);

router.post('/', [
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'El password es obligatorio y mas de 6 caracteres').isLength({min: 6}),
  // check('correo', 'El correo no es valido').isEmail(),
  // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  check('correo').custom( emailExiste ),
  check('rol').custom( rol => esRolValido(rol) ),
  validarCampos
],users.userPost );

router.delete('/:id', [
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom( existeUsuarioPorId ),
  validarCampos
],users.userDelete);

module.exports = router;
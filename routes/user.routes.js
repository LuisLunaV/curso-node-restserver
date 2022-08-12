const { Router } = require('express');
const { users } = require('../controllers/user.controller');

const router = Router();

router.get('/', users.userGet);

router.put('/:id', users.userPut);

router.post('/', users.userPost );

router.delete('/', users.userDelete);

module.exports = router;
var express = require('express');
const upload = require('../helpers/fileUpload');
var router = express.Router();
const UsersController = require('../controllers/UsersController');

/* GET users listing. */
router.delete('/:id', UsersController.destroy);
router.post('/avatar/:id', upload.single('avatar'), UsersController.avatar);
router.get('/:id', UsersController.show);
router.put(':id', UsersController.update);

module.exports = router;

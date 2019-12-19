var express = require('express');
var ReactRender = require('fast-react-render');
var TextCom = require('../componts/text');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var element = React.createElement(TextCom, {property: 'value'});
  console.log(ReactRender.elementToString(element, {context: {}}));
  res.render('index', { title: 'Express' });
});

module.exports = router;

const express = require('express'),
controller    = require('./businessDaysControllers'),
      router  = express.Router();

const {calculateDays}      = controller;


    router.route('/getBusinessDateWithDelay')
      .post(calculateDays);


module.exports  = router;
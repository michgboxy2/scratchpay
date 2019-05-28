const express                   = require('express'),
businesscalculatorRouter        = require('./v1/businessDays/businessDaysRouter'),
      api                       = express.Router();

//Mount the API routers
api.use('/businessDates', businesscalculatorRouter);


module.exports                  = api;

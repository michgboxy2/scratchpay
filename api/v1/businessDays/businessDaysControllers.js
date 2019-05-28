const momentholidays  = require('moment-holiday'),
      moment  = require('moment-business-days');

      require("datejs");



exports.calculateDays = (req, res, next) => {
    try{
    const {initialDate, delay} = req.body;


    // momentholidays.modifyHolidays.set('us');

    if(!initialDate || !delay){ return res.status(403).send({message : "Enter initial date and number of delay days"});}

    var total_no_of_days = new Date(initialDate).add({ days: delay});
   
    var no_of_business_days = moment(initialDate, 'YYYY-MM-DD').businessDiff(moment(total_no_of_days,'YYYY-MM-DD'));
    
    
    var is_a_business_day = moment(initialDate, 'YYYY-MM-DD').isBusinessDay();
    
    var no_of_holidays   =   momentholidays(initialDate).holidaysBetween(total_no_of_days);
    
    var next_business_day = moment(total_no_of_days, 'YYYY-MM-DD').nextBusinessDay()._d;
    
    if(typeof no_of_holidays === 'boolean'){ var count = 0; }else { var count = no_of_holidays.length;}

    if(count == 0){
        var hols = 2 * (Number(delay) - Number(no_of_business_days));
    }else {
        var hols = 2 * (Number(delay) - (Number(no_of_business_days ) + Number(count)));
    }
    
    var next_business_dayWithHoliday = new Date(next_business_day).add({ days: count});

    res.status(200).send({
        ok : is_a_business_day,
        initialQuery: req.body,
        results: {
            businessDate : next_business_dayWithHoliday,
            totalDays : no_of_business_days,
            holidayDays : count,
            weekendDays: hols
        }
    });

    }catch(err){
        return res.status(422).send({message : err, status : "failed"});
    }
    
}
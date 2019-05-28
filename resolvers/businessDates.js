let {PubSub, ForbiddenError} = require('apollo-server');
const { EVENTS} = require('../subscription');
const pubsub = new PubSub();

const momentholidays  = require('moment-holiday'),
      moment  = require('moment-business-days');

      require("datejs");

module.exports = {
    Mutation: {
        calculateDays : async (parent, {initialDate, delay}) => {
            if(!initialDate || !delay){ throw new ForbiddenError('enter both initialDate and delay');}

            var total_no_of_days = new Date(initialDate).add({ days: delay});
           
            var no_of_business_days = moment(initialDate, 'YYYY-MM-DD').businessDiff(moment(total_no_of_days,'YYYY-MM-DD'));
            
            
            var is_a_business_day = moment(initialDate, 'YYYY-MM-DD').isBusinessDay();
            
            var no_of_holidays   =   momentholidays(initialDate).holidaysBetween(total_no_of_days);
            
            var next_business_day = moment(total_no_of_days, 'YYYY-MM-DD').nextBusinessDay()._d;
            
            if(typeof no_of_holidays === 'boolean'){ var count = 0; }else { var count = no_of_holidays.length;}
        
            //check if there are holidays within date
            if(count == 0){
                var hols = 2 * (Number(delay) - Number(no_of_business_days));
            }else {
                var hols = 2 * (Number(delay) - (Number(no_of_business_days ) + Number(count)));
            }
            
            var next_business_dayWithHoliday = new Date(next_business_day).add({ days: count});
        
            const data = ({
                ok : is_a_business_day,
                    businessDate : next_business_dayWithHoliday,
                    totalDays : no_of_business_days,
                    holidayDays : count,
                    weekendDays: hols
                
            });
            //publish subscribed event
            pubsub.publish(EVENTS.BUSINESS_DATE.BUSINESS_DATE, {
                calculateDays: data
            });


            return data;
        }
    },

    Subscription: {
        calculateDays : {
            subscribe: () => pubsub.asyncIterator(EVENTS.BUSINESS_DATE.BUSINESS_DATE)
        }
    }
}
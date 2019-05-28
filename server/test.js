var request = require('supertest'),
	chai	= require('chai'),
	expect	= chai.expect,
	should	= chai.should(),
	app		= require('./server.js'),
    assert  = chai.assert;
    

    describe("Get Business date endpoint", function(){
        it("should return the next business date", (next) => {
            var data = {
                initialDate : "2018-11-10",
                delay : "3"
            };

            request(app)
                .post('/api/v1/businessDates/getBusinessDateWithDelay')
                .send(data)
                .set("Content-Type", "application/json")
						.expect(200)
						.end(function(err, res) {
                            expect(res.body).to.have.property('ok');
                            expect(res.body).to.have.property('initialQuery');
                            expect(res.body).to.have.property('results');
                            expect(res.body.ok).to.be.equal(false);

							
							next();
						})
        })
    })

 
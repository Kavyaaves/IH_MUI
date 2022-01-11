require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const { db } = require('.././admin/admin');
const PaytmChecksum = require('./PaytmChecksum');

exports.memberCallback = async function (request, response) {
	const params = request.body;
	console.log('paytmparams');
	console.log(params);
	db.doc(`membershipOrders/${params.ORDERID}`).update({ ...params });
	if (request.body.STATUS == 'TXN_FAILURE') {
		response.send(
			"<script>window.location = '" +
				process.env.PaymentMFailureURL +
				'/' +
				params.ORDERID +
				"'</script>"
		);
	} else {
		var checksum = request.body.CHECKSUMHASH;

		delete request.body.CHECKSUMHASH;
		if (
			PaytmChecksum.verifySignature(params, process.env.PAYTM_MKEY, checksum)
		) {
			if (params.STATUS == 'TXN_SUCCESS') {
				response.send(
					"<script>window.location = '" +
						process.env.PaymentMSuccessURL +
						'/' +
						params.ORDERID +
						"'</script>"
				);
			} else {
				response.send(
					"<script>window.location = '" +
						process.env.PaymentMFailureURL +
						'/' +
						params.ORDERID +
						"'</script>"
				);
			}
		} else {
			response.send(
				"<script>window.location = '" +
					process.env.PaymentMFailureURL +
					'/' +
					params.ORDERID +
					"'</script>"
			);
		}
	}
};

exports.memberPay = async (req, res) => {
	var params = {};

	/* initialize an array */
	// eslint-disable-next-line no-unused-expressions
	(params['MID'] = process.env.PAYTM_MID),
		(params['WEBSITE'] = process.env.PAYTM_WEBSITE),
		(params['CHANNEL_ID'] = process.env.PAYTM_CHANNEL_ID),
		(params['INDUSTRY_TYPE_ID'] = process.env.PAYTM_INDUSTRY_TYPE_ID),
		(params['ORDER_ID'] = uuidv4()),
		(params['CUST_ID'] = req.user.uid),
		(params['TXN_AMOUNT'] = 11),
		(params['CALLBACK_URL'] = `${process.env.API_URL}/memberCallback`),
		(params['EMAIL'] = req.user.email);
	PaytmChecksum.generateSignature(params, process.env.PAYTM_MKEY)
		.then(function (checksum) {
			let paytmParams = {
				...params,
				USER_ID: req.user.uid,
				CHECKSUMHASH: checksum,
			};

			console.log(paytmParams);

			db.doc(`membershipOrders/${paytmParams.ORDER_ID}`)
				.set({
					USER_ID: paytmParams.USER_ID,
				})
				.then((data) => console.log('Completed'))
				.catch((err) => {
					console.log(err);
				});

			console.log(paytmParams);
			res.json(paytmParams);
		})
		.catch((error) => {
			res.json({ error: 'Payment Failed' });
		});
};

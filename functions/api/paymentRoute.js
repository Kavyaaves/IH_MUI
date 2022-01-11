require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const { db } = require('.././admin/admin');
const PaytmChecksum = require('./PaytmChecksum');

exports.callback = async function (request, response) {
	const params = request.body;
	db.doc(`orders/${params.ORDERID}`).update({ ...params });
	if (request.body.STATUS == 'TXN_FAILURE') {
		response.send(
			"<script>window.location = '" +
				process.env.PaymentFailureURL +
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
						process.env.PaymentSuccessURL +
						'/' +
						params.ORDERID +
						"'</script>"
				);
			} else {
				response.send(
					"<script>window.location = '" +
						process.env.PaymentFailureURL +
						'/' +
						params.ORDERID +
						"'</script>"
				);
			}
		} else {
			response.send(
				"<script>window.location = '" +
					process.env.PaymentFailureURL +
					'/' +
					params.ORDERID +
					"'</script>"
			);
		}
	}
};

exports.paymentRoute = async (req, res) => {
	const product = req.body;
	var params = {};

	/* initialize an array */
	// eslint-disable-next-line no-unused-expressions
	(params['MID'] = process.env.PAYTM_MID),
		(params['WEBSITE'] = process.env.PAYTM_WEBSITE),
		(params['CHANNEL_ID'] = process.env.PAYTM_CHANNEL_ID),
		(params['INDUSTRY_TYPE_ID'] = process.env.PAYTM_INDUSTRY_TYPE_ID),
		(params['ORDER_ID'] = uuidv4()),
		(params['CUST_ID'] = product.userId),
		(params['TXN_AMOUNT'] = product.price),
		(params['CALLBACK_URL'] = process.env.API_URL + '/callback'),
		(params['EMAIL'] = product.email);
	PaytmChecksum.generateSignature(params, process.env.PAYTM_MKEY)
		.then(function (checksum) {
			let paytmParams = {
				...params,
				PRODUCT_ID: product.id,
				USER_ID: product.userId,
				CHECKSUMHASH: checksum,
			};

			console.log(paytmParams);

			db.doc(`orders/${paytmParams.ORDER_ID}`)
				.set({
					PRODUCT_ID: paytmParams.PRODUCT_ID,
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

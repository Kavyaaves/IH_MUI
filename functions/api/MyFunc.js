exports.returnPage = (paramarray) => {
	console.log(paramarray);
	var field = '';
	var url = '';
	// if (status == 'PROD') {
	// url = 'https://securegw.paytm.in/theia/processTransaction';
	// } else if (status == 'TEST') {
	url = '/processTransaction';
	// }

	for (var param in paramarray) {
		field +=
			`<input type="hidden" name="` +
			param +
			`" value="` +
			paramarray[param] +
			`">`;
	}

	return paramarray;

	// 	`<html>
	// <head>
	// <title>Merchant Check Out Page</title>
	// </head>
	// <body>
	//   <center><h1>Please do not refresh this page...</h1></center>
	//     <form method="post" action="` +
	// 	url +
	// 	`" name="f1">
	//     <table border="1">
	//       <tbody>
	//       ` +
	// 	field +
	// 	`
	//       <input type="hidden" name="CHECKSUMHASH" value="` +
	// 	paramarray.CHECKSUMHASH +
	// 	`">
	//       </tbody>
	//     </table>
	//     <script type="text/javascript">
	//
	//     </script>
	//   </form>
	// </body>
	// </html>`
};

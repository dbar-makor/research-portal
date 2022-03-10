const { format } = require('date-fns');

function createContract(doc, contract) {
	generateHeader(doc);
	generateContractHeader(doc, contract);
	doc.end();
}

function generateHr(doc, y) {
	doc.strokeColor('#aaaaaa').lineWidth(2).moveTo(50, y).lineTo(550, y).stroke();
}
function generateHeader(doc) {
	doc.image('logo.png', 50, 45, { width: 50 })
		.fontSize(20)
		.text('Makor-Capital .LTD.', 110, 57)
		.fontSize(10)
		.text('Tel: +972-35453777')
		.text('11 Derech Begin', 200, 65, { align: 'right' })
		.text('Ramat-Gan, IL, 5268104', 200, 80, { align: 'right' })
		.moveDown();
}

function generateContractHeader(doc, contract) {
	doc.fillColor('#444444').fontSize(40).text('Contract', 50, 160, { align: 'center' });
	doc.moveDown();
	doc.strokeColor('#444444').lineWidth(2).moveTo(400, 200).lineTo(210, 200).stroke();

	generateHr(doc, 220);
	const customerInformationTop = 230;

	doc.fontSize(10)
		.text('Contract Number:', 50, customerInformationTop)
		.font('Helvetica-Bold')
		.text(contract.id.slice(0, 5).toUpperCase(), 150, customerInformationTop)
		.font('Helvetica')
		.text('Contract Date:', 50, customerInformationTop + 15)
		.text(format(new Date(contract.start_at), 'dd/mm/yyyy'), 150, customerInformationTop + 15)
		.moveDown();

	generateHr(doc, 280);
	doc.font('Helvetica-Bold')
		.text(
			'this contract is for client company name: ' + contract.company.name,
			50,
			customerInformationTop + 60,
			{ align: 'center' },
		)
		.fontSize(18)
		.text(
			`the periodicity is: ${contract.periodicity} amount of :${contract.amount}`,
			50,
			customerInformationTop + 75,
			{ align: 'center' },
		)
		.fontSize(14)
		.text('sign here :_________', 400, 720, { align: 'left' })
		.moveDown();
}
module.exports = {
	createContract,
};

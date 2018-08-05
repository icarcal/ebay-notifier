const axios = require('axios');
const MailService = require('./mail-service');
const Alert = require('../models/alert');

class CronService {
  constructor() {
    this.mailService = new MailService();
  }

  async sendAlertEmail({ frequency }) {
    const alerts = await Alert.find({ frequency }).exec();

    alerts.forEach(async (alert) => {
      let layout = '<ul>';
      const products = await this.findProducts(alert.term);

      products.forEach((product) => {
        layout += `<li>${product.itemId} - ${product.title} - <a href="${product.viewItemURL}">view product</a> </li>`
      });

      layout += '</ul>';

      this.mailService.send({
        to: alert.email,
        layout
      });
    });
  }

  async findProducts(term) {
    const ebayEndpoint = [
      process.env.EBAY_ENDPOINT,
      '?OPERATION-NAME=findItemsByKeywords',
      '&SERVICE-VERSION=1.0.0',
      `&SECURITY-APPName=${process.env.EBAY_APP_KEY}`,
      '&GLOBAL-ID=EBAY-US',
      `&keywords=${term}`,
      '&paginationInput.entriesPerPage=3',
      '&RESPONSE-DATA-FORMAT=JSON',
    ];

    const ebaySearch = await axios.get(ebayEndpoint.join(''));

    return ebaySearch.data.findItemsByKeywordsResponse[0].searchResult[0].item || [];
  }
}

module.exports = CronService;

const first_letter = `
<!DOCTYPE html>
<html>
  <head>
    <style>
      html,
      body,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      p,
      div,
      span,
      img,
      table,
      thead,
      tbody,
      tr,
      th,
      td,
      ul,
      li {
        margin: 0;
        padding: 0;
      }
      body {
        font-size: 17px;
        color: #333;
      }
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-weight: normal;
      }
      ul {
        list-style-type: none;
      }
      .text-center {
        text-align: center;
      }
      .text-uppercase {
        text-transform: uppercase;
      }
      .text-nowrap {
        white-space: nowrap;
      }
      .small {
        font-size: 10px;
      }

      .table {
        width: 100%;
        border-collapse: collapse;
      }
      .table th {
        white-space: nowrap;
      }
      .table th,
      .table td {
        vertical-align: top;
        text-align: center;
        padding-top: 4px;
        padding-bottom: 4px;
        padding-left: 12px;
        padding-right: 12px;
      }

      #header {
        font-size: 12px;
        margin-bottom: 32px;
        padding-top: 12px;
        padding-bottom: 12px;
      }

      #container {
        max-width: 210mm;
        text-align: left;
        margin: 0 auto;
      }

      #container .title {
        margin-bottom: 8px;
      }

      #trade-execution {
        padding-left: 10px;
        padding-right: 10px;
        font-size: 15px;
      }

      #trade-execution .title {
        margin-top: 32px;
      }

      #disclamer {
        padding-top: 40px;
        font-size: 10px;
        text-align: left;
      }
    </style>
  </head>
  <body>
    <div id="header">
      <table>
        <tbody>
          <tr>
            <td>
              <img src="https://enigma-securities.io/enigma-logo-blue-transparent.png" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="text-center">
      <table id="container">
        <tbody>
`;
const end_letter = `
          <tr>
            <td id="info">
              <p><b>Enigma Securities London Ltd</b></p>
              <p>6th Floor, 7/8 Savile Row</p>
              <p>London W1S 3PE</p>
              <p>+44 (0) 20 7290 5777</p>
              <p>http://www.enigma-securities.io</p>
            </td>
          </tr>
          <tr>
            <td id="disclamer">
              <p><b>Disclaimer</b></p>
          
              <br />
                Enigma Securities Limited is an Appointed Representative of
                Makor Securities London Ltd which is authorised and regulated by
                the Financial Conduct Authority (625054).
              </p>
              <p>
                The information contained in this note issued by Enigma
                Securities Limited is not intended to be advice nor a
                recommendation concerning cryptocurrency investment nor an offer
                or solicitation to buy or sell any cryptocurrency or related
                financial instrument.
              </p>
              <p>
                While we provide this information in good faith it is not
                intended to be relied upon by you and we accept no liability nor
                assume any responsibility for the consequences of any reliance
                that may be placed upon this note.
              </p>
              <p></p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </body>
</html>
`;

const forgotPassword = (link) => {
	return `${first_letter}
          <tr>
            <td id="credeantials">
              <p>Hello,</p><br />
              <p>
                Click on the folowing link to update your password, this link is
                valid for 1 hour only.
              </p>
              <br />
                <h3>
                  <a href=${link}>Submit new password</a>
                </h3>
              <br />
              <br />
              <p>Regards,</p>
              <p>Enigma Support Team</p>
            </td>
          </tr>
          ${end_letter}
  `;
};
const signContract = (user, link) => {
	return `${first_letter}
          <tr>
            <td id="credeantials">
              <p>Hello ${user.name},</p><br />
              <p>
                Click on the folowing link to sighn your Contract
              </p>
              <br />
                <h3>
                  <a href=${link}>Submit your signature</a>
                </h3>
              <br />
              <br />
              <p>Regards,</p>
              <p>Enigma Support Team</p>
            </td>
          </tr>
          ${end_letter}
  `;
};
const confirm_user = (sixDigits) => {
	return `${first_letter}
          <tr>
            <td id="credeantials">
              <p>Hello,</p><br />
              <p>
              Please enter the 6 digits for further ID verification,
              These digits are valid for twenty minutes only!
              </p>
              <br />
              <h3>Your six digits: <b>${sixDigits}</b></h3>

              <p>Regards,</p>
              <p>Enigma Support Team</p>
            </td>
          </tr>
          ${end_letter}
  `;
};

const user_get_access = (name, username, new_password, url) => {
	return `${first_letter}
          <tr>
            <td id="credeantials">
              <p>Hello ${name},</p><br />
              <p>
              Your request has been accepted, here is the initial password to connect to the site
              The password must be changed immediately after logging in
              </p>
              <br />
              <h3>username: <b>${username}</b></h3>
              <h3>password: <b>${new_password}</b></h3>
              <h3><a href=${url}>Website</a></h3>
              <br />
              <p>Regards,</p>
              <p>OscarGross Arbitrage</p>
            </td>
          </tr>
          ${end_letter}
  `;
};

const reset_password = () => {
	return `${first_letter}
          <tr>
            <td id="credeantials">
              <p>Hello,</p><br />
            
              <br />
              <br />
              <h3>Your pasword has been changed </h3>

              <p>Regards,</p>
              <p>Enigma Support Team</p>
            </td>
          </tr>
          ${end_letter}`;
};

module.exports = {
	forgotPassword,
	confirm_user,
	user_get_access,
	reset_password,
	signContract,
};

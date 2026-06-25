export const email_Structure_Function = (
  title: string,
  varificationUrl: string,
  buttonText: string,
): string => {
  return `<!DOCTYPE html>
                <html>
                <head>
                <meta charset="utf-8">
                <meta http-equiv="x-ua-compatible" content="ie=edge">
                <title>Email Confirmation</title>
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <style type="text/css">
                    @media screen {
                    @font-face {
                        font-family: 'Source Sans Pro';
                        font-style: normal;
                        font-weight: 400;
                        src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
                    }

                    @font-face {
                        font-family: 'Source Sans Pro';
                        font-style: normal;
                        font-weight: 700;
                        src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
                    }
                    }

                    body,
                    table,
                    td,
                    a {
                    -ms-text-size-adjust: 100%;
                    /* 1 */
                    -webkit-text-size-adjust: 100%;
                    /* 2 */
                    }

                    table,
                    td {
                    mso-table-rspace: 0pt;
                    mso-table-lspace: 0pt;
                    }

                    img {
                    -ms-interpolation-mode: bicubic;
                    }

                    a[x-apple-data-detectors] {
                    font-family: inherit !important;
                    font-size: inherit !important;
                    font-weight: inherit !important;
                    line-height: inherit !important;
                    color: inherit !important;
                    text-decoration: none !important;
                    }

                    div[style*="margin: 16px 0;"] {
                    margin: 0 !important;
                    }

                    body {
                    width: 100% !important;
                    height: 100% !important;
                    padding: 0 !important;
                    margin: 0 !important;
                    }

                    table {
                    border-collapse: collapse !important;
                    }

                    a {
                    color: #1a82e2;
                    }

                    img {
                    height: auto;
                    line-height: 100%;
                    text-decoration: none;
                    border: 0;
                    outline: none;
                    }

                    .countdown {
                    font-size: 16px;
                    font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
                    color: #ff0000;
                    }
                </style>
                </head>

                <body style="background-color: #e9ecef;">

                <!-- start preheader -->
                <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
                    Email Confirmation Notification
                </div>
                <!-- end preheader -->

                <!-- start body -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%">

                    <!-- start logo -->
                    <tr>
                    <td align="center" bgcolor="#e9ecef">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        <tr>
                            <td align="center" valign="top" style="padding: 36px 24px;">
                            <a href="#" target="_blank" style="display: inline-block;">
                                <!-- <img src="logo-url-here" alt="Logo" border="0" width="48" style="display: block; width: 48px; max-width: 48px; min-width: 48px;"> -->
                            </a>
                            </td>
                        </tr>
                        </table>
                    </td>
                    </tr>
                    <!-- end logo -->

                    <!-- start hero -->
                    <tr>
                    <td align="center" bgcolor="#e9ecef">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        <tr>
                            <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
                            <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">${title}</h1>
                            </td>
                        </tr>
                        </table>
                    </td>
                    </tr>
                    <!-- end hero -->

                    <!-- start copy block -->
                    <tr>
                    <td align="center" bgcolor="#e9ecef">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

                        <!-- start copy -->
                        <tr>
                            <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                            <p style="margin: 0;">Click the button below to confirm your email.</p>
                            </td>
                        </tr>
                        <!-- end copy -->

                        <!-- start button -->
                        <tr>
                            <td align="left" bgcolor="#ffffff">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                                    <table border="0" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td align="center" bgcolor="#004ac2" style="border-radius: 6px;">
                                        <a href="${varificationUrl}" target="_blank" style="display: inline-block; padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">${buttonText}</a>
                                        </td>
                                    </tr>
                                    </table>
                                </td>
                                </tr>
                            </table>
                            </td>
                        </tr>
                        <!-- end button -->

                        <!-- start copy -->
                        <tr>
                            <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                            <p style="margin: 0;">If that doesn't work, you can click the following link below:</p>
                            <p style="margin: 0;"><a href="${varificationUrl}" target="_blank">Click this link</a></p>
                            </td>
                        </tr>
                        <!-- end copy -->

                        <!-- start copy -->
                        <tr>
                            <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
                            <p style="margin: 0;">Thanks,<br>-- Todo Support Team --</p>
                            </td>
                        </tr>
                        <!-- end copy -->

                        </table>
                    </td>
                    </tr>
                    <!-- end copy block -->

                    <!-- start footer -->
                    <tr>
                    <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

                        <!-- start permission -->
                        <tr>
                            <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                            <p style="margin: 0;">You received this email because we received a request for your account in our website. If you didn't request, you can safely delete this email.</p>
                            </td>
                        </tr>
                        <!-- end permission -->

                        <!-- start unsubscribe -->
                        <tr>
                            <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                            <p style="margin: 0;">Todo list App</p>
                            </td>
                        </tr>
                        <!-- end unsubscribe -->

                        </table>
                    </td>
                    </tr>
                    <!-- end footer -->

                </table>
                <!-- end body -->

                </body>
                </html>
`;
};

export const welcomeEmail_Structure_Function = (
  name: string,
  appName: string,
  dashboardUrl: string,
  year: string,
) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Welcome</title>
<style>
  body {
    margin: 0;
    padding: 0;
    background-color: #f4f7fc;
    font-family: Arial, Helvetica, sans-serif;
  }

  .container {
    max-width: 600px;
    margin: 40px auto;
    background: #ffffff;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  }

  .header {
    background: linear-gradient(135deg, #2563eb, #7c3aed);
    padding: 40px 20px;
    text-align: center;
    color: white;
  }

  .header h1 {
    margin: 0;
    font-size: 32px;
  }

  .content {
    padding: 40px 30px;
    color: #374151;
    line-height: 1.7;
  }

  .content h2 {
    color: #111827;
    margin-bottom: 15px;
  }

  .button {
    display: inline-block;
    padding: 14px 28px;
    background: #2563eb;
    color: #ffffff !important;
    text-decoration: none;
    border-radius: 8px;
    font-weight: bold;
    margin-top: 20px;
  }

  .features {
    margin-top: 30px;
  }

  .feature {
    padding: 12px 0;
    border-bottom: 1px solid #e5e7eb;
  }

  .footer {
    background: #f9fafb;
    padding: 20px;
    text-align: center;
    color: #6b7280;
    font-size: 14px;
  }

  @media only screen and (max-width: 600px) {
    .content {
      padding: 25px 20px;
    }

    .header h1 {
      font-size: 26px;
    }
  }
</style>
</head>
<body>

<div class="container">

  <div class="header">
    <h1>🎉 Welcome Aboard!</h1>
  </div>

  <div class="content">
    <h2>Hello ${name},</h2>

    <p>
      Thank you for joining <strong>${appName}</strong>.
      We're excited to have you as part of our growing community.
    </p>

    <p>
      Your account has been successfully created and you're ready to explore all the features available to you.
    </p>

    <a href="${dashboardUrl}" class="button">
      Get Started
    </a>

    <div class="features">
      <div class="feature">✅ Secure Account Access</div>
      <div class="feature">✅ Personalized Dashboard</div>
      <div class="feature">✅ Real-Time Notifications</div>
      <div class="feature">✅ 24/7 Support</div>
    </div>

    <p style="margin-top:30px;">
      If you have any questions, simply reply to this email and our team will be happy to help.
    </p>

    <p>
      Best Regards,<br>
      <strong>${appName} Team</strong>
    </p>
  </div>

  <div class="footer">
    © ${year} ${appName}. All Rights Reserved.
  </div>

</div>

</body>
</html>
`;
};

export const resetPasswordEmail_Structure_Function = (
  name: string,
  appName: string,
  resetUrl: string,
  expiresIn: string,
  year: string,
) => {
  return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Reset</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          background: #f3f4f6;
          font-family: Arial, Helvetica, sans-serif;
        }

        .container {
          max-width: 600px;
          margin: 40px auto;
          background: #ffffff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 6px 20px rgba(0,0,0,0.08);
        }

        .header {
          background: linear-gradient(135deg, #ef4444, #f97316);
          color: white;
          text-align: center;
          padding: 35px 20px;
        }

        .header h1 {
          margin: 0;
          font-size: 28px;
        }

        .content {
          padding: 35px 30px;
          color: #374151;
          line-height: 1.7;
        }

        .button {
          display: inline-block;
          margin-top: 25px;
          padding: 14px 28px;
          background: #ef4444;
          color: #ffffff !important;
          text-decoration: none;
          border-radius: 8px;
          font-weight: bold;
        }

        .warning {
          margin-top: 25px;
          padding: 12px;
          background: #fff7ed;
          border-left: 4px solid #f97316;
          font-size: 14px;
        }

        .footer {
          background: #f9fafb;
          text-align: center;
          padding: 18px;
          font-size: 13px;
          color: #6b7280;
        }

        @media (max-width: 600px) {
          .content {
            padding: 25px 18px;
          }
        }
      </style>
      </head>
      <body>

      <div class="container">

        <div class="header">
          <h1>🔐 Password Reset Request</h1>
        </div>

        <div class="content">
          <p>Hello ${name},</p>

          <p>
            We received a request to reset your password for your account on <strong>${appName}</strong>.
          </p>

          <p>
            Click the button below to reset your password. This link will expire in <strong>${expiresIn}</strong>.
          </p>

          <a href="${resetUrl}" class="button">Reset Password</a>

          <div class="warning">
            ⚠️ If you did not request this, you can safely ignore this email. Your password will remain unchanged.
          </div>

          <p style="margin-top: 25px;">
            For security reasons, this link can only be used once.
          </p>

          <p>
            Thanks,<br>
            <strong>${appName} Security Team</strong>
          </p>
        </div>

        <div class="footer">
          © ${year} ${appName}. All rights reserved.
        </div>

      </div>

      </body>
      </html>
`;
};

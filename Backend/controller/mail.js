"use strict";
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const userSchema = require("../schema/userSchema");
const sellerSchema = require("../schema/sellerSchema");

exports.sendMailVerification = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userSchema.findOne({ emailId: email })
    console.log(
      "-------------------------------------------verification----------------------------------------------------"
    );
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: 1000 * 60 * 10,
    });

    if (!token) {
      return res.status(404).json({
        success: false,
        message: "Link Expired",
      });
    }

    let transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      auth: {
        user: "verify@appispot.com",
        pass: "Verify123",
      },
      tls: {
        ciphers: "SSLv3",
      },
    });
    let info = await transporter.sendMail({
      from: '"Shivam Pal" <verify@appispot.com>',
      to: `<${email}>`,
      subject: "Appispot Email Verification",
      text: "Email Verficaition",
      html: `<head>
         <title></title>
         <!--[if !mso]><!-- -->
         <meta http-equiv="X-UA-Compatible" content="IE=edge">
         <!--<![endif]-->
       <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
       <style type="text/css">
         #outlook a { padding: 0; }
         .ReadMsgBody { width: 100%; }
         .ExternalClass { width: 100%; }
         .ExternalClass * { line-height:100%; }
         body { margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
         table, td { border-collapse:collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
         img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
         p { display: block; margin: 13px 0; }
       </style>
       <!--[if !mso]><!-->
       <style type="text/css">
         @media only screen and (max-width:480px) {
           @-ms-viewport { width:320px; }
           @viewport { width:320px; }
         }
       </style>
       <!--<![endif]-->
       <!--[if mso]>
       <xml>
         <o:OfficeDocumentSettings>
           <o:AllowPNG/>
           <o:PixelsPerInch>96</o:PixelsPerInch>
         </o:OfficeDocumentSettings>
       </xml>
       <![endif]-->
       <!--[if lte mso 11]>
       <style type="text/css">
         .outlook-group-fix {
           width:100% !important;
         }
       </style>
       <![endif]-->
       
       <!--[if !mso]><!-->
           <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css">
           <style type="text/css">
       
               @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
       
           </style>
         <!--<![endif]--><style type="text/css">
         @media only screen and (min-width:480px) {
           .mj-column-per-100, * [aria-labelledby="mj-column-per-100"] { width:100%!important; }
         }
       </style>
       </head>
       <body style="background: #F9F9F9;">
         <div style="background-color:#F9F9F9;"><!--[if mso | IE]>
             <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="640" align="center" style="width:640px;">
               <tr>
                 <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
             <![endif]-->
         <style type="text/css">
           html, body, * {
             -webkit-text-size-adjust: none;
             text-size-adjust: none;
           }
           a {
             color:#1EB0F4;
             text-decoration:none;
           }
           a:hover {
             text-decoration:underline;
           }
         </style>
       <div style="margin:0px auto;max-width:640px;background:transparent;"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:transparent;" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:40px 0px;"><!--[if mso | IE]>
             <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:640px;">
             <![endif]--><div aria-labelledby="mj-column-per-100" class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="word-break:break-word;font-size:0px;padding:0px;" align="center"><table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px;" align="center" border="0"><tbody><tr></tr></tbody></table></td></tr></tbody></table></div><!--[if mso | IE]>
             </td></tr></table>
             <![endif]--></td></tr></tbody></table></div><!--[if mso | IE]>
             </td></tr></table>
             <![endif]-->
             <!--[if mso | IE]>
             <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="640" align="center" style="width:640px;">
               <tr>
                 <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
             <![endif]--><div style="max-width:640px;margin:0 auto;box-shadow:0px 1px 5px rgba(0,0,0,0.1);border-radius:4px;overflow:hidden"><div style="margin:0px auto;max-width:640px;background:#7289DA url(https://cdndiscordapp.com/email_assets/f0a4cc6d7aaa7bdf2a3c15a193c6d224.png) top center / cover no-repeat;"><!--[if mso | IE]>
             <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:640px;">
               <v:fill origin="0.5, 0" position="0.5,0" type="tile" src="https://cdndiscordapp.com/email_assets/f0a4cc6d7aaa7bdf2a3c15a193c6d224.png" />
               <v:textbox style="mso-fit-shape-to-text:true" inset="0,0,0,0">
             <![endif]--><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#7289DA url(https://cdndiscordapp.com/email_assets/f0a4cc6d7aaa7bdf2a3c15a193c6d224.png) top center / cover no-repeat;" align="center" border="0" background="https://cdndiscordapp.com/email_assets/f0a4cc6d7aaa7bdf2a3c15a193c6d224.png"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:57px;"><!--[if mso | IE]>
             <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:undefined;width:640px;">
             <![endif]--><div style="cursor:auto;color:white;font-family:Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size:36px;font-weight:600;line-height:36px;text-align:center;">Welcome To Appispot!</div><!--[if mso | IE]>
             </td></tr></table>
             <![endif]--></td></tr></tbody></table><!--[if mso | IE]>
               </v:textbox>
             </v:rect>
             <![endif]--></div><!--[if mso | IE]>
             </td></tr></table>
             <![endif]-->
             <!--[if mso | IE]>
             <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="640" align="center" style="width:640px;">
               <tr>
                 <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
             <![endif]--><div style="margin:0px auto;max-width:640px;background:#ffffff;"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#ffffff;" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:40px 70px;"><!--[if mso | IE]>
             <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:640px;">
             <![endif]--><div aria-labelledby="mj-column-per-100" class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="word-break:break-word;font-size:0px;padding:0px 0px 20px;" align="left"><div style="cursor:auto;color:#737F8D;font-family:Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size:16px;line-height:24px;text-align:left;">
                   <p><img src="https://appispot.com/logo.png" alt="Party Wumpus" title="None" width="200" style="height: auto;"></p>
       
         <h2 style="font-family: Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-weight: 500;font-size: 20px;color: #4F545C;letter-spacing: 0.27px;">Hey ${
           email.split("@")[0]
         }, </h2>
         <p>Thank you for registering an account with appispot! We’re excited to have you on board.</p> <p>To ensure a smooth experience, we need to verify your email address. Please check your email for a verification link we’ve sent. Click on the link to complete the verification process.</p>       
                 </div>
                 </td>
                 </tr>
                 <tr>
                 <td style="word-break:break-word;font-size:0px;padding:10px 25px;" align="center">
                 <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:separate;" align="center" border="0">
                 <tbody>
                 <tr>
                 <td style="border:none;border-radius:3px;color:white;cursor:auto;padding:15px 19px;" align="center" valign="middle" bgcolor="#7289DA">
                 <a href="https://appispot.com/verify/email?token=${token}" style="text-decoration:none;line-height:100%;background:#7289DA;color:white;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:15px;font-weight:normal;text-transform:none;margin:0px;" target="_blank">
                   Verify Email
                 </a></td></tr></tbody></table></td></tr></tbody></table></div><!--[if mso | IE]>
             </td></tr></table>
             <![endif]--></td></tr></tbody></table></div><!--[if mso | IE]>
             </td></tr></table>
             <![endif]-->
             <!--[if mso | IE]>
             <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="640" align="center" style="width:640px;">
               <tr>
                 <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
             <![endif]--></div><div style="margin:0px auto;max-width:640px;background:transparent;"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:transparent;" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:0px;"><!--[if mso | IE]>
             <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:640px;">
             <![endif]--><div aria-labelledby="mj-column-per-100" class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="word-break:break-word;font-size:0px;"><div style="font-size:1px;line-height:12px;">&nbsp;</div></td></tr></tbody></table></div><!--[if mso | IE]>
             </td></tr></table>
             <![endif]--></td></tr></tbody></table></div><!--[if mso | IE]>
             </td></tr></table>
             <![endif]-->
             <!--[if mso | IE]>
             <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="640" align="center" style="width:640px;">
               <tr>
                 <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
             <![endif]--><div style="margin:0 auto;max-width:640px;background:#ffffff;box-shadow:0px 1px 5px rgba(0,0,0,0.1);border-radius:4px;overflow:hidden;"><table cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#ffffff;" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;font-size:0px;padding:0px;"><!--[if mso | IE]>
             <table border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:640px;">
           </div></td></tr></tbody></table></div><!--[if mso | IE]>
             </td></tr></table>
             <![endif]--></td></tr></tbody></table></div><!--[if mso | IE]>
             </td></tr></table>
             <![endif]-->
             <!--[if mso | IE]>
             <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="640" align="center" style="width:640px;">
               <tr>
                 <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
             <![endif]--><div style="margin:0px auto;max-width:640px;background:transparent;"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:transparent;" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:20px 0px;"><!--[if mso | IE]>
             <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:640px;">
             <![endif]--><div aria-labelledby="mj-column-per-100" class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="word-break:break-word;font-size:0px;padding:0px;" align="center"><div style="cursor:auto;color:#99AAB5;font-family:Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size:12px;line-height:24px;text-align:center;">
             Sent by appispot
           </div></td></tr></tbody></table></div><!--[if mso | IE]>
             </td></tr></table>
             <![endif]--></td></tr></tbody></table></div><!--[if mso | IE]>
             </td></tr></table>
             <![endif]--></div>
       
       </body>`,
    });

    res.send(info.messageId);

    console.log("Message send: %s", info.messageId);
    console.log(
      `magic link :- https://appispot.com/api/verify-email/${token}`
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const token = req.query.token;
    const role = req.query.role;

    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    console.log(id)

    if (role === "user") {
      const user = await userSchema.findByIdAndUpdate(
        id,
        { verified: true },
        { new: true }
      );

      if (user) {
        res.status(200).json({
          success: true,
          message: "Successfully email verified",
          user,
        });

        // send notification
        user.notifications.push({
          title: "Successfully Email Verified",
          message: `🥳 You're email has been successfully verified`,
          read: false,
        });

        await user.save();
      }
    }

    if (role === "lister") {
      const seller = await sellerSchema.findByIdAndUpdate(id, { isVerified: true }, { new: true })

      if (seller) {
        res.status(200).json({
          success: true,
          message: "Successfully email verified",
          seller,
        });

        // send notification
        seller.notifications.push({
          title: "Successfully Email Verified",
          message: `🥳 You're email has been successfully verified`,
          read: false,
        });

        await seller.save();
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

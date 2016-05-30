var PDFDocument = require("pdfkit");
var fs = require("fs");
var concat = require("concat-stream");


Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});

// afterSave paiement
  // nofitifier les huissier
  // sauvegarder(mettre a jour) le nouvel constat apres modification de son status

Parse.Cloud.afterSave("constat", function(request) {
    var _findingTitle = request.object.get('title')
    var _findingDescription = request.object.get('description')
    var _findingMedias = request.object.get('medias')
    var _findingID = request.object.id
    var _outputUrl = "public/assets/pdf/finding_" + _findingID + ".pdf"
    console.log("generateFindingPDF1")

    var doc = new PDFDocument;

    //-------------------------------------------------//
    //-------------- Creating pdf content  ------------//
    //-------------------------------------------------//

    // finding title
    doc.fontSize(25)
       .text(_findingTitle)
       .moveDown()

    doc.fontSize(18)
       .text('Description')
       .moveDown()

    doc.fontSize(13)
       .text(_findingDescription)
       .moveDown();

    // details title
    doc.fontSize(18).text('Details')
       .font('Times-Roman', 13)
       .moveDown();

   for (i = 0; i < _findingMedias.length; i++) {
    //  doc.image('public/assets/images/parse-logo.png');
     doc.image(_findingMedias[i].img).moveDown();
     doc.text( _findingMedias[i].description).moveDown();
   }

   //-------------------------------------------------//
   //-------------- Creating pdf content  ------------//
   //-------------------------------------------------//

    stream = doc.pipe( fs.createWriteStream(_outputUrl) );

    doc.end()
    stream.on('finish', function () {
        // rattacher le fichier pdf creer avec le constat
       var PdfConstat = Parse.Object.extend("PdfConstat");
       var _pdfConstat = new PdfConstat();
       _pdfConstat.set("idConstat", _findingID);
       _pdfConstat.set("url", _outputUrl);
       _pdfConstat.save(null, {
         success: function(_savedPdfConstat) {
           console.log("Saving pdf success !")
           response.success(_savedPdfConstat);
         },
         error: function(error) {
           console.log(error)
         }
       })
    })
});

Parse.Cloud.define("checkUserPassword", function(request, response)
{
    var password = request.params.password;
    var username = request.params.username;
    console.log("username === " + username + " and password === " + password)
    Parse.User.logIn(username, password, {
      success: function(results)
      {
        console.log("success login");
          response.success(true);
      },
      error: function() {
        console.log("failed login");
          response.success(false);
      }
  });
});

<?php

/**
 * @file
 * Document collection print footer template.
 */
?>
<!DOCTYPE html>

<html>
  <head>
    <meta charset="utf-8"/>
    <title>print – footer – <?php echo $collection->title; ?></title>
    <style>
     html, body {
       margin: 0;
       padding: 0;
     }

     .container {
       display: table;
       width: 100%;
     }

     .container > div {
       display: table-cell;
       vertical-align: middle;
     }

     .container > div + div {
       text-align: right;
     }
    </style>
    <script>
     // @see http://metaskills.net/2011/03/20/pdfkit-overview-and-advanced-usage/
     function getPdfInfo() {
       var pdfInfo = {};
       var x = document.location.search.substring(1).split('&');
       for (var i in x) { var z = x[i].split('=',2); pdfInfo[z[0]] = unescape(z[1]); }

       document.getElementById('page-number').innerHTML = document.getElementById('page-number').innerHTML.replace(new RegExp('\\[([^\\]]+)\\]', 'g'), function (match, placeholder) {
         return typeof(pdfInfo[placeholder]) !== 'undefined' ? pdfInfo[placeholder] : match;
       });
      }
    </script>
  </head>
  <body onload="getPdfInfo()">
    <div class="container">
       <div class="image">
          <?php if (!empty($image)): ?>
            <img style="height: 2cm" src="<?php echo file_create_url($image->uri); ?>"/>
          <?php endif ?>
       </div>
       <div class="page-numbers">
         <div id="page-number"><?php echo t('Page @page of @total_pages', [
                                 '@page' => '[page]',
                                 '@total_pages' => '[topage]',
                                 ]); ?></div>
       </div>
    </div>
  </body>
</html>

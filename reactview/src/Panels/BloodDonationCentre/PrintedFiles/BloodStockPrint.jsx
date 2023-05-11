export const handleBloodStockPrint = (blood) => {
    let printContent = '<html><head><style>';
    printContent += 'table { border-collapse: collapse; width: 100%; }';
    printContent += 'th, td { border: 1px solid black; padding: 8px; text-align: left; }';
    printContent += 'th { background-color: #dddddd; }';
    printContent += 'h1 { padding:8px; text-align: center; }';
    printContent += '  body { -webkit-print-color-adjust: exact; }';
    printContent += '@media print {';
    printContent += '  #header { position: fixed; top: 0; left: 0; right: 0; height: 80px; background-color: #f5f5f5; border-bottom: 1px solid black; }';
    printContent += '  #footer { position: fixed; bottom: 0; left: 0; right: 0; height: 30px; background-color: #f5f5f5; border-top: 1px solid black; }';
    printContent += '  #content { margin-top: 80px; margin-bottom: 30px; }';
    printContent += '  #watermark { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); opacity: 0.5; font:24px }';
    printContent += '}';
    printContent += '</style></head><body>';
    printContent += '<div id="header"><h1>Blood Stock Record</h1></div>';
    printContent += '<div id="content">Here is the details of all the blood record, you can find here till now!<table>';
    printContent += '<tr><th>ID</th><th>Blood Group</th><th>No of Bags</th><th>Last Item Added Date</th></tr>';
    blood.forEach((row) => {
      printContent += `<tr><td>${row.ID}</td><td>${row.bloodGroup}</td><td>${row.noOfBags}</td><td>${row.addedDate}</td></tr>`;
    });
    printContent += '</table></div>';
    printContent += '<div id="footer"><p style="text-align: center; margin-top: 8px;">Footer content will add up here </p></div>';
    printContent += '<div id="watermark">Original</div>';
    printContent += '</body></html>';
  
    // Create a new window with the printable HTML and print it
    const printWindow=window.open('','','width=800,height=600');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };
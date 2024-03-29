
export const handleAppointmentPrint = (filteredDataArray,center) => {
    let printContent = '<html><head><style>';
    printContent += 'table { border-collapse: collapse; width: 100%; }';
    printContent += 'th, td { border: 1px solid black; padding: 8px; text-align: left; }';
    printContent += 'th { background-color: #dddddd; }';
    printContent += 'h5 {  border: 1px dotted; padding:0}';
    printContent += 'h1 { padding:8px; text-align: center; }';
    printContent += '  body { -webkit-print-color-adjust: exact; }';
    printContent += '@media print {';
    printContent += '  #header { position: fixed; top: 0; left: 0; right: 0; height: 80px; background-color: #f5f5f5; border-bottom: 1px solid black; }';
    printContent += '  #footer { position: fixed; bottom: 0; left: 0; right: 0; height: 30px; background-color: #f5f5f5; border-top: 1px solid black; }';
    printContent += '  #content { margin-top: 80px; margin-bottom: 60px;text-align: center }';
    printContent += '  #body { margin-top: 8px; margin-bottom: 6px;text-align: left }';
    printContent += '  #terms { position:fixed;bottom: 20;left:0;right:0}';
    printContent += '  #watermark { position: fixed; top: 50%; left: 50%; transform: translateY(-50%, -50%); opacity: 0.5;font:8rem }';
    printContent += '}';
    printContent += '</style></head><body>';
    printContent += '<div id="header"><h1>Appintments for Blood Donation</h1></div>';
    printContent += '<div id="content">Here you can view all the appointments that donors books for the coming days or week<table>';
    printContent += `<div id= "body"><h5>Donation Center Name=${center.name}</h5></div>`;
    printContent += `<div id= "body"><h5>Address=${center.location}</h5></div>`;
    printContent += `<div id= "body"><h5>City=${center.city}</h5></div>`;
    printContent += `<div id= "body"><h5>Phone Number=${center.contactNo}</h5></div>`;
    printContent += '<tr><th>Name</th><th>Email</th><th>Gender</th><th>City</th><th>Address</th><th>Blood Group</th><th>Donor Contact Number</th><th>Appointment Timing</th></tr>';
    filteredDataArray.forEach((row) => {
      printContent += `<tr><td>${row.DonorName.value}</td><td>${row.DonorEmail.value}</td><td>${row.Gender.value}</td><td>${row.City.value}</td><td>${row.Address.value}</td><td>${row.BloodGroup.value}</td><td>${row.DonorContactNo.value}</td><td>${row.Timings.value}</td></tr>`;
    });
    printContent += '</table></div>';
    printContent += '<div id="terms"><p style="text-align: left; margin-top: 8px;">Terms & Conditions</p></div>';
    printContent += '<div id="footer"><p style="text-align: center; margin-top: 8px;">Thank you for supporting our cause! Your generous contribution will make a difference in saving lives. If you have any questions or require further assistance, contact us through email: help@gmail.com</p></div>';
    printContent += '<div id="watermark">Original</div>';
    printContent += '</body></html>';
  
    // Create a new window with the printable HTML and print it
    const printWindow=window.open('','','width=800,height=600');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };
  
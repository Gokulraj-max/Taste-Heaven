import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faPrint } from "@fortawesome/free-solid-svg-icons";
import "./Services.css"; // Custom CSS for styling

function Services() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState(null);

  // Fetch bookings on mount
  useEffect(() => {
    axios.get("/api/bookings/all")  // This endpoint should return an array of all bookings with populated user details.
      .then((res) => {
        setBookings(res.data);
        setLoading(false);
        generateChartData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching bookings:", err);
        setLoading(false);
      });
  }, []);

  // Group bookings by service type to generate chart data.
  const generateChartData = (data) => {
    // For example, group by a 'serviceType' field which you set when aggregating the data.
    const counts = {
      Birthday: 0,
      Catering: 0,
      "Family Dining": 0,
      Wedding: 0
    };

    data.forEach(booking => {
      // Assume each booking has a `bookingType` property that is set to one of the above.
      if (counts[booking.bookingType] !== undefined) {
        counts[booking.bookingType] += 1;
      }
    });
    const labels = Object.keys(counts);
    const values = Object.values(counts);
    setChartData({
      labels,
      datasets: [{
        label: "Bookings per Service",
        data: values,
        backgroundColor: ["#007bff", "#28a745", "#ffc107", "#dc3545"]
      }]
    });
  };

  // Function to generate and print invoices for all bookings.
  const printInvoices = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      let htmlContent = `
        <html>
          <head>
            <title>Booking Invoices</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              .invoice { border: 1px solid #ccc; padding: 15px; margin-bottom: 20px; }
              .invoice h2 { margin-top: 0; }
              .invoice table { width: 100%; border-collapse: collapse; }
              .invoice table, .invoice th, .invoice td { border: 1px solid #ddd; }
              .invoice th, .invoice td { padding: 8px; text-align: left; }
            </style>
          </head>
          <body>
            <h1>All Booking Invoices</h1>
      `;
      bookings.forEach(booking => {
        htmlContent += `
          <div class="invoice">
            <h2>${booking.bookingType} Booking</h2>
            <p><strong>User:</strong> ${booking.user ? booking.user.name : "N/A"} (${booking.user ? booking.user.email : "N/A"})</p>
            <p><strong>Details:</strong></p>
            <table>
              <tbody>
                ${booking.bookingType === "Birthday" ? `
                  <tr><th>Guests</th><td>${booking.guests}</td></tr>
                  <tr><th>Cake Size</th><td>${booking.cakeSize}</td></tr>
                  <tr><th>Cake Type</th><td>${booking.cakeType}</td></tr>
                  <tr><th>Payment Method</th><td>${booking.paymentMethod}</td></tr>
                  <tr><th>Event Date</th><td>${new Date(booking.eventDate).toLocaleDateString()}</td></tr>
                ` : booking.bookingType === "Catering" ? `
                  <tr><th>Event Type</th><td>${booking.eventType}</td></tr>
                  <tr><th>Guests</th><td>${booking.guests}</td></tr>
                  <tr><th>Location</th><td>${booking.location}</td></tr>
                  <tr><th>Payment Method</th><td>${booking.paymentMethod}</td></tr>
                  <tr><th>Event Date</th><td>${new Date(booking.eventDate).toLocaleDateString()}</td></tr>
                ` : booking.bookingType === "Family Dining" ? `
                  <tr><th>Dining Table</th><td>${booking.diningTable}</td></tr>
                  <tr><th>Event DateTime</th><td>${new Date(booking.eventDateTime).toLocaleString()}</td></tr>
                ` : booking.bookingType === "Wedding" ? `
                  <tr><th>Event Type</th><td>${booking.eventType}</td></tr>
                  <tr><th>Guests</th><td>${booking.guests}</td></tr>
                  <tr><th>Location</th><td>${booking.location}</td></tr>
                  <tr><th>Catering Service</th><td>${booking.cateringService}</td></tr>
                  <tr><th>Decoration Service</th><td>${booking.decorationService}</td></tr>
                  <tr><th>Payment Method</th><td>${booking.paymentMethod}</td></tr>
                  <tr><th>Event Date</th><td>${new Date(booking.eventDate).toLocaleDateString()}</td></tr>
                ` : ''}
              </tbody>
            </table>
            <p><strong>Booked On:</strong> ${new Date(booking.createdAt).toLocaleDateString()}</p>
          </div>
        `;
      });
      htmlContent += `
          </body>
        </html>
      `;
      printWindow.document.open();
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      printWindow.onload = function() {
        printWindow.focus();
        printWindow.print();
        // Uncomment to auto-close after printing:
        // printWindow.close();
      };
    } else {
      alert("Unable to open print window. Please allow pop-ups.");
    }
  };

  if (loading) {
    return (
      <div className="services-loading">
        <FontAwesomeIcon icon={faSpinner} spin /> Loading Bookings...
      </div>
    );
  }

  return (
    <div className="services-page">
      <div className="services-header">
        <h2>Booking Services Management</h2>
        <button className="print-btn" onClick={printInvoices}>
          <FontAwesomeIcon icon={faPrint} /> Download Invoices
        </button>
      </div>

      <div className="bookings-list">
        <h3>All Bookings</h3>
        {bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          <table className="bookings-table">
            <thead>
              <tr>
                <th>Booking Type</th>
                <th>User</th>
                <th>Email</th>
                <th>Details</th>
                <th>Booked On</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(booking => (
                <tr key={booking._id}>
                  <td>{booking.bookingType}</td>
                  <td>{booking.user ? booking.user.name : "N/A"}</td>
                  <td>{booking.user ? booking.user.email : "N/A"}</td>
                  <td>
                    {booking.bookingType === "Birthday" && (
                      <>
                        <div>Guests: {booking.guests}</div>
                        <div>Cake: {booking.cakeType} ({booking.cakeSize})</div>
                        <div>Payment: {booking.paymentMethod}</div>
                      </>
                    )}
                    {booking.bookingType === "Catering" && (
                      <>
                        <div>Event: {booking.eventType}</div>
                        <div>Guests: {booking.guests}</div>
                        <div>Location: {booking.location}</div>
                      </>
                    )}
                    {booking.bookingType === "Family Dining" && (
                      <>
                        <div>Dining Table: {booking.diningTable}</div>
                        <div>Date: {new Date(booking.eventDateTime).toLocaleString()}</div>
                      </>
                    )}
                    {booking.bookingType === "Wedding" && (
                      <>
                        <div>Event: {booking.eventType}</div>
                        <div>Guests: {booking.guests}</div>
                        <div>Location: {booking.location}</div>
                      </>
                    )}
                  </td>
                  <td>{new Date(booking.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="chart-section">
        <h3>Service Bookings Chart</h3>
        {chartData ? (
         <div className="chart-container">
         {chartData ? (
           <Bar
             data={chartData}
             options={{
               maintainAspectRatio: false,
               responsive: true,
               scales: {
                 x: { ticks: { font: { size: 12 } } },
                 y: { ticks: { font: { size: 12 } }, beginAtZero: true }
               }
             }}
           />
         ) : (
           <p>No chart data available</p>
         )}
       </div>
       
        
        ) : (
          <p>No chart data available</p>
        )}
      </div>
    </div>
  );
}

export default Services;






// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Bar } from "react-chartjs-2";
// import "chart.js/auto";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSpinner, faPrint } from "@fortawesome/free-solid-svg-icons";
// import "./Services.css"; // Custom CSS for styling

// function Services() {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [chartData, setChartData] = useState(null);

//   // Fetch bookings on mount
//   useEffect(() => {
//     axios
//       .get("/api/bookings/all") // This endpoint should return an array of all bookings with populated user details.
//       .then((res) => {
//         setBookings(res.data);
//         setLoading(false);
//         generateChartData(res.data);
//       })
//       .catch((err) => {
//         console.error("Error fetching bookings:", err);
//         setLoading(false);
//       });
//   }, []);

//   // Group bookings by service type to generate chart data.
//   const generateChartData = (data) => {
//     const counts = {
//       Birthday: 0,
//       Catering: 0,
//       "Family Dining": 0,
//       Wedding: 0,
//     };

//     data.forEach((booking) => {
//       if (counts[booking.bookingType] !== undefined) {
//         counts[booking.bookingType] += 1;
//       }
//     });

//     const labels = Object.keys(counts);
//     const values = Object.values(counts);

//     setChartData({
//       labels,
//       datasets: [
//         {
//           label: "Bookings per Service",
//           data: values,
//           backgroundColor: ["#007bff", "#28a745", "#ffc107", "#dc3545"],
//         },
//       ],
//     });
//   };

//   // Function to generate and print invoices for all bookings.
//   const printInvoices = () => {
//     const printWindow = window.open("", "_blank");
//     if (printWindow) {
//       let htmlContent = `
//         <html>
//           <head>
//             <title>Booking Invoices</title>
//             <style>
//               body { font-family: Arial, sans-serif; padding: 20px; }
//               .invoice { border: 1px solid #ccc; padding: 15px; margin-bottom: 20px; }
//               .invoice h2 { margin-top: 0; }
//               .invoice table { width: 100%; border-collapse: collapse; }
//               .invoice table, .invoice th, .invoice td { border: 1px solid #ddd; }
//               .invoice th, .invoice td { padding: 8px; text-align: left; }
//             </style>
//           </head>
//           <body>
//             <h1>All Booking Invoices</h1>
//       `;

//       bookings.forEach((booking) => {
//         htmlContent += `
//           <div class="invoice">
//             <h2>${booking.bookingType} Booking</h2>
//             <p><strong>User:</strong> ${booking.user ? booking.user.name : "N/A"} (${booking.user ? booking.user.email : "N/A"})</p>
//             <p><strong>Details:</strong></p>
//             <table>
//               <tbody>
//                 ${booking.bookingType === "Birthday"
//                   ? `
//                   <tr><th>Guests</th><td>${booking.guests}</td></tr>
//                   <tr><th>Cake Size</th><td>${booking.cakeSize}</td></tr>
//                   <tr><th>Cake Type</th><td>${booking.cakeType}</td></tr>
//                   <tr><th>Payment Method</th><td>${booking.paymentMethod}</td></tr>
//                   <tr><th>Event Date</th><td>${new Date(booking.eventDate).toLocaleDateString()}</td></tr>
//                 `
//                   : booking.bookingType === "Catering"
//                   ? `
//                   <tr><th>Event Type</th><td>${booking.eventType}</td></tr>
//                   <tr><th>Guests</th><td>${booking.guests}</td></tr>
//                   <tr><th>Location</th><td>${booking.location}</td></tr>
//                   <tr><th>Payment Method</th><td>${booking.paymentMethod}</td></tr>
//                   <tr><th>Event Date</th><td>${new Date(booking.eventDate).toLocaleDateString()}</td></tr>
//                 `
//                   : booking.bookingType === "Family Dining"
//                   ? `
//                   <tr><th>Dining Table</th><td>${booking.diningTable}</td></tr>
//                   <tr><th>Event DateTime</th><td>${new Date(booking.eventDateTime).toLocaleString()}</td></tr>
//                 `
//                   : booking.bookingType === "Wedding"
//                   ? `
//                   <tr><th>Event Type</th><td>${booking.eventType}</td></tr>
//                   <tr><th>Guests</th><td>${booking.guests}</td></tr>
//                   <tr><th>Location</th><td>${booking.location}</td></tr>
//                   <tr><th>Catering Service</th><td>${booking.cateringService}</td></tr>
//                   <tr><th>Decoration Service</th><td>${booking.decorationService}</td></tr>
//                   <tr><th>Payment Method</th><td>${booking.paymentMethod}</td></tr>
//                   <tr><th>Event Date</th><td>${new Date(booking.eventDate).toLocaleDateString()}</td></tr>
//                 `
//                   : ""}
//               </tbody>
//             </table>
//             <p><strong>Booked On:</strong> ${new Date(booking.createdAt).toLocaleDateString()}</p>
//           </div>
//         `;
//       });

//       htmlContent += `
//           </body>
//         </html>
//       `;

//       printWindow.document.open();
//       printWindow.document.write(htmlContent);
//       printWindow.document.close();
//       printWindow.onload = function () {
//         printWindow.focus();
//         printWindow.print();
//         // Uncomment to auto-close after printing:
//         // printWindow.close();
//       };
//     } else {
//       alert("Unable to open print window. Please allow pop-ups.");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="services-loading">
//         <FontAwesomeIcon icon={faSpinner} spin /> Loading Bookings...
//       </div>
//     );
//   }

//   return (
//     <div className="services-page">
//       <div className="services-header">
//         <h2>Booking Services Management</h2>
//         <button className="print-btn" onClick={printInvoices}>
//           <FontAwesomeIcon icon={faPrint} /> Download Invoices
//         </button>
//       </div>

//       <div className="bookings-list">
//         <h3>All Bookings</h3>
//         {bookings.length === 0 ? (
//           <p>No bookings found.</p>
//         ) : (
//           <table className="bookings-table">
//             <thead>
//               <tr>
//                 <th>Booking Type</th>
//                 <th>User</th>
//                 <th>Email</th>
//                 <th>Details</th>
//                 <th>Booked On</th>
//               </tr>
//             </thead>
//             <tbody>
//               {bookings.map((booking) => (
//                 <tr key={booking._id}>
//                   <td>{booking.bookingType}</td>
//                   <td>{booking.user ? booking.user.name : "N/A"}</td>
//                   <td>{booking.user ? booking.user.email : "N/A"}</td>
//                   <td>
//                     {booking.bookingType === "Birthday" && (
//                       <>
//                         <div>Guests: {booking.guests}</div>
//                         <div>Cake: {booking.cakeType} ({booking.cakeSize})</div>
//                         <div>Payment: {booking.paymentMethod}</div>
//                       </>
//                     )}
//                     {booking.bookingType === "Catering" && (
//                       <>
//                         <div>Event: {booking.eventType}</div>
//                         <div>Guests: {booking.guests}</div>
//                         <div>Location: {booking.location}</div>
//                       </>
//                     )}
//                     {booking.bookingType === "Family Dining" && (
//                       <>
//                         <div>Dining Table: {booking.diningTable}</div>
//                         <div>Date: {new Date(booking.eventDateTime).toLocaleString()}</div>
//                       </>
//                     )}
//                     {booking.bookingType === "Wedding" && (
//                       <>
//                         <div>Event: {booking.eventType}</div>
//                         <div>Guests: {booking.guests}</div>
//                         <div>Location: {booking.location}</div>
//                       </>
//                     )}
//                   </td>
//                   <td>{new Date(booking.createdAt).toLocaleDateString()}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>

//       <div className="chart-section">
//         <h3>Service Bookings Chart</h3>
//         {chartData ? (
//           <div className="chart-container">
//             <Bar
//               data={chartData}
//               options={{
//                 maintainAspectRatio: false,
//                 responsive: true,
//                 scales: {
//                   x: { ticks: { font: { size: 12 } } },
//                   y: { ticks: { font: { size: 12 } }, beginAtZero: true },
//                 },
//               }}
//             />
//           </div>
//         ) : (
//           <p>No chart data available</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Services;
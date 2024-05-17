async function searchShipment() {
    const operationNumber = document.getElementById('operation-number').value;
    const archiveDetailsContent = document.getElementById('archive-details-content');

    const shipment = shipmentArchive.find(shipment => shipment.operationNumber === operationNumber);

    if (shipment) {
        let fileLinks = '';
        for (let i = 0; i < shipment.files.length; i++) {
            const file = shipment.files[i];
            const url = URL.createObjectURL(file);
            fileLinks += `<p><a href="${url}" download="${file.name}">${file.name}</a></p>`;
        }

        archiveDetailsContent.innerHTML = `
            <p><strong>Origin:</strong> ${shipment.origin}</p>
            <p><strong>Destination:</strong> ${shipment.destination}</p>
            <p><strong>Estimated Delivery:</strong> ${shipment.estimatedDelivery}</p>
            <p><strong>Operation Number:</strong> ${shipment.operationNumber}</p>
            <div><strong>Files:</strong>${fileLinks}</div>
        `;
    } else {
        archiveDetailsContent.innerHTML = '<p>Shipment not found. Please check the operation number and try again.</p>';
    }

    return false; // Prevent form submission
}

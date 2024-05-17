let fileInputCount = 1;
let shipmentArchive = [];

function addFileInput() {
    fileInputCount++;
    const fileInputContainer = document.getElementById('file-upload-container');
    const newFileInput = document.createElement('div');
    newFileInput.innerHTML = `
        <label for="file-upload-${fileInputCount}">Upload File:</label>
        <input type="file" id="file-upload-${fileInputCount}" name="file-upload-${fileInputCount}">
    `;
    fileInputContainer.appendChild(newFileInput);
}

function generateOperationNumber() {
    return 'OP' + Date.now();
}

async function registerShipment() {
    const origin = document.getElementById('origin').value;
    const destination = document.getElementById('destination').value;
    const estimatedDelivery = document.getElementById('estimated-delivery').value;
    const operationNumber = generateOperationNumber();

    const formData = new FormData();
    formData.append('origin', origin);
    formData.append('destination', destination);
    formData.append('estimatedDelivery', estimatedDelivery);
    formData.append('operationNumber', operationNumber);

    for (let i = 1; i <= fileInputCount; i++) {
        const fileInput = document.getElementById(`file-upload-${i}`);
        if (fileInput && fileInput.files.length > 0) {
            formData.append(`file${i}`, fileInput.files[0]);
        }
    }

    // Simulate saving data to backend and adding to local archive
    const response = await simulateBackendCall(formData);

    if (response.success) {
        shipmentArchive.push({
            origin,
            destination,
            estimatedDelivery,
            operationNumber,
            files: formData.getAll()
        });
        alert(`Shipment registered successfully! Operation Number: ${operationNumber}`);
    } else {
        alert('Failed to register shipment. Please try again.');
    }

    return false; // Prevent form submission
}

// Simulate backend calls with a delay
async function simulateBackendCall(data) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ success: true });
        }, 1000);
    });
}

async function trackShipment() {
    const trackingNumber = document.getElementById('tracking-number').value;
    const detailsContent = document.getElementById('details-content');

    if (!trackingNumber) {
        alert("Please enter a tracking number");
        return false;
    }

    // Placeholder for fetching shipment details - replace with actual API call
    const shipmentDetails = await fetchShipmentDetails(trackingNumber);

    if (shipmentDetails) {
        detailsContent.innerHTML = `
            <p><strong>Status:</strong> ${shipmentDetails.status}</p>
            <p><strong>Origin:</strong> ${shipmentDetails.origin}</p>
            <p><strong>Destination:</strong> ${shipmentDetails.destination}</p>
            <p><strong>Estimated Delivery:</strong> ${shipmentDetails.estimatedDelivery}</p>
        `;
    } else {
        detailsContent.innerHTML = '<p>Shipment not found. Please check the tracking number and try again.</p>';
    }

    return false; // Prevent form submission
}

async function generateReport() {
    const clientEmail = document.getElementById('client-email').value;

    // Simulate generating and sending a report to the client
    const response = await simulateBackendCall({
        action: 'generateReport',
        email: clientEmail
    });

    if (response.success) {
        alert(`Report sent to ${clientEmail}`);
    } else {
        alert('Failed to generate report. Please try again.');
    }

    return false; // Prevent form submission
}

async function fetchShipmentDetails(trackingNumber) {
    // Simulating an API call with a delay
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                status: "In Transit",
                origin: "New York, NY",
                destination: "Los Angeles, CA",
                estimatedDelivery: "2024-05-21"
            });
        }, 1000);
    });
}

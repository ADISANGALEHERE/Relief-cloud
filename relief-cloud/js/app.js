// Web3 and Contract Setup
let web3;
let contract;
let userAccount;
let userRole = localStorage.getItem('userRole');
let userName = localStorage.getItem('userName');

// Contract ABI and Address
const contractABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "enum ReliefCloud.AlertPriority",
				"name": "priority",
				"type": "uint8"
			}
		],
		"name": "AlertCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "alertId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "donor",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "item",
				"type": "string"
			}
		],
		"name": "DonationReceived",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "alertId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "feedback",
				"type": "string"
			}
		],
		"name": "FeedbackSubmitted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "ngo",
				"type": "address"
			}
		],
		"name": "NGOApproved",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "ngo",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"name": "NGORequested",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "alertId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "ngo",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "proof",
				"type": "string"
			}
		],
		"name": "ProofOfDelivery",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "alertId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "requester",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "resource",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "quantity",
				"type": "uint256"
			}
		],
		"name": "ResourceRequested",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "admin",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "alertId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "alerts",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "message",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "location",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "latitude",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "longitude",
				"type": "uint256"
			},
			{
				"internalType": "enum ReliefCloud.AlertPriority",
				"name": "priority",
				"type": "uint8"
			},
			{
				"internalType": "address",
				"name": "postedBy",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "createdAt",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "expiresAt",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "active",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "ngo",
				"type": "address"
			}
		],
		"name": "approveNGO",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "message",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "location",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "lat",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "lon",
				"type": "uint256"
			},
			{
				"internalType": "enum ReliefCloud.AlertPriority",
				"name": "priority",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "durationInDays",
				"type": "uint256"
			}
		],
		"name": "createAlert",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "item",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "qty",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "destination",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "proof",
				"type": "string"
			}
		],
		"name": "donateToAlert",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getDonations",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "donor",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "item",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "quantity",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "destination",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "proof",
						"type": "string"
					}
				],
				"internalType": "struct ReliefCloud.Donation[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getFeedbacks",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getResourceRequests",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "requester",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "resource",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "quantity",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "location",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "fulfilled",
						"type": "bool"
					}
				],
				"internalType": "struct ReliefCloud.ResourceRequest[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "isAlertActive",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "isMedia",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "isNGO",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "isVolunteer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "info",
				"type": "string"
			}
		],
		"name": "requestNGOAccess",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "resource",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "qty",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "location",
				"type": "string"
			}
		],
		"name": "requestResource",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "requestId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "feedback",
				"type": "string"
			}
		],
		"name": "submitFeedback",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "proof",
				"type": "string"
			}
		],
		"name": "submitProofOfDelivery",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

// Contract configuration
const contractAddress = process.env.CONTRACT_ADDRESS || 'your_deployed_contract_address';
const rpcUrl = process.env.RPC_URL || 'your_ethereum_node_url';

// Initialize Web3
async function initWeb3() {
	if (typeof window.ethereum !== 'undefined') {
		try {
			// Request account access
			await window.ethereum.request({ method: 'eth_requestAccounts' });
			web3 = new Web3(window.ethereum);
			contract = new web3.eth.Contract(contractABI, contractAddress);
			
			// Get user account
			const accounts = await web3.eth.getAccounts();
			userAccount = accounts[0];
			
			// Update UI
			document.getElementById('walletAddress').textContent = `${userAccount.substring(0, 6)}...${userAccount.substring(38)}`;
			document.getElementById('walletInfo').classList.remove('hidden');
			document.getElementById('connectWallet').classList.add('hidden');
			
			// Check user roles on the blockchain
			await checkBlockchainRoles();
			
			// Load role-specific content
			loadRoleContent();
		} catch (error) {
			console.error('User denied account access');
			showError('Please connect your wallet to continue');
		}
	} else {
		console.error('Please install MetaMask!');
		showError('Please install MetaMask to use this application');
	}
}

// Check user roles on the blockchain
async function checkBlockchainRoles() {
	try {
		const isUserNGO = await contract.methods.isNGO(userAccount).call();
		const isUserMedia = await contract.methods.isMedia(userAccount).call();
		const isUserVolunteer = await contract.methods.isVolunteer(userAccount).call();
		
		// Update user role based on blockchain data
		if (isUserNGO) userRole = 'ngo';
		else if (isUserMedia) userRole = 'media';
		else if (isUserVolunteer) userRole = 'volunteer';
		
		// Store updated role
		localStorage.setItem('userRole', userRole);
	} catch (error) {
		console.error('Error checking blockchain roles:', error);
	}
}

// Role-based Content Loading
function loadRoleContent() {
	if (!checkAuth()) return;

	// Show user info
	document.getElementById('userRole').textContent = userRole.charAt(0).toUpperCase() + userRole.slice(1);
	document.getElementById('userName').textContent = userName;
	
	// Hide all role-specific sections first
	document.getElementById('adminDashboard').classList.add('hidden');
	document.getElementById('ngoRegistration').classList.add('hidden');
	document.getElementById('alertCreation').classList.add('hidden');
	document.getElementById('donationSection').classList.add('hidden');
	document.getElementById('resourceRequests').classList.add('hidden');
	
	// Show role-specific sections
	switch(userRole) {
		case 'admin':
			document.getElementById('adminDashboard').classList.remove('hidden');
			loadAdminDashboard();
			break;
		case 'ngo':
			document.getElementById('ngoRegistration').classList.remove('hidden');
			document.getElementById('donationSection').classList.remove('hidden');
			document.getElementById('resourceRequests').classList.remove('hidden');
			break;
		case 'media':
			document.getElementById('alertCreation').classList.remove('hidden');
			break;
		case 'volunteer':
			document.getElementById('donationSection').classList.remove('hidden');
			document.getElementById('resourceRequests').classList.remove('hidden');
			break;
	}
	
	// Load alerts for all roles
	loadAlerts();
}

// Admin Functions
async function loadAdminDashboard() {
	try {
		// Check if user is admin
		const adminAddress = await contract.methods.admin().call();
		if (adminAddress.toLowerCase() !== userAccount.toLowerCase()) {
			showError('Access denied. Admin privileges required.');
			return;
		}

		// Show admin dashboard
		document.getElementById('adminDashboard').classList.remove('hidden');
		
		// Load pending NGO approvals
		await loadPendingNGOs();
		
		// Load system statistics
		await loadSystemStats();
		
		// Load recent activity
		await loadRecentActivity();
	} catch (error) {
		console.error('Error loading admin dashboard:', error);
		showError('Error loading admin dashboard');
	}
}

async function loadPendingNGOs() {
	try {
		const ngoApprovalsList = document.getElementById('ngoApprovalsList');
		ngoApprovalsList.innerHTML = '';

		// Get all NGO requests
		const events = await contract.getPastEvents('NGORequested', {
			fromBlock: 0,
			toBlock: 'latest'
		});

		for (const event of events) {
			const ngoAddress = event.returnValues.ngo;
			const ngoRequest = await contract.methods.ngoRequests(ngoAddress).call();
			
			if (!ngoRequest.approved) {
				const div = document.createElement('div');
				div.className = 'bg-gray-50 p-4 rounded-lg';
				div.innerHTML = `
					<div class="flex justify-between items-start">
						<div>
							<h4 class="font-semibold">${ngoRequest.name}</h4>
							<p class="text-sm text-gray-600">${ngoRequest.info}</p>
							<p class="text-xs text-gray-500 mt-1">Address: ${ngoAddress}</p>
						</div>
						<button onclick="approveNGO('${ngoAddress}')" 
								class="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600">
							Approve
						</button>
					</div>
				`;
				ngoApprovalsList.appendChild(div);
			}
		}
	} catch (error) {
		console.error('Error loading pending NGOs:', error);
		showError('Error loading pending NGO approvals');
	}
}

async function approveNGO(ngoAddress) {
	try {
		showLoading('Approving NGO...');
		await contract.methods.approveNGO(ngoAddress).send({ from: userAccount });
		hideLoading();
		showSuccess('NGO approved successfully!');
		await loadPendingNGOs();
	} catch (error) {
		hideLoading();
		console.error('Error approving NGO:', error);
		showError('Error approving NGO');
	}
}

async function loadSystemStats() {
	try {
		// Get total alerts
		const alertId = await contract.methods.alertId().call();
		document.getElementById('totalAlerts').textContent = alertId;

		// Count active alerts
		let activeCount = 0;
		for (let i = 1; i <= alertId; i++) {
			const isActive = await contract.methods.isAlertActive(i).call();
			if (isActive) activeCount++;
		}
		document.getElementById('activeAlerts').textContent = activeCount;

		// Count total donations
		let totalDonations = 0;
		for (let i = 1; i <= alertId; i++) {
			const donations = await contract.methods.getDonations(i).call();
			totalDonations += donations.length;
		}
		document.getElementById('totalDonations').textContent = totalDonations;

		// Count registered NGOs
		const events = await contract.getPastEvents('NGOApproved', {
			fromBlock: 0,
			toBlock: 'latest'
		});
		document.getElementById('registeredNGOs').textContent = events.length;

		// Count media accounts
		const mediaEvents = await contract.getPastEvents('AlertCreated', {
			fromBlock: 0,
			toBlock: 'latest'
		});
		const uniqueMedia = new Set(mediaEvents.map(e => e.returnValues.postedBy));
		document.getElementById('mediaAccounts').textContent = uniqueMedia.size;

		// Count volunteers (approximate based on donations)
		const volunteerEvents = await contract.getPastEvents('DonationReceived', {
			fromBlock: 0,
			toBlock: 'latest'
		});
		const uniqueVolunteers = new Set(volunteerEvents.map(e => e.returnValues.donor));
		document.getElementById('volunteerCount').textContent = uniqueVolunteers.size;
	} catch (error) {
		console.error('Error loading system stats:', error);
		showError('Error loading system statistics');
	}
}

async function loadRecentActivity() {
	try {
		const recentActivity = document.getElementById('recentActivity');
		recentActivity.innerHTML = '';

		// Get recent events
		const events = await Promise.all([
			contract.getPastEvents('AlertCreated', { fromBlock: 0, toBlock: 'latest' }),
			contract.getPastEvents('DonationReceived', { fromBlock: 0, toBlock: 'latest' }),
			contract.getPastEvents('NGOApproved', { fromBlock: 0, toBlock: 'latest' }),
			contract.getPastEvents('ResourceRequested', { fromBlock: 0, toBlock: 'latest' })
		]);

		// Combine and sort events by block number
		const allEvents = events.flat().sort((a, b) => b.blockNumber - a.blockNumber);

		// Display last 10 events
		for (const event of allEvents.slice(0, 10)) {
			const div = document.createElement('div');
			div.className = 'bg-gray-50 p-4 rounded-lg';
			
			let content = '';
			switch (event.event) {
				case 'AlertCreated':
					content = `New alert created: ${event.returnValues.title}`;
					break;
				case 'DonationReceived':
					content = `New donation received: ${event.returnValues.item}`;
					break;
				case 'NGOApproved':
					content = `NGO approved: ${event.returnValues.ngo}`;
					break;
				case 'ResourceRequested':
					content = `Resource requested: ${event.returnValues.resource}`;
					break;
			}

			div.innerHTML = `
				<div class="flex items-center">
					<i class="fas fa-circle text-primary text-xs mr-2"></i>
					<p class="text-sm">${content}</p>
				</div>
			`;
			recentActivity.appendChild(div);
		}
	} catch (error) {
		console.error('Error loading recent activity:', error);
		showError('Error loading recent activity');
	}
}

// NGO Functions
async function registerNGO(event) {
	event.preventDefault();
	showLoading('Registering NGO...');
	
	try {
		const name = document.getElementById('ngoName').value;
		const info = document.getElementById('ngoInfo').value;
		
		await contract.methods.requestNGOAccess(name, info).send({ from: userAccount });
		hideLoading();
		showSuccess('NGO registration submitted successfully!');
	} catch (error) {
		hideLoading();
		console.error('Error registering NGO:', error);
		showError('Error registering NGO. Please try again.');
	}
}

// Alert Functions
async function createAlert(event) {
	event.preventDefault();
	showLoading('Creating alert...');
	
	try {
		const title = document.getElementById('alertTitle').value;
		const message = document.getElementById('alertMessage').value;
		const priority = parseInt(document.getElementById('priority').value);
		const location = document.getElementById('alertLocation').value;
		const duration = parseInt(document.getElementById('duration').value);
		const latitude = parseInt(document.getElementById('latitude').value);
		const longitude = parseInt(document.getElementById('longitude').value);
		
		await contract.methods.createAlert(
			title,
			message,
			location,
			latitude,
			longitude,
			priority,
			duration
		).send({ from: userAccount });
		
		hideLoading();
		showSuccess('Alert created successfully!');
		loadAlerts();
	} catch (error) {
		hideLoading();
		console.error('Error creating alert:', error);
		showError('Error creating alert. Please try again.');
	}
}

// Donation Functions
async function submitDonation(event) {
	event.preventDefault();
	showLoading('Submitting donation...');
	
	try {
		const item = document.getElementById('donationItem').value;
		const quantity = parseInt(document.getElementById('donationQuantity').value);
		const destination = document.getElementById('donationDestination').value;
		const proof = document.getElementById('donationProof').value;
		const alertId = parseInt(document.getElementById('currentAlertId').value);
		
		await contract.methods.donateToAlert(
			alertId,
			item,
			quantity,
			destination,
			proof
		).send({ from: userAccount });
		
		hideLoading();
		showSuccess('Donation submitted successfully!');
		loadAlerts();
	} catch (error) {
		hideLoading();
		console.error('Error submitting donation:', error);
		showError('Error submitting donation. Please try again.');
	}
}

// Resource Request Functions
async function submitResourceRequest(event) {
	event.preventDefault();
	showLoading('Submitting resource request...');
	
	try {
		const resource = document.getElementById('resourceName').value;
		const quantity = parseInt(document.getElementById('resourceQuantity').value);
		const location = document.getElementById('resourceLocation').value;
		const alertId = parseInt(document.getElementById('currentAlertId').value);
		
		await contract.methods.requestResource(
			alertId,
			resource,
			quantity,
			location
		).send({ from: userAccount });
		
		hideLoading();
		showSuccess('Resource request submitted successfully!');
		loadAlerts();
	} catch (error) {
		hideLoading();
		console.error('Error submitting resource request:', error);
		showError('Error submitting resource request. Please try again.');
	}
}

// Alert Loading and Display
async function loadAlerts() {
	try {
		const alertId = await contract.methods.alertId().call();
		const alertsList = document.getElementById('alertsList');
		alertsList.innerHTML = '';
		
		for (let i = 1; i <= alertId; i++) {
			const alert = await contract.methods.alerts(i).call();
			if (alert.active) {
				const isActive = await contract.methods.isAlertActive(i).call();
				if (isActive) {
					const alertElement = createAlertElement(alert);
					alertsList.appendChild(alertElement);
				}
			}
		}
	} catch (error) {
		console.error('Error loading alerts:', error);
		showError('Error loading alerts');
	}
}

function createAlertElement(alert) {
	const div = document.createElement('div');
	div.className = 'bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-200';
	
	const priorityClass = getPriorityClass(alert.priority);
	const priorityText = getPriorityText(alert.priority);
	
	div.innerHTML = `
		<h3 class="font-bold text-lg mb-2">${alert.title}</h3>
		<p class="text-gray-600 mb-2">${alert.message}</p>
		<div class="flex justify-between items-center text-sm">
			<span class="${priorityClass}">${priorityText}</span>
			<span class="text-gray-500">${alert.location}</span>
		</div>
		<div class="mt-4 flex justify-between items-center">
			<button onclick="showAlertDetails('${alert.id}')" class="text-primary hover:text-blue-600">
				View Details
			</button>
			<button onclick="setCurrentAlert('${alert.id}')" class="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600">
				Donate
			</button>
		</div>
	`;
	
	return div;
}

// Utility Functions
function getPriorityClass(priority) {
	const classes = {
		0: 'text-success',
		1: 'text-info',
		2: 'text-warning',
		3: 'text-danger'
	};
	return classes[priority] || classes[0];
}

function getPriorityText(priority) {
	const texts = ['Low', 'Medium', 'High', 'Critical'];
	return texts[priority] || 'Unknown';
}

function showLoading(message) {
	document.getElementById('loadingMessage').textContent = message;
	document.getElementById('loadingModal').classList.remove('hidden');
}

function hideLoading() {
	document.getElementById('loadingModal').classList.add('hidden');
}

function showSuccess(message) {
	const notification = document.createElement('div');
	notification.className = 'fixed bottom-4 right-4 bg-success text-white px-6 py-3 rounded-lg shadow-lg';
	notification.textContent = message;
	document.body.appendChild(notification);
	
	setTimeout(() => {
		notification.remove();
	}, 3000);
}

function showError(message) {
	const notification = document.createElement('div');
	notification.className = 'fixed bottom-4 right-4 bg-danger text-white px-6 py-3 rounded-lg shadow-lg';
	notification.textContent = message;
	document.body.appendChild(notification);
	
	setTimeout(() => {
		notification.remove();
	}, 3000);
}

function showAlertDetails(alertId) {
	// Implement alert details display
	document.getElementById('alertDetailsModal').classList.remove('hidden');
}

function closeModal(modalId) {
	document.getElementById(modalId).classList.add('hidden');
}

function logout() {
	localStorage.removeItem('userRole');
	localStorage.removeItem('userName');
	window.location.href = 'login.html';
}

// Check Authentication
function checkAuth() {
	if (!userRole || !userName) {
		window.location.href = 'login.html';
		return false;
	}
	return true;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
	// Check authentication first
	if (!checkAuth()) return;

	// Initialize Web3
	document.getElementById('connectWallet').addEventListener('click', initWeb3);
	
	// Form submissions
	document.getElementById('ngoForm')?.addEventListener('submit', registerNGO);
	document.getElementById('alertForm')?.addEventListener('submit', createAlert);
	document.getElementById('donationForm')?.addEventListener('submit', submitDonation);
	document.getElementById('resourceRequestForm')?.addEventListener('submit', submitResourceRequest);
	
	// Load role-specific content
	loadRoleContent();
}); 
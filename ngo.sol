// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ReliefCloud {
    address public admin;

    // Roles
    mapping(address => bool) public isNGO;
    mapping(address => bool) public isMedia;
    mapping(address => bool) public isVolunteer;

    uint public alertId;
    uint public requestId;

    enum AlertPriority { Low, Medium, High, Critical }

    struct Alert {
        uint id;
        string title;
        string message;
        string location;
        uint latitude;
        uint longitude;
        AlertPriority priority;
        address postedBy;
        uint createdAt;
        uint expiresAt;
        bool active;
    }

    struct NGORequest {
        address ngo;
        string name;
        string info;
        bool approved;
    }

    struct Donation {
        address donor;
        string item;
        uint quantity;
        string destination;
        string proof;
    }

    struct ResourceRequest {
        address requester;
        string resource;
        uint quantity;
        string location;
        bool fulfilled;
    }

    mapping(uint => Alert) public alerts;
    mapping(address => NGORequest) public ngoRequests;
    mapping(uint => Donation[]) public alertDonations;
    mapping(uint => ResourceRequest[]) public resourceRequests;
    mapping(uint => string[]) public feedbacks;

    event NGORequested(address indexed ngo, string name);
    event NGOApproved(address indexed ngo);
    event AlertCreated(uint indexed id, string title, AlertPriority priority);
    event DonationReceived(uint indexed alertId, address donor, string item);
    event FeedbackSubmitted(uint indexed alertId, address user, string feedback);
    event ResourceRequested(uint indexed alertId, address requester, string resource, uint quantity);
    event ProofOfDelivery(uint indexed alertId, address ngo, string proof);

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not admin");
        _;
    }

    modifier onlyNGO() {
        require(isNGO[msg.sender], "Not NGO");
        _;
    }

    modifier onlyMedia() {
        require(isMedia[msg.sender], "Not Media");
        _;
    }

    modifier onlyVolunteer() {
        require(isVolunteer[msg.sender], "Not Volunteer");
        _;
    }

    // ========== NGO REGISTRATION ==========
    function requestNGOAccess(string memory name, string memory info) external {
        require(!ngoRequests[msg.sender].approved, "Already approved or requested");
        ngoRequests[msg.sender] = NGORequest(msg.sender, name, info, false);
        emit NGORequested(msg.sender, name);
    }

    function approveNGO(address ngo) external onlyAdmin {
        require(!ngoRequests[ngo].approved, "Already approved");
        ngoRequests[ngo].approved = true;
        isNGO[ngo] = true;
        emit NGOApproved(ngo);
    }

    // ========== ALERT CREATION ==========
    function createAlert(
        string memory title,
        string memory message,
        string memory location,
        uint lat,
        uint lon,
        AlertPriority priority,
        uint durationInDays
    ) external onlyMedia {
        alertId++;
        alerts[alertId] = Alert({
            id: alertId,
            title: title,
            message: message,
            location: location,
            latitude: lat,
            longitude: lon,
            priority: priority,
            postedBy: msg.sender,
            createdAt: block.timestamp,
            expiresAt: block.timestamp + (durationInDays * 1 days),
            active: true  // Automatically active upon creation
        });
        emit AlertCreated(alertId, title, priority);
    }

    function isAlertActive(uint _id) public view returns (bool) {
        Alert memory a = alerts[_id];
        return a.active && block.timestamp < a.expiresAt;
    }

    // ========== DONATIONS ==========
    function donateToAlert(
        uint _id,
        string memory item,
        uint qty,
        string memory destination,
        string memory proof
    ) external {
        require(isAlertActive(_id), "Inactive alert");
        alertDonations[_id].push(Donation(msg.sender, item, qty, destination, proof));
        emit DonationReceived(_id, msg.sender, item);
    }

    // ========== RESOURCE REQUESTS ==========
    function requestResource(
        uint _id,
        string memory resource,
        uint qty,
        string memory location
    ) external {
        require(isAlertActive(_id), "Inactive alert");
        resourceRequests[_id].push(ResourceRequest(msg.sender, resource, qty, location, false));
        emit ResourceRequested(_id, msg.sender, resource, qty);
    }

    // ========== PROOF OF DELIVERY ==========
    function submitProofOfDelivery(uint _id, string memory proof) external onlyNGO {
        require(isAlertActive(_id), "Inactive alert");
        emit ProofOfDelivery(_id, msg.sender, proof);
    }

    // ========== FEEDBACK ==========
    function submitFeedback(uint _id, string memory feedback) external {
        require(alerts[_id].id != 0, "Invalid alert");
        feedbacks[_id].push(feedback);
        emit FeedbackSubmitted(_id, msg.sender, feedback);
    }

    // ========== GETTERS ==========
    function getFeedbacks(uint _id) external view returns (string[] memory) {
        return feedbacks[_id];
    }

    function getDonations(uint _id) external view returns (Donation[] memory) {
        return alertDonations[_id];
    }

    function getResourceRequests(uint _id) external view returns (ResourceRequest[] memory) {
        return resourceRequests[_id];
    }
}

pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint minimum) public {
       address newCampaign = new Campaign(minimum, msg.sender);
       deployedCampaigns.push(newCampaign);
    }

    function getCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}

contract Campaign {
    // struct definition, does not create an instance of a request (type)
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        mapping(address => bool) approvals;
        uint approvalCount; // mapping has no iterator/length function
    }

     address public manager;
     uint public minimumContribtion;
     mapping(address => bool) public approvers;
     Request[] public requests;
     uint public approversCount;

     modifier restricted() {
        require(msg.sender == manager);
        _;
     }


     function Campaign(uint minimum, address creator) public {
        manager = creator;
        minimumContribtion = minimum;
     }

     function contribute() public payable {
         require(msg.value > minimumContribtion);

         approvers[msg.sender] = true;
         approversCount++;
     }
    
    function createRequest(string description, uint value, address recipient) public restricted {        
        Request memory newRequest = Request({
           description: description,
           value: value,
           recipient: recipient,
           complete: false,
           approvalCount: 0
        });

        requests.push(newRequest);
    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];
        require(approvers[msg.sender]); // sender in approvers list
        require(!request.approvals[msg.sender]); // sender already voted?

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    } 

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];

        require(!request.complete);

        require(request.approvalCount > (approversCount / 2));

        request.recipient.transfer(request.value);
        request.complete = true;
    }
}
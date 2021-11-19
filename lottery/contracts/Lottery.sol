pragma solidity ^0.4.17;

contract Lottery {
    address public manager;
    address[] public players;
    
    function Lottery() public {
        manager = msg.sender;
    }
    
    function enter() public payable {
        require(msg.value > .01 ether);
        
        players.push(msg.sender);
    }
    
    function random() private view returns (uint) {
        return uint(sha3(block.difficulty, now, players));
    }
    
    function pickWinner() public restricted {

        uint index = random() % players.length;
        players[index].transfer(this.balance); 
        //lastWinner = players[index];
        players = new address[](0);  // reset for a new round
    }
    
    modifier restricted() {
        require(msg.sender == manager);
        _;  // compiler takes the code of the function and adds it here
    }
    
    function getPlayers() public view returns (address[]) {
        return players;
    }
}
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
abi = JSON.parse('[{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"x","type":"bytes32"}],"name":"bytes32ToString","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"contractOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"type":"constructor"}]')
VotingContract = web3.eth.contract(abi);

// In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
contractInstance = VotingContract.at('0x7495123a7f59ba686078d1d13d57115fc8a01fca');

parties = { "BJP": "party-1", "CONG": "party-2", "AAP": "party-3", "BSP": "party-4", "SP": "party-5", "OTHERS": "party-6" }

function voteForCandidate() {
  $('#loader').show();
  candidateName = $('input[name=party]:checked').val();
  contractInstance.voteForCandidate(candidateName, { from: web3.eth.accounts[0] }, function () {
    let div_id = parties[candidateName];
    setTimeout(function () {
      $("#" + div_id).html(contractInstance.totalVotesFor.call(candidateName).toString());
      $('#loader').hide();
    }, 500);

  });
}

$(document).ready(function () {
  $('#loader').show();
  setTimeout(() => {
    partiesNames = Object.keys(parties);
    for (var i = 0; i < partiesNames.length; i++) {
      let name = partiesNames[i];
      let val = contractInstance.totalVotesFor.call(name).toString()
      $("#" + parties[name]).html(val);
    }
    $('#loader').hide();
  }, 500);

});
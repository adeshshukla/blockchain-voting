Web3 = require("web3");
solc = require('solc');
fs = require("fs");

// Block chain apirpc port
//web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8081"));   

web3 = new Web3();
var TestRPC = require("ethereumjs-testrpc");
web3.setProvider(TestRPC.provider());


var abiDefinition = JSON.parse('[{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getCandidateList","outputs":[{"name":"","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]');
var address = "0x69522edac428aa6a369d60e42d374da5575cb911";

console.log('------------------ Creating Contract ');
VotingContract = web3.eth.contract(abiDefinition);     
console.log('------------------ Contract Instance ');
contractInstance = VotingContract.at(address);
// console.log(contractInstance);   

web3.eth.getAccounts(function (error, result) {
    
    var defaultAcc = result[0];
    console.log("------------------ DefaultAcc Address => ", defaultAcc);

    // console.log('------------------ Unlocking acc ')
    // web3.personal.unlockAccount(defaultAcc,'test12345'
    // , function(res){
    //     console.log(res);
    // });

    

    contractInstance.totalVotesFor('Rama', function(err,result){
        console.log('------------------ Total Votes for Rama  --------------------')
        if(err){
            console.log('!!!...Error...!!!');
            console.log(err);
        }
        else{
            console.log("Total Votes => ", result.toString());
        }
    }) ;
    
    contractInstance.voteForCandidate('Rama', {from: defaultAcc}, function(err,result){
        console.log('------------------ Voting for Rama 1 --------------------')
        if(err){
            console.log('!!!...Error...!!!');
            console.log(err);
        }
        else{
            console.log("Tx => ", result);
        }
    }) ;

    contractInstance.voteForCandidate('Rama', {from: defaultAcc}, function(err,result){
        console.log('------------------ Voting for Rama 2 --------------------')
        if(err){
            console.log('!!!...Error...!!!');
            console.log(err);
        }
        else{
            console.log("Tx => ", result);
        }
    }) ;
    
    contractInstance.totalVotesFor('Rama', function(err,result){
        console.log('------------------ After voting for Rama  --------------------')
        if(err){
            console.log('!!!...Error...!!!');
            console.log(err);
        }
        else{                
            console.log("Total Votes => ", result.toString());
        }
    }) ;
     
});
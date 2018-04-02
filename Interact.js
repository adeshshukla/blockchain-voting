Web3 = require("web3");
solc = require('solc');
fs = require("fs");

// Block chain apirpc port
// private geth node provider
// web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8081"));   

// test rpc provider
// \node_modules\ethereumjs-testrpc\build>node cli.node.js
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));   

// web3 = new Web3();
// var TestRPC = require("ethereumjs-testrpc");
// web3.setProvider(TestRPC.provider());


//var abiDefinition = JSON.parse('[{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getCandidateList","outputs":[{"name":"","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]');
var abiDefinition = JSON.parse('[{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getCandidateList","outputs":[{"name":"","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]');
var address = "0x7df9c9aeecab91f051f07140dbd863c384838e93"

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

    

    contractInstance.totalVotesFor('BJP', function(err,result){
        console.log('------------------ Total Votes for BJP  --------------------')
        if(err){
            console.log('!!!...Error...!!!');
            console.log(err);
        }
        else{
            console.log("Total Votes => ", result.toString());
        }
    }) ;
    
    contractInstance.voteForCandidate('BJP', {from: defaultAcc}, function(err,result){
        console.log('------------------ Voting for BJP 1 --------------------')
        if(err){
            console.log('!!!...Error...!!!');
            console.log(err);
        }
        else{
            console.log("Tx => ", result);
        }
    }) ;

    contractInstance.voteForCandidate('BJP', {from: defaultAcc}, function(err,result){
        console.log('------------------ Voting for BJP 2 --------------------')
        if(err){
            console.log('!!!...Error...!!!');
            console.log(err);
        }
        else{
            console.log("Tx => ", result);
        }
    }) ;
    
    contractInstance.totalVotesFor('BJP', function(err,result){
        console.log('------------------ After voting for BJP  --------------------')
        if(err){
            console.log('!!!...Error...!!!');
            console.log(err);
        }
        else{                
            console.log("Total Votes => ", result.toString());
        }
    }) ;
     
});
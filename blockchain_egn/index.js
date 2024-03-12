//попытка взаимодействия js с сайтом
const {Blockchain} = require("./blockchain.js");
const blockchain = new Blockchain();

document.querySelector('btn_get_block').onClick = getBlock(blockchain, document.querySelector('index_inp').value);
document.querySelector('btn_get_chain').onClick = getChain(blockchain);
document.querySelector('btn_inp').onClick = newBlock(blockchain);

function getBlock(blockchain, n){
    if( blockchain.chain.lenght >= n - 1 )
        document.querySelector('block_get_block').value = blockchain[n];
    else
        document.querySelector('block_get_block').value = "Block not found";
}

function getChain(blockchain){
    document.querySelector('block_get_chain').value = blockchain.chain;
}

function newBlock(blockchain){
    blockchain.new_block(document.querySelector('info_inp').value);
    document.querySelector('info_inp').value = "";
}

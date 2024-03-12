//простейший блокчейн на js
const sha256 = require('js-sha256');

class Block{
    constructor(data = []){
        this.timestamp = Date.now().toString();
        this.data = data;
        this.prev_hash = '';
    }
    get_hash(){
        return sha256(this.prev_hash + this.timestamp + JSON.stringify(this.data));
    }
}

class Blockchain{
    constructor(){
        this.chain = [new Block("GENESIS")];
    }

    new_block (data){
        let block = new Block(data);

        block.prev_hash = this.last_block().get_hash();

        this.chain.push(block);
    }   

    last_block (){
        return this.chain[this.chain.length-1];
    }
}

module.exports = {Blockchain};
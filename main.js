const SHA256 = require('crypto-js/sha256');
class Block {

	constructor(index, timestamp, data, previousHash='') {
		this.index = index;
		this.timestamp = timestamp;
		this.data = data;
		this.previousHash = previousHash;
		this.hash = this.calculateHash();
	}

	calculateHash() {
		return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
	}

}

class BlockChain {

	constructor() {
		this.chain = [this.createGenesisBlock()];
	}

	createGenesisBlock() {
		return new Block(0, '04/23/2019', 'Genesis block', '0');
	}

	getLatestBlock() {
		return this.chain[this.chain.length - 1];
	}

	addBlock(newBlock) {
		newBlock.previousHash = this.getLatestBlock().hash;
		newBlock.hash = newBlock.calculateHash();
		this.chain.push(newBlock);
	}

	isChainValid() {
		for (let i = 1; i < this.chain.length; i++) {
			const currentBlock = this.chain[i];
			const previousBlock = this.chain[i - 1];

			if (currentBlock.hash !== currentBlock.calculateHash()) {
				return false;
			} 

			if (currentBlock.previousHash !== previousBlock.hash) {
				return false;
			}
		}
		return true;
	}

}

let blockchain = new BlockChain();
blockchain.addBlock(new Block(1, '04/23/2019', { amount: 4 }));
blockchain.addBlock(new Block(1, '04/24/2019', { amount: 10 }));

console.log(JSON.stringify(blockchain, null, 4));

console.log('Is chain valid? ' + blockchain.isChainValid());

blockchain.chain[1].data = { amount : 100 };

console.log('Is chain valid? ' + blockchain.isChainValid());

blockchain.chain[1].hash = blockchain.chain[1].calculateHash();

console.log('Is chain valid? ' + blockchain.isChainValid());


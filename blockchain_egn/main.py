
#бесполезный блокчейн на питоне

from datetime import datetime
import json
import os
import hashlib
from uuid import uuid4
from flask import Flask, jsonify, request

class Blockchain(object):

    def __init__(self):
        self.chain = []
        self.current_info = []
        self.new_block(proof=100, previous_hash=1)

    def new_block(self, proof, previous_hash = None):
        block = {
            'index': len(self.chain) + 1,
            'timestamp': datetime.now(),
            'data': self.current_info,
            'proof': proof,
            'previous_hash': previous_hash or self.last_block.hash
        }
        self.current_info = []
        self.chain.append(block)
        return block

    def new_info(self, personal_info):
        self.current_info.append({'Personal info:': personal_info})

    def proof_of_work(self, last_proof):
        proof = 0
        while self.valid_proof(last_proof, proof) is False:
            proof += 1
        return proof
   
    @staticmethod
    def valid_proof(last_proof, proof):
        guess = f'{last_proof}{proof}'.encode()
        guess_hash = hashlib.sha256(guess).hexdigest()
        return guess_hash[:4] == "0000"
   
    @staticmethod
    def hash(block):
        block_string = json.dumps(block, sort_keys=True).encode()
        return hashlib.sha256(block_string).hexdigest()

    @property 
    def last_block(self):
        return self.chain[-1]

#НЕОТКРЫВАТЬ
def sync():         
    node_blocks = []
    chaindata_dir = 'chaindata'
    if os.path.exists(chaindata_dir):
        for filename in os.listdir(chaindata_dir):
            if filename.endswith('.json'):
                filepath = '%s/%s' % (chaindata_dir, filename)
                with open(filepath, 'r') as block_file:
                    block_info = json.load(block_file)
                    node_blocks.append(block_info) #неверное добавление блока
    return node_blocks

# Создаем экземпляр узла
app = Flask(__name__)
 
# Генерируем уникальный на глобальном уровне адрес для этого узла
node_identifier = str(uuid4()).replace('-', '')
 
# Создаем экземпляр блокчейна
blockchain = Blockchain()
 
 
@app.route('/mine', methods=['GET'])
def mine():
    pass
 
@app.route('/chain', methods=['GET'])
def get_full_chain():
    response = {
        'chain': blockchain.chain,
        'length': len(blockchain.chain),
    }
    return jsonify(response), 200

@app.route('/transactions/new', methods=['POST'])
def new_info():
    values = request.get_json()
 
    # Убедитесь в том, что необходимые поля находятся среди POST-данных 
    required = ['Personal info:']
    if not all(k in values for k in required):
        return 'Missing values', 400
 
    # Создание новой транзакции
    index = blockchain.new_info(values['Personal info:'])

    response = {'message': f'Transaction will be added to Block {index}'}
    return jsonify(response), 201
 
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)



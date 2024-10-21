#cloud-config
echo "Начинаем выполнение команд..."
./network.sh down
./network.sh up createChannel -c userchannel -ca
./network.sh up createChannel -c fileschannel -ca
./network.sh deployCC -ccn userbasic -ccp ../asset-transfer-basic/user/chaincode-typescript/ -ccl typescript -c userchannel
./network.sh deployCC -ccn filesbasic -ccp ../asset-transfer-basic/files/chaincode-typescript/ -ccl typescript -c fileschannel
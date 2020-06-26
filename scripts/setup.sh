#!/usr/bin/env bash

echo "[setup] Enter contract deployer wallet mnemonic: "
read -r mnemonic
echo "[setup] Mnemonic: $mnemonic"
echo "[setup] Enter ShardID (0,1,2,3): "
read -r shard
echo "[setup] ShardID: $shard"
echo "[setup] Enter Gas Price for all Contract Deployment (suggested: 1000000000): "
read -r gasprice
echo "[setup] Gas Price: $gasprice"
echo "[setup] Enter Gas Limit for all Contract Deployment (suggested: 6721900): "
read -r gaslimit
echo "[setup] Gas Limit: $gaslimit"
echo "[setup] Enter Network (testnet, mainnet, localnet): "
read -r network
echo "[setup] network: $network"
echo "MNEMONIC='$mnemonic'
GASLIMIT=$gaslimit
GASPRICE=$gasprice
SHARD=$shard
NETWORK=$network
" > ./.env

const express = require('express');
const router = express.Router();


import VueSocketIOExt from 'vue-socket.io-extended';
import { io } from 'socket.io-client';
import { createApp } from 'vue';

const socket = io('http://socketserver.com:1923');

const app = createApp({});
app.use(VueSocketIOExt, socket);
console.log("in socket!!")
module.exports = socket
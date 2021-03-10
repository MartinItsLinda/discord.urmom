const fetch = require('node-fetch');
const EventEmitter = require('events');
const Intents = require('./constructors/Intents');
const ws = require('ws');
const os = require('os');
const pako = require('pako');
const handle = require('./handlers/Event');
const baseURL = 'https://discord.com/api';

/**
 * @typedef {Object} ClientOptions
 * @property {number} ClientOptions.shardCount
 * @property {number|Array} ClientOptions.shards
 * @property {number|bigint|Intents.FLAGS|Intents.FLAGS[]} ClientOptions.intents
 * @property {string[]} ClientOptions.partials
 * @property {number} ClientOptions.restWsBridgeTimeout
 * @property {number} ClientOptions.restRequestTimeout
 * @property {number} ClientOptions.restSweepInterval
 * @property {number} ClientOptions.retryLimit
 */

/**
 * The client class
 * @extends {EventEmitter}
 */
class Client extends EventEmitter {
  /**
   * @param {ClientOptions} options Options the client is instantiated with.
   */
  constructor(options) {
    super(options);

    if (this.options.shardCount === 1 && Array.isArray(this.options.shards)) this.options.shardCount = this.options.shards.length;

    if (this.options.shards === undefined && Number.isInteger(this.options.shardCount)) this.options.shards = Array.from({ length: this.options.shardCount }, (_, i) => i);

    if (Number.isInteger(this.options.shards)) this.options.shards = [this.options.shards];

    if (Array.isArray(this.options.shards)) this.options.shards = [...new Set(this.options.shards.filter(shard => !isNaN(shard) && shard >= 0 && shard < Infinity && shard === (shard | 0)))];

    if (this.options.intents === undefined) throw new TypeError('Missing intents');
    else this.options.intents = Intents.resolve(this.options.intents);

    if (!Number.isInteger(this.options.shardCount) || isNaN(this.options.shardCount) || this.options.shardCount < 1) throw new TypeError("[INVALID CLIENT OPTION] 'shardCount' must be a number greater or equal to 1");

    if (this.options.shards && !(this.options.shards === 'auto' || Array.isArray(this.options.shards))) throw new TypeError("[INVALID CLIENT OPTIONS] 'shards' must be 'auto', number or an array of numbers");

    if (!this.options.shards?.length) throw new TypeError('[INVALID SHARDS PROVIDED]');

    if (!Array.isArray(this.options.partials)) throw new TypeError("[INVALID CLIENT OPTION] 'partials' must be an array");

    if (!Number.isInteger(this.options.restWsBridgeTimeout) || isNaN(this.options.restWsBridgeTimeout)) throw new TypeError("[INVALID CLIENT OPTION] 'restWsBridgeTimeout' must be a number");

    if (!Number.isInteger(this.options.restRequestTimeout) || isNaN(this.options.restRequestTimeout)) throw new TypeError("[INVALID CLIENT OPTION] 'restRequestTimeout' must be a number");

    if (!Number.isInteger(this.options.restSweepInterval) || isNaN(this.options.restSweepInterval)) throw new TypeError("[INVALID CLIENT OPTION] 'restSweepInterval' must be a number");

    if (!Number.isInteger(this.options.retryLimit) || isNaN(this.options.retryLimit)) throw new TypeError("[INVALID CLIENT OPTION] 'retryLimit' must be a number");
  }

  /**
   * @param {string} method The method for this HTTP request (e.g. GET)
   * @param {string} path The endpoint to make a request to
   * @param {object?} body The payload to send while making the request
   * @returns {Promise<any>}
   */
  request(method, path, body) {
    return fetch(`${baseURL}${path}`, {
      method,
      headers: {
        Authorization: `Bot ${this.token}`,
        'Content-Type': 'application/json'
      },
      body: body ? JSON.stringify(body) : null
    }).then(res => res.json());
  }

  evaluate(data, flag) {
    if (typeof flag !== 'object' || flag === null) flag = {};
    if (flag.binary === undefined || flag.binary === null) return JSON.parse(data);
    const inflator = new pako.Inflate();
    inflator.push(data);
    if (inflator.err) throw new Error('An error occurred while decompressing data');
    return JSON.parse(inflator.toString());
  }

  /**
   * Attempts to connect to the Discord gateway
   * @returns {void}
   */
  connect() {
    this.emit('debug', 'Attemping to login to the Discord gateway...');
    this.socket = new ws('wss://gateway.discord.gg/?v=8&encoding=json');
    this.socket.once('open', () => {
      this.emit('debug', 'Attemping to login...');
      this.socket.send(JSON.stringify({
        op: 2,
        d: {
          token: this.token,
          intents: this.options.intents,
          properties: {
            $os: os.platform,
            $browser: 'discord.urmom',
            $device: 'discord.urmom'
          },
          presence: this.options.presence
        }
      }));
      this.socket.once('error', err => this.emit('error', err));
      this.socket.on('message', (message, flag) => handle(message, flag, this));
      this.socket.on('close', errCode => {
        if (client.hb) clearInterval(client.hb);
        if (errCode === 4004) throw new TypeError('Invalid client token');
        this.emit('debug', `Connection closed due to error code ${errCode}, Re-attempting to login...`);
        this.connect();
      });
    });
  }

  /**
   * Closes the connection to the gateway
   * @param {string?} reason The reason this connection is getting closed for
   * @returns {void}
   */
  destroy(reason) {
    if (!(this.socket instanceof ws)) throw new TypeError('There is no connection established to the gateway');
    this.socket.close();
    this.emit('debug', `Connection closed by '<Client>.destroy()'${reason !== undefined && reason !== null ? `, reason: ${reason}` : ''}`);
  }
}

module.exports = Client;
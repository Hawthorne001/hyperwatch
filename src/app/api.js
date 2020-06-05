const express = require('express');
const uuid = require('uuid');

const monitoring = require('../lib/monitoring');

const app = express();

app.use(express.json());

const logToString = (log) => {
  return `${log.getIn(['request', 'time'])} ${
    log.getIn(['hostname', 'value']) ||
    log.getIn(['address', 'value']) ||
    log.getIn(['request', 'address'])
  } ${log.getIn(['request', 'method'])} ${log.getIn([
    'request',
    'url',
  ])} ${log.getIn(['response', 'status'])}`;
};

app.streamToHttp = (
  endpoint,
  stream,
  { name = `HTTP: ${endpoint}`, monitoringEnabled = false } = {}
) => {
  const requests = {};

  let monitor;
  if (monitoringEnabled) {
    monitor = monitoring.register({
      name,
      speeds: ['processed'],
      type: 'output',
    });
  }

  const updateMonitoringStatus = () => {
    if (monitor) {
      const clientsSize = Object.keys(requests).length;
      if (clientsSize) {
        monitor.status = `${clientsSize} client${
          clientsSize > 1 ? 's' : ''
        } listening on #API_HTTP_URL#${endpoint}`;
      } else {
        monitor.status = `Waiting for clients on #API_HTTP_URL#${endpoint}`;
      }
    }
  };

  updateMonitoringStatus();

  app.get(endpoint, (req, res) => {
    const requestId = uuid.v4();
    requests[requestId] = [req, res];
    updateMonitoringStatus();

    const close = () => {
      delete requests[requestId];
      updateMonitoringStatus();
    };

    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Cache-Control', 'no-cache');

    req.on('close', close);
    res.on('close', close);
  });

  stream.map((log) => {
    Object.values(requests).forEach(([, res]) => {
      res.write(`${logToString(log)}\n`);
    });
  });
};

module.exports = app;

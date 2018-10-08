import express from 'express';
import {dashboardPdf} from './handler/dashboard';
import {queryPng} from './handler/query';

export const app = express();

app.get('/dashboard/:dashboardId.pdf', async (req, res) => {
  try {
    const dashboardId = req.params.dashboardId;
    const apiKey = req.query.apiKey;
    console.log(`Trying to generate PDF for dashboard ${dashboardId}`);
    const data = await dashboardPdf(dashboardId, apiKey);
    console.log(`Sending data`);
    res.type('pdf');
    res.send(data);
  } catch (error) {
    console.error(error);
  }
});

app.get('/query/:queryId.png', async (req, res) => {
  try {
    const queryId = req.params.queryId;
    const visualizationId = req.params.visualizationId;
    const apiKey = req.query.apiKey;
    const data = await queryPng(queryId, visualizationId, apiKey);
    res.type('png');
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

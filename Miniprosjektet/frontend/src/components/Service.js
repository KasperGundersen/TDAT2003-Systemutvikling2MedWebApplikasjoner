//@flow

import React, { Component } from "react";
import axios from "axios";
import { func } from "prop-types";

export function deleteEvent(id: number) {
  return axios
    .delete(`http://localhost:8080/eventer/` + id)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      console.log(error);
    });
}

export function getEvents() {
  return axios
    .get(`http://localhost:8080/eventer`)
    .then(res => {
      console.log(res.data);
      return res.data;
    })
    .catch(error => {
      console.log(error);
    });
}

export function getOneEvent(id: number) {
  return axios
    .get(`http://localhost:8080/eventer/` + id)
    .then(res => {
      return res.data[0];
    })
    .catch(error => {
      console.log(error);
    });
}

export function postEvent(states: {
  navn: string,
  beskrivelse: string,
  bilde: string,
  dato: string,
  kategori: number,
  viktighet: number
}) {
  return axios
    .post(`http://localhost:8080/register`, states)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      console.log(error);
    });
}

export function updateEvent(
  states: {
    navn: string,
    beskrivelse: string,
    bilde: string,
    dato: string,
    kategori: number,
    viktighet: number,
    id: number
  }
) {
  return axios
    .put(`http://localhost:8080/eventer/` + states.id, states)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      console.log(error);
    });
}

export function getKategori() {
  return axios
    .get("http://localhost:8080/kategorier")
    .then(res => {
      return res.data;
    })
    .catch(error => {
      console.log(error);
    });
}

export function postDeltager(id: number, state: { email: string }) {
  return axios
    .post("http://localhost:8080/deltagere/" + id, state)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      console.log(error);
    });
}

export function deltagereAmount(id: number) {
  return axios
    .get("http://localhost:8080/deltagere/" + id)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      console.log(error);
    });
}

export function eventSearch(searchWord: string) {
  return axios
    .get("http://localhost:8080/eventer/search/" + searchWord)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      console.log(error);
    });
}

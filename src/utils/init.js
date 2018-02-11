import axios from 'axios'
import logo from '../assets/img/STC_Logo_Horiz.png'

export const api = axios.create({
                    baseURL: process.env.API_URL
                  })
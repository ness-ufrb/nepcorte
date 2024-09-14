import axios from "axios"
import { Platform } from "react-native"

const AnimalEndPoint = '/api/animal/';
const ReviewEndPoint = '/api/review/analysis_result/';

const server = Platform.OS === 'ios'
    ? 'http://192.168.1.117:8000' : 'http://172.30.80.1:8000'

export default axios.create({
    baseURL: server
})

export { AnimalEndPoint, ReviewEndPoint }
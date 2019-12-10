import axios from 'axios'
import { GITHUB_API_URL} from '../../Constants'

class GitHubDataService {


    retrieveAllGitDataFromDB(arrteam1) {
        return axios.post(`${GITHUB_API_URL}/${arrteam1}`);
    }



    // retrieveTodo(name, id) {
    //     //console.log('executed service')
    //     return axios.get(`${JPA_API_URL}/users/${name}/todos/${id}`);
    // }

    // deleteTodo(name, id) {
    //     //console.log('executed service')
    //     return axios.delete(`${JPA_API_URL}/users/${name}/todos/${id}`);
    // }

    // updateTodo(name, id, todo) {
    //     //console.log('executed service')
    //     return axios.put(`${JPA_API_URL}/users/${name}/todos/${id}`, todo);
    // }

    // createTodo(name, todo) {
    //     //console.log('executed service')
    //     return axios.post(`${JPA_API_URL}/users/${name}/todos/`, todo);
    // }

}

export default new GitHubDataService()
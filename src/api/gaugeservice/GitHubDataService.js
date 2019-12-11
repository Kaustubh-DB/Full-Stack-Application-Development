import axios from 'axios'
import { GITHUB_API_URL} from '../../Constants'

class GitHubDataService {


    postTeam1Data(team1week1,team1week2,team1week3) {
        return axios.post(`${GITHUB_API_URL}/teamone/${team1week1}/${team1week2}/${team1week3}`);
    }

    postTeam2Data(team2week1,team2week2,team2week3) {
        return axios.post(`${GITHUB_API_URL}/teamtwo/${team2week1}/${team2week2}/${team2week3}`);
    }

    postTeam3Data(team3week1,team3week2,team3week3) {
        return axios.post(`${GITHUB_API_URL}/teamthree/${team3week1}/${team3week2}/${team3week3}`);
    }

}

export default new GitHubDataService()
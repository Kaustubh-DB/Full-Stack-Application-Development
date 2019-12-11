import axios from 'axios'
import { GITHUB_API_URL} from '../../Constants'

class GitHubDataService {


    postTeam1Data(team1week1,team1weektwo,team1week3) {
        return axios.post(`${GITHUB_API_URL}/teamone/${team1week1}/${team1weektwo}/${team1week3}`);
    }

    postTeam2Data(team1week1,team1weektwo,team1week3) {
        return axios.post(`${GITHUB_API_URL}/team2/${team1week1}/${team1weektwo}/${team1week3}`);
    }

}

export default new GitHubDataService()
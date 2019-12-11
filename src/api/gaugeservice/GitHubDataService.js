import axios from 'axios'
import { GITHUB_API_URL} from '../../Constants'

class GitHubDataService {


    retrieveAllGitDataFromDB(team1week1,team1weektwo,team1week3) {
        return axios.post(`${GITHUB_API_URL}/${team1week1}/${team1weektwo}/${team1week3}`);
    }
    
}

export default new GitHubDataService()
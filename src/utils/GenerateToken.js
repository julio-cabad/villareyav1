import {GRANT_TYPE, TOKEN_PWD, TOKEN_URL, TOKEN_USER} from '@env';
import qs from 'qs';
import axios from 'axios';
import {ErrorAlert} from '../palette/Alerts';

async function GenerateToken() {

    const data = {username: TOKEN_USER, password: TOKEN_PWD, grant_type: GRANT_TYPE};

    const options = {
        method: 'POST',
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        data: qs.stringify(data),
        url: TOKEN_URL,
    };

    return await axios(options)
        .then(res => {
            return res.data;
        }).catch((e) => {
            alert(e);
            ErrorAlert();
        });
}

export {GenerateToken};



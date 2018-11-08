import {app} from './index';
import config from 'config';

let port = 7635;
if (config.has('port')) {
    port = config.get('port');
}

app.listen(port, () => console.log(`Snap service started on port ${port}!`));

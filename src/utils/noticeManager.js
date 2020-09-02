let queue=[];
import { Notification } from 'element-ui';


function showNotice(payload){
    if(payload!=null){
        if(queue.length==0){
            setTimeout(showNotice);
        }
        queue.push(payload);
    }
    else{
        payload=queue.shift();
        Notification(payload);
        if(queue.length){
            setTimeout(showNotice,100);
        }
    }

}

export default showNotice;
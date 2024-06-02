import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
 
JoinFromLink.propTypes = {

};

function JoinFromLink(props) {
    const { conversationId } = useParams();
    const history = useNavigate();
    history.push({
        pathname: '/chat',
        state: { conversationId }
    })

    return (
        <div>
            {conversationId}
        </div>
    );
}

export default JoinFromLink;
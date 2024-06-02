import { setCurrentConversation } from 'features/Chat/slice/chatSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

const useRedirectToChatBox = (idConver) => {
    const history = useNavigate();
    const dispatch = useDispatch();
    history.push('/chat');
    dispatch(setCurrentConversation(idConver));
};

export default useRedirectToChatBox;

import { useDispatch } from 'react-redux';
import { fetchViewpoints } from "../actions/viewpoint";

export const useFetching = (fetchViewpoints,viewpoints) => {
    const dispatch = useDispatch()

    useEffect(() => {
    dispatch(fetchViewpoints(viewpoints));
  }, [])
}
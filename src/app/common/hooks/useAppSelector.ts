import {useSelector} from 'react-redux'
import {RootState} from "../../store.ts";

export const useAppSelector = useSelector.withTypes<RootState>()
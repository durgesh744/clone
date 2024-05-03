import {all} from 'redux-saga/effects';
import kundliSaga from './kundliSaga';

export default function* rootSaga() {
  yield all([kundliSaga()]);
}

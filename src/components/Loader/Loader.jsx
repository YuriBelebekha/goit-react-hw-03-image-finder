import { InfinitySpin } from 'react-loader-spinner';
import css from './Loader.module.css';
import { getRandomHexColor } from 'utils/getRandomHexColor';

export const Loader = () => {
  return (
    <div className={css.Loader}>
      <InfinitySpin
        width='200'
        color={getRandomHexColor()}
      />
    </div>
  );
};
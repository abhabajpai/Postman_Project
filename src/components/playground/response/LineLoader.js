import style from './response.module.css';

const LineLoader = () => {
  return (
    <div className={style.loader} data-testid="loader-container">
      <div className={style.loaderBar} data-testid="loader-bar"></div>
    </div>
  );
};

export default LineLoader;

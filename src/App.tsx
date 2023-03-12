import { useEffect, useState } from 'react';
import axios from 'axios';

import styles from './App.module.scss';

const baseUrl = import.meta.env.VITE_BASEURL;

const App = () => {
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getImages = async () => {
      try {
        setIsLoading(true);

        const { data } = await axios.get(`${baseUrl}/images_list.json`);

        setImages(data.images);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }

      setIsLoading(false);
    };

    getImages();
  }, []);

  return (
    <div className={styles.app}>
      {!isLoading && (
        <div
          className={styles.bg}
          style={{ backgroundImage: `url(${baseUrl}/${images[0]})` }}
        />
      )}
      <header>
        {isLoading ? <h1>Loading AI Images</h1> : <h1>AI Images</h1>}
      </header>
      <div className={styles.images}>
        {!isLoading &&
          images.map((image) => (
            <img key={image} src={`${baseUrl}/${image}`} alt="ai generated" />
          ))}
      </div>
    </div>
  );
};

export default App;

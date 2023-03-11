import { useEffect, useState } from 'react';
import axios from 'axios';

import styles from './App.module.scss';

const App = () => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const getImages = async () => {
      try {
        const { data } = await axios.get(
          'https://raw.githubusercontent.com/Epikle/ai-images/main/images_list.json'
        );

        setImages(data.images);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    };

    getImages();
  }, []);

  return (
    <div className={styles.app}>
      <h1>AI Images</h1>
      <div className={styles.images}>
        {images.map((image) => (
          <img
            key={image}
            src={`https://raw.githubusercontent.com/Epikle/ai-images/main/${image}`}
            alt="ai generated"
          />
        ))}
      </div>
    </div>
  );
};

export default App;

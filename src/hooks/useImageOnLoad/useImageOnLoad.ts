import { CSSProperties, useState } from 'react';

interface ImageStyle {
  thumbnail: CSSProperties;
  fullSize: CSSProperties;
}

interface ImageOnLoadType {
  handleImageOnLoad: () => void;
  css: ImageStyle;
}

/**
 * A simple React Hook that helps you improve UX while images are loading. Rather than having an image that "unfolds" from top to bottom,
 * we load a smaller version first which will be blurred and which will be replaced by the normal size image once loaded.
 *
 * @see https://usehooks-ts.com/react-hook/use-image-on-load
 *
 * @example
 * export default function Component() {
 *   const { handleImageOnLoad, css } = useImageOnLoad()
 *
 *   const style: { [key: string]: CSSProperties } = {
 *     wrap: {
 *       position: 'relative',
 *       width: 400,
 *       height: 400,
 *       margin: 'auto',
 *     },
 *     image: {
 *       position: 'absolute',
 *       top: 0,
 *       left: 0,
 *       width: `100%`,
 *       height: `100%`,
 *     },
 *   }
 *
 *   return (
 *     <div style={style.wrap}>
 *       // Small image load fast
 *       <img
 *         style={{ ...style.image, ...css.thumbnail }}
 *         src="https://via.placeholder.com/150"
 *         alt="thumbnail"
 *       />
 *
 *       // Full size image
 *       <img
 *         onLoad={handleImageOnLoad}
 *         style={{ ...style.image, ...css.fullSize }}
 *         src="https://via.placeholder.com/600"
 *         alt="fullImage"
 *       />
 *     </div>
 *   )
 * }
 */
function useImageOnLoad(): ImageOnLoadType {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Triggered when full image will be loaded.
  const handleImageOnLoad = () => {
    setIsLoaded(true);
  };

  const css: ImageStyle = {
    // Thumbnail style.
    thumbnail: {
      visibility: isLoaded ? 'hidden' : 'visible',
      filter: 'blur(8px)',
      transition: 'visibility 0ms ease-out 500ms',
    },
    // Full image style.
    fullSize: {
      opacity: isLoaded ? 1 : 0,
      transition: 'opacity 500ms ease-in 0ms',
    },
  };

  return { handleImageOnLoad, css };
}

export default useImageOnLoad;
